import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Info, X, XCircle, AlertTriangle } from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        primary: "border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 [&>svg]:text-blue-500",
        success: "border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 [&>svg]:text-emerald-500",
        warning: "border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400 [&>svg]:text-amber-500",
        error: "border-destructive/20 bg-destructive/5 text-destructive dark:text-destructive-foreground [&>svg]:text-destructive",
        info: "border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 [&>svg]:text-blue-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> & {
    showIcon?: boolean
    dismissible?: boolean
    onDismiss?: () => void
  }
>(({ className, variant, showIcon = true, dismissible = false, onDismiss, children, ...props }, ref) => {
  const [isDismissed, setIsDismissed] = React.useState(false)
  
  const handleDismiss = () => {
    setIsDismissed(true)
    if (onDismiss) {
      onDismiss()
    }
  }

  if (isDismissed) return null

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className, {
        "pr-12": dismissible,
      })}
      {...props}
    >
      {showIcon && (
        <div className="absolute left-4 top-4">
          {variant === 'success' ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : variant === 'warning' ? (
            <AlertTriangle className="h-5 w-5" />
          ) : variant === 'error' ? (
            <XCircle className="h-5 w-5" />
          ) : variant === 'info' || variant === 'primary' ? (
            <Info className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
        </div>
      )}
      <div className={cn({
        "ml-8": showIcon,
        "mr-4": dismissible,
      })}>
        {children}
      </div>
      {dismissible && (
        <button
          type="button"
          className="absolute right-4 top-4 rounded-md p-0.5 text-foreground/50 hover:bg-foreground/5 hover:text-foreground/75"
          onClick={handleDismiss}
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription, alertVariants }
