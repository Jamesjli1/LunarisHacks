import { Bell, FileJson, LayoutDashboard, LogOut, UserCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { DashboardPage } from '../pages/DashboardPage'
import { DataCenterPage } from '../pages/DataCenterPage'
import { ProfilePage } from '../pages/ProfilePage'

type View = 'dashboard' | 'dataCenter' | 'profile'

type Props = {
  view: View
  onChangeView: (view: View) => void
}

export function OrbitHubShell({ view, onChangeView }: Props) {
  const { user, logout } = useAuth()

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-100 via-slate-100 to-amber-50 text-slate-900">
      <header className="border-b border-orange-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 ring-1 ring-orange-300">
              <span className="text-sm font-semibold tracking-tight text-orange-600">
                OH
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Orbit Hub</p>
              <p className="text-[11px] text-slate-500">
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
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-300/60'
                  : 'bg-white text-slate-600 hover:bg-orange-50'
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
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-300/60'
                  : 'bg-white text-slate-600 hover:bg-orange-50'
              }`}
            >
              <FileJson className="h-3.5 w-3.5" />
              Data Center
            </button>
            <button
              type="button"
              onClick={() => onChangeView('profile')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${
                view === 'profile'
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-300/60'
                  : 'bg-white text-slate-600 hover:bg-orange-50'
              }`}
            >
              <UserCircle2 className="h-3.5 w-3.5" />
              Profile
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-orange-200 bg-white text-slate-500 hover:border-orange-400 hover:text-orange-500"
              aria-label="Notifications"
            >
              <Bell className="h-3.5 w-3.5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[11px] font-medium text-slate-800">
                  {user?.email}
                </span>
                <span className="text-[10px] text-slate-500">Local JSON account</span>
              </div>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-700 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-4 sm:py-6">
        {view === 'dashboard' && <DashboardPage />}
        {view === 'dataCenter' && <DataCenterPage />}
        {view === 'profile' && <ProfilePage />}
      </main>
    </div>
  )
}

