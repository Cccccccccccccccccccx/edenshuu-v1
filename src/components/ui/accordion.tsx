import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
    /**
     * Whether the accordion item has a border
     * @default true
     */
    hasBorder?: boolean
    /**
     * Additional class name for the item
     */
    itemClassName?: string
  }
>(({ className, hasBorder = true, itemClassName, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "overflow-hidden",
      hasBorder && "border-b border-border last:border-b-0",
      itemClassName
    )}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    /**
     * Whether to hide the chevron icon
     * @default false
     */
    hideChevron?: boolean
    /**
     * Custom chevron icon
     */
    chevronIcon?: React.ReactNode
    /**
     * Additional class name for the chevron
     */
    chevronClassName?: string
  }
>(({ 
  className, 
  children, 
  hideChevron = false, 
  chevronIcon,
  chevronClassName,
  ...props 
}, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      {!hideChevron && (
        chevronIcon || (
          <ChevronDown 
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
              chevronClassName
            )} 
          />
        )
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
    /**
     * Additional class name for the content wrapper
     */
    wrapperClassName?: string
  }
>(({ className, children, wrapperClassName, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", wrapperClassName, className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

// Extended components
interface AccordionItemWithTriggerProps 
  extends React.ComponentProps<typeof AccordionPrimitive.Item> {
  /**
   * The trigger content
   */
  trigger: React.ReactNode
  /**
   * The content to show when expanded
   */
  children: React.ReactNode
  /**
   * Additional class name for the trigger
   */
  triggerClassName?: string
  /**
   * Additional class name for the content
   */
  contentClassName?: string
  /**
   * Whether the item is disabled
   */
  disabled?: boolean
  /**
   * Whether to hide the chevron icon
   */
  hideChevron?: boolean
  /**
   * Custom chevron icon
   */
  chevronIcon?: React.ReactNode
  /**
   * Additional class name for the chevron
   */
  chevronClassName?: string
  /**
   * Whether the item has a border
   */
  hasBorder?: boolean
}

const AccordionItemWithTrigger = ({
  value,
  trigger,
  children,
  className,
  triggerClassName,
  contentClassName,
  disabled,
  hideChevron = false,
  chevronIcon,
  chevronClassName,
  hasBorder = true,
  ...props
}: AccordionItemWithTriggerProps) => {
  return (
    <AccordionItem 
      value={value} 
      className={className}
      hasBorder={hasBorder}
      {...props}
    >
      <AccordionTrigger 
        className={triggerClassName}
        disabled={disabled}
        hideChevron={hideChevron}
        chevronIcon={chevronIcon}
        chevronClassName={chevronClassName}
      >
        {trigger}
      </AccordionTrigger>
      <AccordionContent className={contentClassName}>
        {children}
      </AccordionContent>
    </AccordionItem>
  )
}

// Accordion group component
interface AccordionGroupProps 
  extends React.ComponentProps<typeof AccordionPrimitive.Root> {
  /**
   * The accordion items
   */
  items: {
    value: string
    trigger: React.ReactNode
    content: React.ReactNode
    disabled?: boolean
  }[]
  /**
   * The type of accordion
   * @default "single"
   */
  type?: "single" | "multiple"
  /**
   * Whether to allow multiple items to be open at once
   * Only applicable when type is "multiple"
   * @default false
   */
  collapsible?: boolean
  /**
   * The value of the currently open item(s)
   */
  value?: string | string[]
  /**
   * Callback when the value changes
   */
  onValueChange?: (value: string | string[]) => void
  /**
   * Whether to hide the chevron icons
   * @default false
   */
  hideChevrons?: boolean
  /**
   * Custom chevron icon
   */
  chevronIcon?: React.ReactNode
  /**
   * Additional class name for the accordion
   */
  className?: string
  /**
   * Additional class name for the items
   */
  itemClassName?: string
  /**
   * Additional class name for the triggers
   */
  triggerClassName?: string
  /**
   * Additional class name for the contents
   */
  contentClassName?: string
  /**
   * Whether to show borders between items
   * @default true
   */
  hasBorders?: boolean
}

const AccordionGroup = ({
  items,
  type = "single",
  collapsible = false,
  value: controlledValue,
  onValueChange,
  hideChevrons = false,
  chevronIcon,
  className,
  itemClassName,
  triggerClassName,
  contentClassName,
  hasBorders = true,
  ...props
}: AccordionGroupProps) => {
  const [internalValue, setInternalValue] = React.useState<string | string[]>(
    type === "multiple" ? [] : ""
  )

  const value = controlledValue !== undefined ? controlledValue : internalValue

  const handleValueChange = (newValue: string | string[]) => {
    if (onValueChange) {
      onValueChange(newValue)
    } else {
      setInternalValue(newValue)
    }
  }

  return (
    <Accordion
      type={type}
      collapsible={collapsible}
      value={value}
      onValueChange={handleValueChange}
      className={className}
      {...props}
    >
      {items.map((item) => (
        <AccordionItemWithTrigger
          key={item.value}
          value={item.value}
          trigger={item.trigger}
          disabled={item.disabled}
          className={itemClassName}
          triggerClassName={triggerClassName}
          contentClassName={contentClassName}
          hideChevron={hideChevrons}
          chevronIcon={chevronIcon}
          hasBorder={hasBorders}
        >
          {item.content}
        </AccordionItemWithTrigger>
      ))}
    </Accordion>
  )
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionItemWithTrigger,
  AccordionGroup,
}
