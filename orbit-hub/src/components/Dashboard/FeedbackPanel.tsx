import { Gauge, HeartHandshake, ThumbsUp } from 'lucide-react'
import type { OrbitConversation } from '../../types/orbit'
import { FeatureCard } from '../FeatureCard'

type Props = {
  recentConversation?: OrbitConversation
}

export function FeedbackPanel({ recentConversation }: Props) {
  return (
    <FeatureCard
      title="Feedback on your style"
      description="A lightweight reflection after each conversation: what felt good, and how to tune for your preferences."
      icon={HeartHandshake}
      accent="violet"
    >
      {recentConversation ? (
        <div className="space-y-1.5 text-[11px] text-slate-200">
          <p className="flex items-center gap-1.5">
            <ThumbsUp className="h-3.5 w-3.5 text-emerald-300" />
            <span>
              This interaction scored high on{' '}
              <span className="font-semibold">curiosity and emotional safety</span>.
            </span>
          </p>
          <ul className="space-y-0.5">
            <li className="flex gap-1.5">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>You asked clarifying questions instead of jumping to advice.</span>
            </li>
            <li className="flex gap-1.5">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>
                You mirrored back what you heard, which helps people feel seen and reduces
                misalignment.
              </span>
            </li>
          </ul>
          <div className="mt-2 flex items-center justify-between rounded-lg bg-slate-900/80 px-2.5 py-1.5">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
              <Gauge className="h-3.5 w-3.5 text-sky-300" />
              <span className="font-medium">Learning your preferences</span>
            </div>
            <p className="text-[10px] text-slate-400">
              We&apos;ll tune prompts to match the tone and pacing you seem to prefer.
            </p>
          </div>
        </div>
      ) : (
        <p className="text-xs text-slate-400">
          After each saved conversation, Orbit Hub will surface 1–2 things that went well and tune
          future prompts to your style.
        </p>
      )}
    </FeatureCard>
  )
}

