import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-800/30",
        warning:
          "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-800/30",
        info: 
          "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/30",
        error:
          "border-transparent bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-800/30",
        premium:
          "bg-gradient-to-r from-amber-500 to-rose-500 text-white border-0",
      },
      size: {
        sm: "text-xs px-1.5 py-0.5",
        md: "text-xs px-2.5 py-0.5",
        lg: "text-sm px-3 py-1",
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
      size: "md",
      rounded: "full",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Whether the badge is interactive (hover/click effects)
   */
  interactive?: boolean
  /**
   * Whether the badge is selected/active
   */
  selected?: boolean
  /**
   * Whether the badge has a close button
   */
  onClose?: () => void
  /**
   * Custom close button icon
   */
  closeIcon?: React.ReactNode
  /**
   * Custom left icon
   */
  leftIcon?: React.ReactNode
  /**
   * Custom right icon
   */
  rightIcon?: React.ReactNode
  /**
   * Whether the badge is in a loading state
   */
  isLoading?: boolean
  /**
   * Custom class name for the close button
   */
  closeButtonClassName?: string
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      interactive = false,
      selected = false,
      onClose,
      closeIcon,
      leftIcon,
      rightIcon,
      isLoading = false,
      closeButtonClassName,
      children,
      ...props
    },
    ref
  ) => {
    const hasClose = !!onClose
    const hasLeftIcon = !!leftIcon
    const hasRightIcon = !!rightIcon || hasClose
    
    const CloseIcon = closeIcon || <X className="h-3 w-3" />
    
    return (
      <div
        ref={ref}
        className={cn(
          badgeVariants({ variant, size, rounded, className }),
          interactive && "cursor-pointer transition-all hover:opacity-80 active:scale-95",
          selected && "ring-2 ring-offset-2 ring-primary",
          {
            "pl-1.5": hasLeftIcon,
            "pr-1.5": hasRightIcon,
          }
        )}
        {...props}
      >
        {isLoading ? (
          <div className="mr-1.5 h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : hasLeftIcon ? (
          <span className="mr-1.5 flex items-center">
            {leftIcon}
          </span>
        ) : null}
        
        {children}
        
        {hasRightIcon && !hasClose ? (
          <span className="ml-1.5 flex items-center">
            {rightIcon}
          </span>
        ) : hasClose ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClose?.()
            }}
            className={cn(
              "ml-1.5 flex items-center rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/20",
              closeButtonClassName
            )}
            aria-label="Remove"
          >
            {CloseIcon}
          </button>
        ) : null}
      </div>
    )
  }
)
Badge.displayName = "Badge"

// Badge group component
interface BadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the badges should be stacked
   */
  stacked?: boolean
  /**
   * Whether the badges should be centered
   */
  centered?: boolean
  /**
   * Whether the badges should take up full width
   */
  fullWidth?: boolean
  /**
   * Gap between badges
   */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg'
}

const badgeGroupGaps = {
  none: 'space-x-0',
  xs: 'space-x-1',
  sm: 'space-x-2',
  md: 'space-x-3',
  lg: 'space-x-4',
}

const BadgeGroup = React.forwardRef<HTMLDivElement, BadgeGroupProps>(
  ({
    className,
    stacked = false,
    centered = false,
    fullWidth = false,
    gap = 'sm',
    children,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center",
          !stacked && badgeGroupGaps[gap],
          stacked && `-space-x-2 [&>*]:ring-2 [&>*]:ring-background`,
          centered && "justify-center",
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} className={stacked ? "inline-block" : "inline-flex"}>
            {child}
          </div>
        ))}
      </div>
    )
  }
)
BadgeGroup.displayName = "BadgeGroup"

export { Badge, BadgeGroup, badgeVariants }
