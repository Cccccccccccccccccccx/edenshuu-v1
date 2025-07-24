import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"

type SkeletonVariant = 'default' | 'card' | 'text' | 'circle' | 'button'

interface LoadingProps {
  variant?: SkeletonVariant
  className?: string
  size?: 'sm' | 'md' | 'lg'
  fullPage?: boolean
}

export function Loading({
  variant = 'default',
  className = '',
  size = 'md',
  fullPage = false,
  ...props
}: LoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-32 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        )
      case 'text':
        return (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        )
      case 'circle':
        return <Skeleton className={`h-12 w-12 rounded-full ${className}`} {...props} />
      case 'button':
        return <Skeleton className={`h-10 w-24 rounded-md ${className}`} {...props} />
      default:
        return <Skeleton className={`h-4 w-full ${className}`} {...props} />
    }
  }

  const content = (
    <div className="flex items-center justify-center space-x-2">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
      <span className="sr-only">Chargement...</span>
    </div>
  )

  if (fullPage) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        {content}
      </div>
    )
  }

  return content
}

// Composant de chargement pour les pages
export function PageLoading() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <Loading size="lg" />
    </div>
  )
}
