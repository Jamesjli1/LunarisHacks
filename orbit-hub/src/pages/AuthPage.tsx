import type { FormEvent } from 'react'
import { useState } from 'react'
import { LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

type Mode = 'login' | 'signup'

export function AuthPage() {
  const { signup, login } = useAuth()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (mode === 'signup') {
        const result = await signup(email, password)
        if (!result.ok) setError(result.error ?? 'Unable to create account.')
      } else {
        const result = await login(email, password)
        if (!result.ok) setError(result.error ?? 'Unable to log in.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-sky-900/40 p-8 space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-xs font-semibold tracking-[0.4em] uppercase text-sky-400/80">
          Orbit Hub
        </p>
        <h1 className="text-2xl font-semibold text-slate-50">
          {mode === 'signup' ? 'Create your orbit' : 'Welcome back to Orbit'}
        </h1>
        <p className="text-sm text-slate-400">
          {mode === 'signup'
            ? 'Spin up a new account stored securely in your browser.'
            : 'Log in to continue tracking your relationships.'}
        </p>
      </div>

      <div className="inline-flex rounded-full bg-slate-800/80 p-1 text-xs">
        <button
          type="button"
          onClick={() => setMode('login')}
          className={`flex-1 rounded-full px-3 py-1.5 transition ${
            mode === 'login'
              ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/40'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode('signup')}
          className={`flex-1 rounded-full px-3 py-1.5 transition ${
            mode === 'signup'
              ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/40'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Create account
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-300">
            Email
          </label>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 shadow-inner shadow-slate-950/40 outline-none ring-0 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-300">
            Password
          </label>
          <input
            type="password"
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            required
            minLength={4}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 shadow-inner shadow-slate-950/40 outline-none ring-0 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50"
          />
        </div>

        {error && (
          <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-900/70 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-500 px-3 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/40 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {mode === 'signup' ? (
            <>
              <UserPlus className="h-4 w-4" />
              {loading ? 'Creating account…' : 'Create account'}
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              {loading ? 'Signing in…' : 'Log in'}
            </>
          )}
        </button>
      </form>

      <p className="text-[11px] leading-relaxed text-slate-500 text-center">
        Accounts are stored as a small JSON array under the <code>users</code> key
        in your browser&apos;s localStorage. Passwords are <span className="font-semibold">not</span>{' '}
        sent anywhere.
      </p>
    </div>
  )
}

