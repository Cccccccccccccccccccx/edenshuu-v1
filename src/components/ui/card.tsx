import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md",
  {
    variants: {
      variant: {
        default: "border-border",
        primary: "border-primary/20 bg-primary/5 hover:bg-primary/10",
        secondary: "border-secondary/20 bg-secondary/5 hover:bg-secondary/10",
        success: "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10",
        warning: "border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10",
        danger: "border-destructive/20 bg-destructive/5 hover:bg-destructive/10",
        info: "border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10",
        outline: "border-border bg-transparent hover:bg-accent/50",
      },
      shadow: {
        none: "shadow-none hover:shadow-none",
        sm: "shadow-sm hover:shadow",
        md: "shadow-md hover:shadow-lg",
        lg: "shadow-lg hover:shadow-xl",
        xl: "shadow-xl hover:shadow-2xl",
      },
      hoverable: {
        true: "cursor-pointer transition-transform hover:-translate-y-0.5",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      shadow: "md",
      hoverable: false,
    },
  }
)

interface CardProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant,
    shadow,
    hoverable,
    fullWidth,
    asChild = false,
    ...props
  }, ref) => {
    const Comp = asChild ? 'div' : 'div' // Always use div for Card
    
    return (
      <Comp
        ref={ref}
        className={cn(cardVariants({ variant, shadow, hoverable, fullWidth, className }))}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter, 
  cardVariants 
}
