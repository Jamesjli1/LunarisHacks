import type { OrbitData, User } from '../types/orbit'

const USERS_KEY = 'users'
const CURRENT_USER_KEY = 'current_user'
const CURRENT_ORBIT_DATA_KEY = 'current_orbit_data'
const CHAT_HISTORY_KEY = 'orbit_chat_history'

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function getUsers(): User[] {
  return readJson<User[]>(USERS_KEY, [])
}

export function saveUsers(users: User[]) {
  writeJson<User[]>(USERS_KEY, users)
}

export function getCurrentUser(): User | null {
  return readJson<User | null>(CURRENT_USER_KEY, null)
}

export function setCurrentUser(user: User | null) {
  if (!user) {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(CURRENT_USER_KEY)
    }
    return
  }
  writeJson<User>(CURRENT_USER_KEY, user)
}

export function getOrbitData(): OrbitData | null {
  return readJson<OrbitData | null>(CURRENT_ORBIT_DATA_KEY, null)
}

export function saveOrbitData(data: OrbitData) {
  writeJson<OrbitData>(CURRENT_ORBIT_DATA_KEY, data)
}

export type ChatHistory = {
  id: string
  profileId?: string
  messages: { id: string; from: 'you' | 'them'; text: string; createdAt: string }[]
}[]

export function getChatHistory(): ChatHistory {
  return readJson<ChatHistory>(CHAT_HISTORY_KEY, [])
}

export function saveChatHistory(history: ChatHistory) {
  writeJson<ChatHistory>(CHAT_HISTORY_KEY, history)
}

