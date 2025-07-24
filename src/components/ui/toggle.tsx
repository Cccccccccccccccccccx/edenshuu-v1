import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 data-[state=on]:bg-secondary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 data-[state=on]:bg-destructive/90",
        ghost: "hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent",
        link: "text-primary underline-offset-4 hover:underline data-[state=on]:underline",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5 text-xs",
        lg: "h-11 px-5 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {
  /**
   * Whether to show a loading state
   */
  isLoading?: boolean
  /**
   * Left icon to display before the content
   */
  leftIcon?: React.ReactNode
  /**
   * Right icon to display after the content
   */
  rightIcon?: React.ReactNode
  /**
   * Whether to show only the icon
   */
  iconOnly?: boolean
  /**
   * Whether to show a loading spinner
   */
  showSpinner?: boolean
  /**
   * Custom loading spinner
   */
  spinner?: React.ReactNode
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      leftIcon,
      rightIcon,
      iconOnly = false,
      showSpinner = true,
      spinner,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isIconOnly = iconOnly || (!children && (!!leftIcon || !!rightIcon))
    
    const Spinner = spinner || (
      <svg
        className="h-4 w-4 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    )

    return (
      <TogglePrimitive.Root
        ref={ref}
        className={cn(
          toggleVariants({ variant, size, className }),
          isIconOnly && "!p-0",
          {
            "opacity-70 cursor-not-allowed": isLoading || disabled,
          }
        )}
        disabled={isLoading || disabled}
        data-loading={isLoading ? "" : undefined}
        {...props}
      >
        {isLoading && showSpinner ? (
          <span className="flex items-center">
            {Spinner}
            {!isIconOnly && <span className="ml-2">Chargement...</span>}
          </span>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {!isIconOnly && children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </TogglePrimitive.Root>
    )
  }
)

Toggle.displayName = TogglePrimitive.Root.displayName

// Toggle group component
const ToggleGroup = TogglePrimitive.Group

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants> & {
      /**
       * Whether to show only the icon
       */
      iconOnly?: boolean
    }
>(({ className, variant, size, iconOnly, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(
      toggleVariants({ variant, size, className }),
      iconOnly && "!p-0"
    )}
    {...props}
  />
))

ToggleGroupItem.displayName = TogglePrimitive.Root.displayName

export {
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  toggleVariants,
}
