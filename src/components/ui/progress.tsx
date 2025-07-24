import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const progressVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      variant: {
        default: "",
        primary: "",
        success: "",
        warning: "",
        error: "",
      },
      size: {
        default: "h-2",
        sm: "h-1.5",
        lg: "h-3",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "full",
    },
  }
)

const indicatorVariants = cva(
  "h-full w-full flex-1 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-primary",
        primary: "bg-blue-500",
        success: "bg-emerald-500",
        warning: "bg-amber-500",
        error: "bg-destructive",
      },
      striped: {
        true: "bg-stripes",
      },
      animated: {
        true: "animate-pulse",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type ProgressProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof progressVariants> & {
    /**
     * The value of the progress indicator (0-100)
     */
    value?: number
    /**
     * Whether to show a striped pattern
     */
    striped?: boolean
    /**
     * Whether to animate the progress bar
     */
    animated?: boolean
    /**
     * Custom label to display
     */
    label?: string
    /**
     * Whether to show the value as text
     */
    showValue?: boolean
    /**
     * Custom class name for the indicator
     */
    indicatorClassName?: string
  }

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      variant,
      size,
      rounded,
      striped = false,
      animated = false,
      label,
      showValue = false,
      indicatorClassName,
      ...props
    },
    ref
  ) => {
    const progress = Math.min(100, Math.max(0, value || 0))
    const hasLabel = label || showValue

    return (
      <div className="w-full space-y-1.5">
        {hasLabel && (
          <div className="flex items-center justify-between">
            {label && (
              <span className="text-sm font-medium text-foreground">
                {label}
              </span>
            )}
            {showValue && (
              <span className="text-xs text-muted-foreground">
                {Math.round(progress)}%
              </span>
            )}
          </div>
        )}
        
        <div
          ref={ref}
          className={cn(progressVariants({ variant, size, rounded, className }))}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          {...props}
        >
          <div
            className={cn(
              indicatorVariants({ variant, striped, animated }),
              indicatorClassName
            )}
            style={{
              transform: `translateX(-${100 - progress}%)`,
            }}
          />
        </div>
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress, progressVariants, indicatorVariants }
