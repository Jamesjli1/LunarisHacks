import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { getOrbitData } from '../lib/storage'
import type { OrbitProfile } from '../types/orbit'
import { ProfilePanel } from '../components/Dashboard/ProfilePanel'
import { InsightsPanels } from '../components/Dashboard/InsightsPanels'
import { QuestsPanel } from '../components/Dashboard/QuestsPanel'
import { FeedbackPanel } from '../components/Dashboard/FeedbackPanel'
import { ChatPanel } from '../components/Dashboard/ChatPanel'

export function DashboardPage() {
  const data = useMemo(() => getOrbitData(), [])
  const [activeProfileId, setActiveProfileId] = useState<string | undefined>(
    data?.profiles?.[0]?.id,
  )

  const activeProfile: OrbitProfile | undefined = useMemo(
    () => data?.profiles?.find((p) => p.id === activeProfileId),
    [data, activeProfileId],
  )

  const recentConversation = useMemo(
    () => data?.conversations?.[0],
    [data?.conversations],
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">Orbit dashboard</h2>
          <p className="text-xs text-slate-400 max-w-xl">
            See who&apos;s in your orbit, what you talked about, and get gentle prompts to stay in
            touch.
          </p>
        </div>

        {data?.profiles && data.profiles.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Focused profile</span>
            <div className="relative">
              <select
                value={activeProfileId}
                onChange={(e) => setActiveProfileId(e.target.value)}
                className="appearance-none rounded-full border border-slate-700/80 bg-slate-900/90 px-3 py-1.5 pr-7 text-[11px] font-medium text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/40"
              >
                {data.profiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)]">
        <ProfilePanel profile={activeProfile} />
        <ChatPanel profile={activeProfile} />
      </div>

      <InsightsPanels data={data ?? undefined} activeProfile={activeProfile} />

      <div className="grid gap-3 sm:grid-cols-2">
        <QuestsPanel profile={activeProfile} />
        <FeedbackPanel recentConversation={recentConversation ?? undefined} />
      </div>
    </div>
  )
}

