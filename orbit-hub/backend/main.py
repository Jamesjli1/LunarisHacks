import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, ConfigDict
from google import genai

# Load root .env explicitly
BASE_DIR = Path(__file__).resolve().parent
ENV_PATH = BASE_DIR.parent / ".env"
load_dotenv(dotenv_path=ENV_PATH)

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
print("ENV PATH:", ENV_PATH)
print("GEMINI KEY LOADED:", bool(GEMINI_API_KEY))

client = genai.Client(api_key=GEMINI_API_KEY) if GEMINI_API_KEY else None

app = FastAPI(title="Orbit Hub Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Message(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    from_: str = Field(alias="from")
    text: str


class ChatRequest(BaseModel):
    profile_name: str | None = None
    profile_company: str | None = None
    profile_interests: list[str] | None = None
    messages: list[Message]


class ChatResponse(BaseModel):
    reply: str


@app.get("/api/health")
async def health():
    return {
        "ok": True,
        "has_key": bool(GEMINI_API_KEY),
    }


@app.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest) -> ChatResponse:
    if client is None:
        raise HTTPException(
            status_code=500,
            detail="Gemini API key is not configured on the server.",
        )

    if not req.messages:
        raise HTTPException(status_code=400, detail="messages must not be empty")

    last_user = next(
        (m for m in reversed(req.messages) if m.from_ == "you"),
        req.messages[-1],
    )

    profile_lines: list[str] = []
    if req.profile_name:
        profile_lines.append(f"Name: {req.profile_name}")
    if req.profile_company:
        profile_lines.append(f"Company / role: {req.profile_company}")
    if req.profile_interests:
        profile_lines.append("Interests: " + ", ".join(req.profile_interests))

    history_text = "\n".join(f"{m.from_}: {m.text}" for m in req.messages[-10:])

    system_prompt = (
        "You are Orbit Hub, a gentle relationship and conversation assistant.\n"
        "You help the user reflect on their conversations and craft warm, specific follow-ups.\n"
        "Keep responses short (1-4 sentences) and concrete.\n"
    )

    full_prompt = (
        system_prompt
        + "\n\nProfile context:\n"
        + ("\n".join(profile_lines) or "None provided.")
        + "\n\nRecent messages:\n"
        + (history_text or "No prior messages.")
        + "\n\nUser's latest message (respond to this):\n"
        + last_user.text
    )

    try:
        result = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=full_prompt,
        )
    except Exception as e:
        print("GEMINI ERROR:", repr(e))
        raise HTTPException(status_code=500, detail=f"Gemini request failed: {str(e)}")

    text = getattr(result, "text", None)
    if not text or not text.strip():
        raise HTTPException(status_code=500, detail="Empty response from Gemini")

    return ChatResponse(reply=text.strip())