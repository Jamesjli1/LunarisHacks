import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { getOrbitData } from '../lib/storage'
import type { OrbitConversation, OrbitData, OrbitProfile, OrbitUserProfile } from '../types/orbit'
import { ProfilePanel } from '../components/Dashboard/ProfilePanel'
import { InsightsPanels } from '../components/Dashboard/InsightsPanels'
import { QuestsPanel } from '../components/Dashboard/QuestsPanel'
import { FeedbackPanel } from '../components/Dashboard/FeedbackPanel'

export function DashboardPage() {
  const data: OrbitData | null = useMemo(() => getOrbitData(), [])
  const [activeProfileId, setActiveProfileId] = useState<string | undefined>(
    data?.profiles?.[0]?.id,
  )
  const [activeTab, setActiveTab] = useState<
    'chat' | 'monitor' | 'sharedInterests' | 'stayingConnected' | 'quests' | 'feedback'
  >('chat')

  const activeProfile: OrbitProfile | undefined = useMemo(
    () => data?.profiles?.find((p) => p.id === activeProfileId),
    [data, activeProfileId],
  )

  const myProfile: OrbitUserProfile | undefined = data?.myProfile ?? undefined

  const conversationsForProfile: OrbitConversation[] = useMemo(
    () => (activeProfile && data?.conversations
      ? data.conversations.filter((c) => c.profileId === activeProfile.id)
      : []),
    [data?.conversations, activeProfile],
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Orbit dashboard</h2>
          <p className="text-sm text-slate-600 max-w-xl">
            See who&apos;s in your orbit, what you talked about, and get gentle prompts to stay in
            touch.
          </p>
        </div>

        {data?.profiles && data.profiles.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Focused profile</span>
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

      <ProfilePanel profile={activeProfile} />

      <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2 mb-3 text-sm">
          {[
            { id: 'chat', label: 'Orbit chat' },
            { id: 'monitor', label: 'Monitor conversations' },
            { id: 'sharedInterests', label: 'Interests & skills' },
            { id: 'stayingConnected', label: 'Staying connected' },
            { id: 'quests', label: 'Missions & quests' },
            { id: 'feedback', label: 'Feedback on your style' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-300/60'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'chat' && (
          <InsightsPanels data={data ?? undefined} activeProfile={activeProfile} />
        )}

        {activeTab === 'monitor' && (
          <div className="mt-1">
            <InsightsPanels
              data={data ?? undefined}
              activeProfile={activeProfile}
              mode="monitor"
              myProfile={myProfile}
            />
          </div>
        )}

        {activeTab === 'sharedInterests' && (
          <div className="mt-1">
            <InsightsPanels
              data={data ?? undefined}
              activeProfile={activeProfile}
              mode="sharedInterests"
              myProfile={myProfile}
            />
          </div>
        )}

        {activeTab === 'stayingConnected' && (
          <div className="mt-1">
            <InsightsPanels
              data={data ?? undefined}
              activeProfile={activeProfile}
              mode="stayingConnected"
            />
          </div>
        )}

        {activeTab === 'quests' && (
          <div className="mt-1">
            <QuestsPanel profile={activeProfile} myProfile={myProfile} />
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="mt-1">
            <FeedbackPanel conversations={conversationsForProfile} />
          </div>
        )}
      </div>
    </div>
  )
}

