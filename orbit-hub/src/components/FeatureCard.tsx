import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

type FeatureCardProps = {
  title: string
  description?: string
  icon: LucideIcon
  accent?: 'sky' | 'violet' | 'emerald' | 'amber' | 'rose'
  children?: ReactNode
}

const accentClasses: Record<NonNullable<FeatureCardProps['accent']>, string> = {
  sky: 'from-sky-500/20 to-sky-400/5 border-sky-900/70',
  violet: 'from-violet-500/20 to-violet-400/5 border-violet-900/70',
  emerald: 'from-emerald-500/20 to-emerald-400/5 border-emerald-900/70',
  amber: 'from-amber-500/20 to-amber-400/5 border-amber-900/70',
  rose: 'from-rose-500/20 to-rose-400/5 border-rose-900/70',
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  accent = 'sky',
  children,
}: FeatureCardProps) {
  return (
    <section
      className={`relative overflow-hidden rounded-2xl border bg-slate-900/70 px-4 py-4 sm:px-5 sm:py-5 shadow-lg shadow-slate-950/60 backdrop-blur-sm transition hover:border-slate-600/90 hover:bg-slate-900 ${
        accentClasses[accent]
      }`}
    >
      <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-slate-50/5 via-sky-300/10 to-transparent blur-2xl" />
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/90 ring-1 ring-slate-700/80">
          <Icon className="h-4 w-4 text-sky-400" />
        </div>
        <div className="flex-1 space-y-1.5">
          <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
          {description && (
            <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
          )}
          {children && <div className="mt-3 text-xs text-slate-200">{children}</div>}
        </div>
      </div>
    </section>
  )
}

