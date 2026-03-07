import { Bell, FileJson, LayoutDashboard, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { DashboardPage } from '../pages/DashboardPage'
import { DataCenterPage } from '../pages/DataCenterPage'

type View = 'dashboard' | 'dataCenter'

type Props = {
  view: View
  onChangeView: (view: View) => void
}

export function OrbitHubShell({ view, onChangeView }: Props) {
  const { user, logout } = useAuth()

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-50">
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 ring-1 ring-sky-500/40">
              <span className="text-sm font-semibold tracking-tight text-sky-300">
                OH
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-50">Orbit Hub</p>
              <p className="text-[11px] text-slate-400">
                Personal relationship radar for your conversations
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => onChangeView('dashboard')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${
                view === 'dashboard'
                  ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/40'
                  : 'bg-slate-900/70 text-slate-300 hover:bg-slate-800 hover:text-slate-50'
              }`}
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              Dashboard
            </button>
            <button
              type="button"
              onClick={() => onChangeView('dataCenter')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${
                view === 'dataCenter'
                  ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/40'
                  : 'bg-slate-900/70 text-slate-300 hover:bg-slate-800 hover:text-slate-50'
              }`}
            >
              <FileJson className="h-3.5 w-3.5" />
              Data Center
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/80 text-slate-300 hover:border-sky-500/70 hover:text-sky-300"
              aria-label="Notifications"
            >
              <Bell className="h-3.5 w-3.5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[11px] font-medium text-slate-200">
                  {user?.email}
                </span>
                <span className="text-[10px] text-slate-500">Local JSON account</span>
              </div>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-[11px] font-medium text-slate-200 transition hover:border-rose-500/70 hover:bg-rose-950/40 hover:text-rose-200"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-4 sm:py-6">
        {view === 'dashboard' ? <DashboardPage /> : <DataCenterPage />}
      </main>
    </div>
  )
}

