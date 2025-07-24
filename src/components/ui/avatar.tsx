import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-xs",
        sm: "h-8 w-8 text-sm",
        default: "h-10 w-10 text-base",
        lg: "h-12 w-12 text-lg",
        xl: "h-16 w-16 text-xl",
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

export interface AvatarProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof avatarVariants> {
  /**
   * The source URL of the avatar image
   */
  src?: string
  /**
   * Alternative text for the avatar image
   */
  alt?: string
  /**
   * Fallback content when the image fails to load
   */
  fallback?: React.ReactNode
  /**
   * Additional class name for the avatar container
   */
  className?: string
  /**
   * Additional class name for the image element
   */
  imgClassName?: string
  /**
   * Additional class name for the fallback element
   */
  fallbackClassName?: string
  /**
   * Whether the avatar is in a loading state
   */
  isLoading?: boolean
  /**
   * Custom loading component
   */
  loadingComponent?: React.ReactNode
  /**
   * Whether to show a status indicator
   */
  showStatus?: boolean
  /**
   * Status indicator color
   */
  statusColor?: "online" | "offline" | "busy" | "away" | string
  /**
   * Position of the status indicator
   */
  statusPosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
  /**
   * Whether the avatar is interactive (adds hover/focus styles)
   */
  interactive?: boolean
  /**
   * Whether to show a border around the avatar
   */
  bordered?: boolean
  /**
   * Border color
   */
  borderColor?: string
  /**
   * Border width in pixels
   */
  borderWidth?: number
  /**
   * Custom styles for the status indicator
   */
  statusStyle?: React.CSSProperties
}

const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  (
    {
      src,
      alt,
      fallback,
      className,
      imgClassName,
      fallbackClassName,
      size,
      variant,
      isLoading = false,
      loadingComponent,
      showStatus = false,
      statusColor = "online",
      statusPosition = "bottom-right",
      interactive = false,
      bordered = false,
      borderColor = "hsl(var(--border))",
      borderWidth = 2,
      statusStyle,
      ...props
    },
    ref
  ) => {
    const [imgError, setImgError] = React.useState(false)
    const showFallback = !src || imgError || isLoading

    const statusColorClass = {
      online: "bg-emerald-500",
      offline: "bg-muted-foreground/50",
      busy: "bg-destructive",
      away: "bg-amber-500",
    }[statusColor] || statusColor

    const statusPositionClass = {
      "top-right": "top-0 right-0",
      "top-left": "top-0 left-0",
      "bottom-right": "bottom-0 right-0",
      "bottom-left": "bottom-0 left-0",
    }[statusPosition]

    const handleError = () => {
      setImgError(true)
    }

    return (
      <div className="relative inline-flex">
        <div
          className={cn(
            avatarVariants({ size, variant, className }),
            interactive && "transition-transform hover:scale-105",
            bordered && "ring-2 ring-offset-2",
            {
              "animate-pulse": isLoading,
              [className || ""]: className,
            }
          )}
          style={{
            ...(bordered && {
              borderColor,
              borderWidth: `${borderWidth}px`,
            }),
          }}
        >
          {!showFallback ? (
            <img
              ref={ref}
              src={src}
              alt={alt || ""}
              className={cn(
                "h-full w-full object-cover",
                imgClassName
              )}
              onError={handleError}
              {...props}
            />
          ) : isLoading && loadingComponent ? (
            <div className="flex h-full w-full items-center justify-center">
              {loadingComponent}
            </div>
          ) : (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center font-medium",
                fallbackClassName
              )}
            >
              {fallback}
            </div>
          )}
        </div>

        {showStatus && (
          <span
            className={cn(
              "absolute h-2.5 w-2.5 rounded-full border-2 border-background",
              statusColorClass,
              statusPositionClass
            )}
            style={statusStyle}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = "Avatar"

// AvatarGroup component
type AvatarGroupProps = {
  /**
   * The avatars to display in the group
   */
  children: React.ReactNode
  /**
   * Maximum number of avatars to show before truncating
   */
  max?: number
  /**
   * Additional class name for the avatar group container
   */
  className?: string
  /**
   * Additional class name for the avatar items
   */
  itemClassName?: string
  /**
   * Spacing between avatars (in pixels, negative values allowed)
   */
  spacing?: number
  /**
   * Whether to stack the avatars on top of each other
   */
  stacked?: boolean
  /**
   * Size of the avatars in the group
   */
  size?: "xs" | "sm" | "default" | "lg" | "xl"
}

const AvatarGroup = ({
  children,
  max = 5,
  className,
  itemClassName,
  spacing = -8,
  stacked = true,
  size = "default",
}: AvatarGroupProps) => {
  const avatars = React.Children.toArray(children)
  const totalAvatars = avatars.length
  const avatarsToShow = Math.min(max, totalAvatars)
  const excess = totalAvatars - avatarsToShow

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex">
        {avatars.slice(0, avatarsToShow).map((avatar, index) => (
          <div
            key={index}
            className={cn(
              "overflow-hidden rounded-full border-2 border-background",
              itemClassName,
              {
                "-ml-2 first:ml-0": !stacked,
              }
            )}
            style={{
              marginLeft: index > 0 ? `${spacing}px` : 0,
              zIndex: avatarsToShow - index,
            }}
          >
            {React.isValidElement(avatar)
              ? React.cloneElement(avatar as React.ReactElement, {
                  size,
                  className: cn(
                    "border-2 border-background",
                    avatar.props.className
                  ),
                })
              : avatar}
          </div>
        ))}
      </div>
      {excess > 0 && (
        <div
          className={cn(
            "relative -ml-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium",
            avatarVariants({ size }),
            itemClassName
          )}
        >
          +{excess}
        </div>
      )}
    </div>
  )
}

AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarGroup, avatarVariants }
