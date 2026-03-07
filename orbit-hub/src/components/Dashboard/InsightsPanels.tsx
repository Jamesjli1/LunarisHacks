import { Activity, BadgeCheck, Briefcase, MessagesSquare, Target } from 'lucide-react'
import type { OrbitConversation, OrbitData, OrbitProfile } from '../../types/orbit'
import { FeatureCard } from '../FeatureCard'

function summarizeConversationText(conversation: OrbitConversation): string {
  const all = conversation.messages?.map((m) => m.text).join(' ') ?? ''
  if (!all) return 'No conversation messages yet.'
  if (all.length <= 180) return all
  return `${all.slice(0, 176).trimEnd()}…`
}

function suggestCompanies(interests: string[] = []): string[] {
  const suggestions: string[] = []
  const lowered = interests.map((i) => i.toLowerCase())

  if (lowered.some((i) => i.includes('ai') || i.includes('machine'))) {
    suggestions.push('DeepMind, Anthropic, OpenAI')
  }
  if (lowered.some((i) => i.includes('design') || i.includes('product'))) {
    suggestions.push('Figma, Linear, Notion')
  }
  if (lowered.some((i) => i.includes('infra') || i.includes('devops') || i.includes('cloud'))) {
    suggestions.push('AWS, GCP, Render')
  }
  if (lowered.some((i) => i.includes('startup') || i.includes('founder'))) {
    suggestions.push('YC startups in similar verticals')
  }

  if (suggestions.length === 0 && interests.length > 0) {
    suggestions.push(`Search for companies building around: ${interests.slice(0, 3).join(', ')}`)
  }

  return suggestions
}

function rankConversations(conversations: OrbitConversation[]) {
  return [...conversations].sort((a, b) => {
    const aScore = (a.messages?.length ?? 0) + (a.liked ? 3 : 0)
    const bScore = (b.messages?.length ?? 0) + (b.liked ? 3 : 0)
    return bScore - aScore
  })
}

type Props = {
  data?: OrbitData | null
  activeProfile?: OrbitProfile
}

export function InsightsPanels({ data, activeProfile }: Props) {
  const conversations = data?.conversations ?? []
  const ranked = rankConversations(conversations).slice(0, 3)

  const primaryConversation = ranked[0]

  const interests = activeProfile?.interests ?? []
  const companySuggestions = suggestCompanies(interests)

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <FeatureCard
        title="Conversation feedback"
        description="Quick notes on what went well in your recent chats so you can double down on it."
        icon={BadgeCheck}
        accent="emerald"
      >
        {primaryConversation ? (
          <div className="space-y-1.5 text-[11px]">
            <p className="text-slate-300">
              We noticed you had a{' '}
              <span className="font-semibold text-emerald-300">
                {primaryConversation.messages.length >= 6
                  ? 'deep, high-signal'
                  : 'short but meaningful'}
              </span>{' '}
              conversation about <span className="font-semibold">{primaryConversation.topic}</span>.
            </p>
            <ul className="mt-1.5 space-y-0.5 text-slate-200">
              <li className="flex gap-1.5">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>
                  You asked follow-up questions and let them talk. Keep that exploration energy.
                </span>
              </li>
              <li className="flex gap-1.5">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>You mirrored their language, which makes people feel understood.</span>
              </li>
            </ul>
          </div>
        ) : (
          <p className="text-xs text-slate-400">
            Once you have a few conversations stored, we&apos;ll surface highlights and what made
            them go well here.
          </p>
        )}
      </FeatureCard>

      <FeatureCard
        title="Monitor conversations"
        description="Short summaries of what you last talked about so you can pick the thread back up quickly."
        icon={MessagesSquare}
        accent="violet"
      >
        {ranked.length > 0 ? (
          <ul className="space-y-1.5 text-[11px] text-slate-200">
            {ranked.map((c) => (
              <li key={c.id} className="rounded-md bg-slate-900/80 p-2">
                <p className="mb-0.5 text-[11px] font-semibold text-slate-50">
                  {c.topic ?? 'Conversation'}
                </p>
                <p className="text-[11px] text-slate-300">
                  {summarizeConversationText(c)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-slate-400">
            No conversations found in your JSON yet. Add one and we&apos;ll auto-generate short
            memory snippets.
          </p>
        )}
      </FeatureCard>

      <FeatureCard
        title="Interest-based suggestions"
        description="Companies and people to explore based on what this person cares about."
        icon={Briefcase}
        accent="amber"
      >
        {interests.length > 0 ? (
          <div className="space-y-1.5 text-[11px]">
            <p className="text-slate-300">
              They seem interested in{' '}
              <span className="font-semibold">{interests.slice(0, 4).join(', ')}</span>.
            </p>
            {companySuggestions.length > 0 && (
              <ul className="space-y-0.5 text-slate-200">
                {companySuggestions.map((suggestion) => (
                  <li key={suggestion} className="flex gap-1.5">
                    <Target className="mt-0.5 h-3 w-3 text-amber-300" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <p className="text-xs text-slate-400">
            Add interests for this profile in your JSON payload and we&apos;ll recommend themed
            companies and people to research.
          </p>
        )}
      </FeatureCard>

      <FeatureCard
        title="Staying connected"
        description="Lightweight nudges that remind you when it’s a good moment to check in."
        icon={Activity}
        accent="rose"
      >
        {conversations.length > 0 ? (
          <ul className="space-y-1.5 text-[11px] text-slate-200">
            {conversations.slice(0, 3).map((c) => (
              <li key={c.id} className="flex gap-1.5 rounded-md bg-slate-900/80 p-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-400" />
                <span>
                  It&apos;s a good time to check in about{' '}
                  <span className="font-semibold">
                    {c.topic ?? 'their current project'}
                  </span>
                  . Ask how things have evolved since you last spoke.
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-slate-400">
            As you add conversations, we&apos;ll start proposing simple, actionable check-in
            moments here.
          </p>
        )}
      </FeatureCard>
    </div>
  )
}

