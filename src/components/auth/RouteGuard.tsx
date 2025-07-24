"use client"

import { useEffect, ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface RouteGuardProps {
  children: ReactNode
  requiredRole?: 'USER' | 'ADMIN'
  loadingComponent?: ReactNode
}

export function RouteGuard({ 
  children, 
  requiredRole = 'USER',
  loadingComponent = (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  )
}: RouteGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const isAuthenticated = status === 'authenticated'
  const isLoading = status === 'loading'

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Store the current URL for redirecting after sign in
      const callbackUrl = window.location.pathname
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`)
      
      toast({
        title: "Accès non autorisé",
        description: "Veuillez vous connecter pour accéder à cette page.",
        variant: "destructive",
      })
    } else if (isAuthenticated && requiredRole === 'ADMIN' && session?.user.role !== 'ADMIN') {
      router.push('/')
      
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les permissions nécessaires pour accéder à cette page.",
        variant: "destructive",
      })
    }
  }, [isAuthenticated, isLoading, router, requiredRole, session])

  if (isLoading) {
    return <>{loadingComponent}</>
  }

  if (!isAuthenticated) {
    return <>{loadingComponent}</>
  }

  if (requiredRole === 'ADMIN' && session?.user.role !== 'ADMIN') {
    return <>{loadingComponent}</>
  }

  return <>{children}</>
}

// Helper component for admin routes
export function AdminRouteGuard({ children }: { children: ReactNode }) {
  return <RouteGuard requiredRole="ADMIN">{children}</RouteGuard>
}

// Helper component for authenticated user routes
export function UserRouteGuard({ children }: { children: ReactNode }) {
  return <RouteGuard requiredRole="USER">{children}</RouteGuard>
}
