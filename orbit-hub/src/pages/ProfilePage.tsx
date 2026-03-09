import { useMemo } from 'react'
import { UserCircle2 } from 'lucide-react'
import { getOrbitData } from '../lib/storage'
import type { OrbitData, OrbitUserProfile } from '../types/orbit'
import { FeatureCard } from '../components/FeatureCard'

export function ProfilePage() {
  const data: OrbitData | null = useMemo(() => getOrbitData(), [])
  const myProfile: OrbitUserProfile | undefined = data?.myProfile ?? undefined

  if (!myProfile) {
    return (
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
          <UserCircle2 className="h-5 w-5 text-orange-500" />
          Your profile
        </h2>
        <p className="text-sm text-slate-600 max-w-xl">
          No <code>myProfile</code> block found in your JSON yet. Add one in the Data Center to power
          shared-interest insights, quests, and this profile view.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
            <UserCircle2 className="h-5 w-5 text-orange-500" />
            Your profile
          </h2>
          <p className="text-sm text-slate-600 max-w-xl">
            This is how Orbit understands you. It&apos;s used to tailor suggestions, quests, and
            shared-interest insights.
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)]">
        <FeatureCard
          title="My profile"
          description="A quick snapshot of who you are, what you care about, and what you’re working toward."
          icon={UserCircle2}
          accent="sky"
        >
          <div className="space-y-3 text-sm text-slate-800">
            <p className="text-xl font-semibold">{myProfile.name}</p>
            {myProfile.company && (
              <p className="text-sm text-slate-700">
                {myProfile.role && <span className="mr-1">{myProfile.role} ·</span>}
                {myProfile.company}
              </p>
            )}
            {myProfile.location && (
              <p className="text-sm text-slate-500">{myProfile.location}</p>
            )}

            {myProfile.interests && myProfile.interests.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                  Interests
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {myProfile.interests.map((i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-xs text-orange-700 border border-orange-100"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {myProfile.skills && myProfile.skills.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                  Skills
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {myProfile.skills.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center rounded-full bg-slate-900 text-slate-50 px-2 py-0.5 text-xs"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {myProfile.goals && myProfile.goals.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                  Goals
                </p>
                <ul className="space-y-0.5">
                  {myProfile.goals.map((goal) => (
                    <li key={goal} className="flex gap-1.5">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </FeatureCard>

        <div className="space-y-3">
          <FeatureCard
            title="Shareable profile"
            description="A simple link and QR-style preview you can share with people in your orbit."
            icon={UserCircle2}
            accent="violet"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 flex flex-col items-center justify-center">
                <div className="mb-2 h-32 w-32 rounded-xl bg-slate-900 grid grid-cols-4 grid-rows-4 gap-0.5 p-2">
                  {Array.from({ length: 16 }).map((_, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div
                      key={idx}
                      className={`rounded-sm ${
                        idx % 3 === 0 ? 'bg-white' : idx % 2 === 0 ? 'bg-slate-700' : 'bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-600 text-center">
                  QR-style preview for your profile link.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 space-y-2">
                <p className="font-medium text-slate-800">Profile link</p>
                <p className="break-all rounded-md bg-slate-900 text-slate-50 px-2 py-1 text-xs">
                  https://orbit-hub.app/u/{myProfile.id}
                </p>
               
              </div>
            </div>
          </FeatureCard>

          <div className="grid gap-3 sm:grid-cols-2">
            <FeatureCard
              title="Companies to reach for"
              description="Places that might value your skills and current trajectory."
              icon={UserCircle2}
              accent="amber"
            >
              <ul className="space-y-1 text-sm text-amber-900">
                <li>Target: OpenAI, LangChain, or Harvey for roles involving production-grade AI agents and agentic workflows.</li>
                <li>Focus on SF-based AI labs that value the intersection of Infra Reliability and human-centric software.</li>
              </ul>
            </FeatureCard>
            <FeatureCard
              title="What to improve on"
              description="Behavioral tweaks that make your relationships and opportunities stronger."
              icon={UserCircle2}
              accent="rose"
            >
              <ul className="space-y-1 text-sm text-slate-700">
                <li>Notice which relationships feel one-sided and rebalance with more curiosity.</li>
                <li>Send a short follow-up within 24 hours after important conversations.</li>
                <li>Transition from "coffee chats" to sharing specific technical resources related to AI infra.</li>
              </ul>
            </FeatureCard>
          </div>
        </div>
      </div>
    </div>
  )
}

