"use client"

import { Component, ErrorInfo, ReactNode } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    // Mettez à jour l'état pour que le prochain rendu affiche l'UI de secours
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Vous pouvez également enregistrer l'erreur dans un service de rapport d'erreurs
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      // Affichez votre UI de secours personnalisée
      return this.props.fallback || (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <div className="w-full max-w-md space-y-6">
            <Alert variant="error">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Une erreur est survenue</AlertTitle>
              <AlertDescription>
                {process.env.NODE_ENV === 'development' ? (
                  <pre className="mt-2 w-full overflow-x-auto rounded-md bg-slate-900 p-4 text-sm text-white">
                    {this.state.error?.toString()}
                  </pre>
                ) : (
                  'Une erreur inattendue s\'est produite. Veuillez réessayer plus tard.'
                )}
              </AlertDescription>
            </Alert>
            
            <div className="flex justify-center space-x-4">
              <Button asChild variant="outline">
                <Link href="/">
                  Retour à l'accueil
                </Link>
              </Button>
              
              <Button asChild variant="outline" onClick={() => window.location.reload()}>
                <span>Réessayer</span>
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
