import { Flag, Sparkles } from 'lucide-react'
import type { OrbitProfile, OrbitUserProfile } from '../../types/orbit'
import { FeatureCard } from '../FeatureCard'
import { useEffect, useMemo, useState } from 'react'

type Props = {
  profile?: OrbitProfile
  myProfile?: OrbitUserProfile
}

export function QuestsPanel({ profile, myProfile }: Props) {
  const interests = profile?.interests ?? []

  const allQuests = useMemo(() => {
    const baseQuests = [
      'Send a short note appreciating something specific they shared.',
      'Share a resource that connects directly to one of their interests.',
      'Ask a follow-up question about a project you discussed.',
    ]

    const interestQuests =
      interests.length > 0
        ? interests
            .slice(0, 3)
            .map(
              (interest) =>
                `Find one new article or tool related to "${interest}" and send it with 1–2 lines of context.`,
            )
        : []

    const sharedQuests =
      myProfile && profile
        ? [
            `Write a short update about what you’ve been building (${(myProfile.projects ?? [])[0] ?? 'your current work'}) and ask how their work has evolved.`,
            'Offer a specific way you could help them (warm intro, feedback, sharing a resource).',
            'Schedule a 30-minute catch-up focused only on their goals, not yours.',
          ]
        : []

    return [...baseQuests, ...interestQuests, ...sharedQuests]
  }, [interests, myProfile, profile])

  const [completed, setCompleted] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!profile) return
    const key = `orbit_quests_${profile.id}`
    try {
      const raw = window.localStorage.getItem(key)
      if (raw) {
        setCompleted(JSON.parse(raw) as Record<string, boolean>)
      }
    } catch {
      // ignore
    }
  }, [profile])

  useEffect(() => {
    if (!profile) return
    const key = `orbit_quests_${profile.id}`
    try {
      window.localStorage.setItem(key, JSON.stringify(completed))
    } catch {
      // ignore
    }
  }, [completed, profile])

  const total = allQuests.length
  const completedCount = allQuests.filter((q) => completed[q]).length
  const progress = total > 0 ? Math.round((completedCount / total) * 100) : 0

  function toggleQuest(quest: string) {
    setCompleted((prev) => ({
      ...prev,
      [quest]: !prev[quest],
    }))
  }

  return (
    <FeatureCard
      title="Missions & quests"
      description="Turn staying in touch into a game: small, concrete missions generated from their profile."
      icon={Flag}
      accent="emerald"
    >
      <div className="space-y-2 text-sm text-slate-700">
        <p className="flex items-center justify-between gap-2 text-slate-800">
          <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
          <span>Complete a quest each week to keep this orbit warm.</span>
        </p>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>
              Progress: {completedCount}/{total}{' '}
              {total > 0 && <span className="text-slate-400">({progress}%)</span>}
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div> {/* <--- Changed to </div> */}

        <ul className="space-y-1">
          {allQuests.map((quest) => (
            <li key={quest} className="flex items-start gap-2">
              <button
                type="button"
                onClick={() => toggleQuest(quest)}
                className={`mt-1 h-3 w-3 rounded-full border ${
                  completed[quest]
                    ? 'border-emerald-500 bg-emerald-400'
                    : 'border-slate-300 bg-white'
                }`}
                aria-label={completed[quest] ? 'Mark quest as incomplete' : 'Mark quest as complete'}
              />
              <span className={completed[quest] ? 'line-through text-slate-400' : ''}>{quest}</span>
            </li>
          ))}
        </ul>
      </div>
    </FeatureCard>
  )
}

