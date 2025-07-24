import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: 'default' | 'pills' | 'underline' | 'contained'
    fullWidth?: boolean
  }
>(({ className, variant = 'default', fullWidth = false, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      {
        "h-10 space-x-1": variant === 'default',
        "h-auto space-x-2": variant !== 'default',
        "w-full": fullWidth,
      },
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: 'default' | 'pills' | 'underline' | 'contained'
    icon?: React.ReactNode
  }
>(({ className, variant = 'default', icon, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground",
      {
        // Default variant (segmented control)
        "data-[state=active]:bg-background data-[state=active]:shadow-sm": variant === 'default',
        
        // Pills variant
        "rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:hover:bg-accent data-[state=inactive]:hover:text-accent-foreground": 
          variant === 'pills',
          
        // Underline variant
        "rounded-none border-b-2 border-transparent px-1 py-2 data-[state=active]:border-primary data-[state=inactive]:hover:border-foreground/20 data-[state=inactive]:hover:text-foreground/80":
          variant === 'underline',
          
        // Contained variant (like Material UI)
        "rounded-md px-4 py-2 data-[state=active]:bg-background data-[state=active]:shadow data-[state=inactive]:hover:bg-accent data-[state=inactive]:hover:text-accent-foreground":
          variant === 'contained',
      },
      className
    )}
    {...props}
  >
    {icon && <span className="mr-2 h-4 w-4">{icon}</span>}
    {children}
  </TabsPrimitive.Trigger>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

// Extended components
interface TabsWithIndicatorProps extends React.ComponentProps<typeof Tabs> {
  indicatorClassName?: string
}

const TabsWithIndicator = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsWithIndicatorProps
>(({ className, indicatorClassName, children, ...props }, ref) => {
  return (
    <TabsPrimitive.Root
      ref={ref}
      className={cn("relative", className)}
      {...props}
    >
      {children}
      <div className={cn(
        "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300",
        indicatorClassName
      )} />
    </TabsPrimitive.Root>
  )
})
TabsWithIndicator.displayName = "TabsWithIndicator"

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsWithIndicator,
}
