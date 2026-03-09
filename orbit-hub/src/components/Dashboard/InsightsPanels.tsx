import { Activity, Briefcase, MessagesSquare, Target } from 'lucide-react'
import type { OrbitConversation, OrbitData, OrbitProfile, OrbitUserProfile } from '../../types/orbit'
import { FeatureCard } from '../FeatureCard'
import { ChatPanel } from './ChatPanel'

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
  mode?: 'chat' | 'monitor' | 'sharedInterests' | 'stayingConnected'
  myProfile?: OrbitUserProfile
}

export function InsightsPanels({ data, activeProfile, mode = 'chat', myProfile }: Props) {
  const conversations = data?.conversations ?? []
  const ranked = rankConversations(
    conversations.filter((c) => (activeProfile ? c.profileId === activeProfile.id : true)),
  ).slice(0, 3)

  const interests = activeProfile?.interests ?? []
  const companySuggestions = suggestCompanies(interests)

  const sharedInterests =
    myProfile && activeProfile && myProfile.interests && activeProfile.interests
      ? activeProfile.interests.filter((i) =>
          myProfile.interests!.map((x) => x.toLowerCase()).includes(i.toLowerCase()),
        )
      : []

  if (mode === 'chat') {
    return (
      <div>
        <ChatPanel profile={activeProfile} />
      </div>
    )
  }

  if (mode === 'monitor') {
    return (
      <FeatureCard
        title="Monitor conversations"
        description="Short summaries of what you last talked about so you can pick the thread back up quickly."
        icon={MessagesSquare}
        accent="violet"
      >
        {ranked.length > 0 ? (
          <ul className="space-y-1.5 text-sm text-slate-700">
            {ranked.map((c) => {
              const allText = c.messages.map((m) => m.text.toLowerCase()).join(' ')
              const skillsMentioned =
                myProfile?.skills?.filter((skill) =>
                  allText.includes(skill.toLowerCase().split(' ')[0]),
                ) ?? []

              return (
                <li key={c.id} className="rounded-md bg-white p-3 border border-slate-200 space-y-1">
                  <p className="mb-0.5 text-sm font-semibold text-slate-900">
                    {c.topic ?? 'Conversation'}
                  </p>
                  <p className="text-sm text-slate-600">{summarizeConversationText(c)}</p>
                  {skillsMentioned.length > 0 && (
                    <p className="text-xs text-slate-500">
                      <span className="font-semibold">Skills talked about:</span>{' '}
                      {skillsMentioned.join(', ')}
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">
            No conversations found in your JSON yet. Add one and we&apos;ll auto-generate short
            memory snippets.
          </p>
        )}
      </FeatureCard>
    )
  }

  if (mode === 'sharedInterests') {
    return (
      <FeatureCard
        title="Shared interests"
        description="Overlap between what you care about and what they care about."
        icon={Briefcase}
        accent="amber"
      >
        {sharedInterests.length > 0 ? (
          <ul className="space-y-1 text-sm text-slate-700">
            {sharedInterests.map((interest) => (
              <li key={interest} className="flex gap-1.5">
                <Target className="mt-0.5 h-3 w-3 text-amber-400" />
                <span>{interest}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">
            Once both you and this person have interests filled out, we&apos;ll highlight where you
            overlap.
          </p>
        )}
      </FeatureCard>
    )
  }

  if (mode === 'stayingConnected') {
    return (
      <FeatureCard
        title="Staying connected"
        description="Lightweight nudges that remind you when it’s a good moment to check in."
        icon={Activity}
        accent="rose"
      >
        {conversations.length > 0 ? (
          <ul className="space-y-1.5 text-sm text-slate-700">
            {conversations.slice(0, 3).map((c) => {
              const last = new Date(c.lastUpdated)
              const next = new Date(last.getTime() + 14 * 24 * 60 * 60 * 1000)
              const nextLabel = next.toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              })
              return (
                <li
                  key={c.id}
                  className="flex gap-1.5 rounded-md bg-white p-3 border border-slate-200"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-rose-400" />
                  <span>
                    Check in again around{' '}
                    <span className="font-semibold">{nextLabel}</span> about{' '}
                    <span className="font-semibold">
                      {c.topic ?? 'their current project'}
                    </span>
                    .
                  </span>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">
            As you add conversations, we&apos;ll suggest simple, time-based follow-ups so you don&apos;t
            lose touch.
          </p>
        )}
      </FeatureCard>
    )
  }

  return null
}

