import { Gauge, HeartHandshake, ThumbsUp } from 'lucide-react'
import type { OrbitConversation } from '../../types/orbit'
import { FeatureCard } from '../FeatureCard'

type Props = {
  conversations?: OrbitConversation[]
}

function buildImprovements(conversation: OrbitConversation) {
  const messageCount = conversation.messages?.length ?? 0
  const liked = conversation.liked ?? false

  const items: string[] = [
    'Ask one more follow-up question before offering advice.',
    'Reflect their words back in your own language to confirm understanding.',
    'End the chat with a concrete next step you can follow up on.',
  ]

  const rating =
    liked && messageCount >= 6 ? 'Excellent' : liked ? 'Good' : messageCount >= 3 ? 'Okay' : 'Needs attention'

  return { items, rating }
}

export function FeedbackPanel({ conversations }: Props) {
  return (
    <FeatureCard
      title="Feedback on your style"
      description="Honest reflections for each conversation: what went well, and three concrete ways to improve."
      icon={HeartHandshake}
      accent="violet"
    >
      {conversations && conversations.length > 0 ? (
        <div className="space-y-3 text-sm text-slate-700">
          {conversations.map((conversation) => {
            const { items, rating } = buildImprovements(conversation)
            return (
              <div
                key={conversation.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="flex items-center gap-1.5 font-medium text-slate-900">
                    <ThumbsUp className="h-3.5 w-3.5 text-emerald-400" />
                    <span>{conversation.topic ?? 'Conversation'}</span>
                  </p>
                  <span className="inline-flex items-center rounded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold text-slate-50">
                    {rating}
                  </span>
                </div>
                <ul className="space-y-0.5">
                  {items.map((item) => (
                    <li key={item} className="flex gap-1.5">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}

          <div className="mt-1 flex items-center justify-between rounded-lg bg-slate-100 px-3 py-2">
            <div className="flex items-center gap-1.5 text-sm text-slate-800">
              <Gauge className="h-3.5 w-3.5 text-sky-400" />
              <span className="font-medium">Learning your preferences</span>
            </div>
            <p className="text-xs text-slate-500">
              Use these patterns across conversations, not just once, and Orbit will feel more like
              you over time.
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-500">
          After each saved conversation, Orbit Hub will surface multiple, concrete ways to improve
          how you show up.
        </p>
      )}
    </FeatureCard>
  )
}

