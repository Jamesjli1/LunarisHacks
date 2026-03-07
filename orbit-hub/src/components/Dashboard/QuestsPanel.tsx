import { Flag, Sparkles } from 'lucide-react'
import type { OrbitProfile } from '../../types/orbit'
import { FeatureCard } from '../FeatureCard'

type Props = {
  profile?: OrbitProfile
}

export function QuestsPanel({ profile }: Props) {
  const interests = profile?.interests ?? []

  const baseQuests = [
    'Send a short note appreciating something specific they shared.',
    'Share a resource that connects directly to one of their interests.',
    'Ask a follow-up question about a project you discussed.',
  ]

  const interestQuests =
    interests.length > 0
      ? interests.slice(0, 3).map((interest) => `Find one new article or tool related to "${interest}" and send it with 1–2 lines of context.`)
      : []

  return (
    <FeatureCard
      title="Missions & quests"
      description="Turn staying in touch into a game: small, concrete missions generated from their profile."
      icon={Flag}
      accent="emerald"
    >
      <div className="space-y-1.5 text-[11px] text-slate-200">
        <p className="flex items-center gap-1.5 text-slate-300">
          <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
          Complete a quest each week to keep this orbit warm.
        </p>
        <ul className="space-y-0.5">
          {baseQuests.map((quest) => (
            <li key={quest} className="flex gap-1.5">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>{quest}</span>
            </li>
          ))}
          {interestQuests.map((quest) => (
            <li key={quest} className="flex gap-1.5">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
              <span>{quest}</span>
            </li>
          ))}
        </ul>
      </div>
    </FeatureCard>
  )
}

