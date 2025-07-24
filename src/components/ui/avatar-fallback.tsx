import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center rounded-full bg-muted",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      },
      variant: {
        default: "bg-muted text-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-emerald-500 text-white",
        warning: "bg-amber-500 text-white",
        error: "bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarFallbackVariants> {
  /**
   * The content of the fallback
   */
  children: React.ReactNode
  /**
   * Additional class name
   */
  className?: string
  /**
   * Whether to show a loading state
   */
  isLoading?: boolean
  /**
   * Loading component to show when isLoading is true
   */
  loadingComponent?: React.ReactNode
}

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  (
    {
      children,
      className,
      size,
      variant,
      isLoading = false,
      loadingComponent,
      ...props
    },
    ref
  ) => {
    if (isLoading && loadingComponent) {
      return (
        <div
          className={cn("flex items-center justify-center", className)}
          ref={ref}
          {...props}
        >
          {loadingComponent}
        </div>
      )
    }

    return (
      <div
        className={cn(avatarFallbackVariants({ size, variant, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

AvatarFallback.displayName = "AvatarFallback"

export { AvatarFallback, avatarFallbackVariants }
