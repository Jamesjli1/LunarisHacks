import { Briefcase, Goal, MapPin, Sparkles } from 'lucide-react'
import type { OrbitProfile } from '../../types/orbit'
import { FeatureCard } from '../FeatureCard'

type Props = {
  profile?: OrbitProfile
}

export function ProfilePanel({ profile }: Props) {
  return (
    <FeatureCard
      title="Personalized profile"
      description="A quick snapshot of who this person is, what they care about, and what they’re working toward."
      icon={Sparkles}
      accent="sky"
    >
      {profile ? (
        <div className="space-y-2.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-50">{profile.name}</p>
              {profile.company && (
                <p className="text-xs text-slate-300 flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-sky-300" />
                  <span>
                    {profile.role && <span className="mr-1">{profile.role} ·</span>}
                    {profile.company}
                  </span>
                </p>
              )}
              {profile.location && (
                <p className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
                  <MapPin className="h-3 w-3" />
                  {profile.location}
                </p>
              )}
            </div>
          </div>

          {profile.interests && profile.interests.length > 0 && (
            <div>
              <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Interests
              </p>
              <div className="flex flex-wrap gap-1.5">
                {profile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center rounded-full bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-100"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profile.projects && profile.projects.length > 0 && (
            <div>
              <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Active projects
              </p>
              <ul className="space-y-0.5 text-[11px] text-slate-200">
                {profile.projects.map((project) => (
                  <li key={project} className="flex gap-1.5">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>{project}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {profile.goals && profile.goals.length > 0 && (
            <div>
              <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Goals
              </p>
              <ul className="space-y-0.5 text-[11px] text-slate-200">
                {profile.goals.map((goal) => (
                  <li key={goal} className="flex gap-1.5">
                    <Goal className="mt-0.5 h-3 w-3 text-emerald-400" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p className="text-xs text-slate-400">
          No profiles yet. Paste your extension JSON in the Data Center and we&apos;ll build a
          personalized profile summary here.
        </p>
      )}
    </FeatureCard>
  )
}

