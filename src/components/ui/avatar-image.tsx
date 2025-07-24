import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const avatarImageVariants = cva("h-full w-full object-cover", {
  variants: {
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      default: "rounded",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    rounded: "full",
  },
})

export interface AvatarImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof avatarImageVariants> {
  /**
   * The source URL of the image
   */
  src: string
  /**
   * Alternative text for the image
   */
  alt?: string
  /**
   * Callback when the image fails to load
   */
  onError?: () => void
  /**
   * Additional class name
   */
  className?: string
  /**
   * Whether to show a loading skeleton
   */
  isLoading?: boolean
  /**
   * Loading component to show when isLoading is true
   */
  loadingComponent?: React.ReactNode
  /**
   * Fallback component to show when the image fails to load
   */
  fallback?: React.ReactNode
  /**
   * Whether to disable the loading state
   */
  disableLoadingState?: boolean
}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  (
    {
      src,
      alt = "",
      onError,
      className,
      isLoading = false,
      loadingComponent,
      fallback,
      disableLoadingState = false,
      rounded,
      ...props
    },
    ref
  ) => {
    const [isImageLoading, setIsImageLoading] = React.useState(true)
    const [hasError, setHasError] = React.useState(false)

    const handleLoad = () => {
      setIsImageLoading(false)
      setHasError(false)
    }

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setIsImageLoading(false)
      setHasError(true)
      onError?.()
    }

    // Reset loading state when src changes
    React.useEffect(() => {
      setIsImageLoading(true)
      setHasError(false)
    }, [src])

    // Show loading state
    if ((isLoading || isImageLoading) && !disableLoadingState) {
      if (loadingComponent) {
        return <>{loadingComponent}</>
      }
      return (
        <div className={cn("animate-pulse bg-muted", className)}>
          <span className="sr-only">Loading...</span>
        </div>
      )
    }

    // Show fallback on error
    if (hasError && fallback) {
      return <>{fallback}</>
    }

    // Show image
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn(avatarImageVariants({ rounded, className }))}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    )
  }
)

AvatarImage.displayName = "AvatarImage"

export { AvatarImage, avatarImageVariants }
