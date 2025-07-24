"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { Session, User } from 'next-auth'
import { useSession } from 'next-auth/react'

interface AuthContextType {
  user: User | null
  status: 'loading' | 'authenticated' | 'unauthenticated'
  update: () => Promise<Session | null>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status, update } = useSession()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (session?.user) {
      setUser(session.user)
    } else {
      setUser(null)
    }
  }, [session])

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        update: async () => {
          const updatedSession = await update()
          return updatedSession
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
