import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { User } from '../types/orbit'
import { getCurrentUser, getUsers, saveUsers, setCurrentUser } from '../lib/storage'

type AuthContextValue = {
  user: User | null
  signup: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const existing = getCurrentUser()
    if (existing) {
      setUser(existing)
    }
  }, [])

  const signup = useCallback(async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase()
    if (!normalizedEmail || !password) {
      return { ok: false, error: 'Email and password are required.' }
    }

    const users = getUsers()
    const existingUser = users.find((u) => u.email === normalizedEmail)
    if (existingUser) {
      return { ok: false, error: 'An account with this email already exists.' }
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email: normalizedEmail,
      password,
    }

    saveUsers([...users, newUser])
    setCurrentUser(newUser)
    setUser(newUser)

    return { ok: true }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase()
    const users = getUsers()
    const existingUser = users.find(
      (u) => u.email === normalizedEmail && u.password === password,
    )

    if (!existingUser) {
      return { ok: false, error: 'Invalid email or password.' }
    }

    setCurrentUser(existingUser)
    setUser(existingUser)

    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    setCurrentUser(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      signup,
      login,
      logout,
    }),
    [user, signup, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}

