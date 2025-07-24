import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Accès refusé</AlertTitle>
          <AlertDescription>
            Vous n'avez pas les autorisations nécessaires pour accéder à cette page.
          </AlertDescription>
        </Alert>
        
        <div className="flex justify-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/">
              Retour à l'accueil
            </Link>
          </Button>
          
          <Button asChild>
            <Link href="/dashboard">
              Tableau de bord
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
