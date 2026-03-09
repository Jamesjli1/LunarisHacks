import { useEffect, useState } from 'react'
import { OrbitHubShell } from './components/OrbitHubShell'
import { AuthPage } from './pages/AuthPage'
import { AuthProvider, useAuth } from './context/AuthContext'

type AppView = 'dashboard' | 'dataCenter' | 'profile'

function AppInner() {
  const { user } = useAuth()
  const [view, setView] = useState<AppView>('dashboard')

  useEffect(() => {
    // Reset to dashboard when logging out
    if (!user) {
      setView('dashboard')
    }
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-100 to-amber-50 text-slate-900 flex items-center justify-center px-4">
        <AuthPage />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-100 to-amber-50 text-slate-900">
      <OrbitHubShell view={view} onChangeView={setView} />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}
