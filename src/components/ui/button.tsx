import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2, AlertCircle, CheckCircle2, XCircle, Info } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98]",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70",
        ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        link: "underline-offset-4 hover:underline text-primary p-0 h-auto",
        success: "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-600/90",
        warning: "bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-500/90",
        info: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-500/90",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md text-xs",
        lg: "h-11 px-8 rounded-md text-base",
        xl: "h-14 px-10 rounded-lg text-lg",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  status?: 'default' | 'success' | 'error' | 'warning' | 'info'
}

const statusIcons = {
  success: <CheckCircle2 className="h-4 w-4" />,
  error: <XCircle className="h-4 w-4" />,
  warning: <AlertCircle className="h-4 w-4" />,
  info: <Info className="h-4 w-4" />,
  default: null,
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    asChild = false,
    isLoading = false,
    disabled,
    children,
    leftIcon,
    rightIcon,
    status = 'default',
    rounded,
    fullWidth,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    const statusIcon = statusIcons[status]
    const showLeftIcon = (leftIcon || (status !== 'default' && statusIcon)) && !isLoading
    const showRightIcon = rightIcon && !isLoading

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className, rounded, fullWidth }),
          {
            'cursor-not-allowed opacity-70': isLoading || disabled,
            'pl-3': showLeftIcon,
            'pr-3': showRightIcon,
          }
        )}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {showLeftIcon && (
          <span className="mr-2">
            {status !== 'default' ? statusIcon : leftIcon}
          </span>
        )}
        {children}
        {showRightIcon && (
          <span className="ml-2">
            {rightIcon}
          </span>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

// Button group component
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  vertical?: boolean
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ children, className, vertical = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex',
          vertical ? 'flex-col space-y-2' : 'flex-row space-x-2',
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              // @ts-ignore
              className: cn(
                vertical ? 'w-full' : '',
                index === 0 && !vertical && 'rounded-r-none',
                index === React.Children.count(children) - 1 && !vertical && 'rounded-l-none',
                index > 0 && index < React.Children.count(children) - 1 && !vertical && 'rounded-none',
                index === 0 && vertical && 'rounded-b-none',
                index === React.Children.count(children) - 1 && vertical && 'rounded-t-none',
                index > 0 && index < React.Children.count(children) - 1 && vertical && 'rounded-none',
                child.props.className
              ),
            })
          }
          return child
        })}
      </div>
    )
  }
)
ButtonGroup.displayName = "ButtonGroup"

export { Button, ButtonGroup, buttonVariants }
