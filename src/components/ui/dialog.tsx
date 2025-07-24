import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = ({
  children,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal {...props}>
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
      {children}
    </div>
  </DialogPrimitive.Portal>
)
DialogPortal.displayName = DialogPrimitive.Portal.displayName

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    /**
     * Whether to show the close button
     * @default true
     */
    showCloseButton?: boolean
    /**
     * Custom close button
     */
    closeButton?: React.ReactNode
    /**
     * Whether to hide the overlay
     * @default false
     */
    hideOverlay?: boolean
    /**
     * Size of the dialog
     * @default 'default'
     */
    size?: 'sm' | 'default' | 'lg' | 'xl' | 'full'
  }
>(({ 
  className, 
  children, 
  showCloseButton = true, 
  closeButton,
  hideOverlay = false,
  size = 'default',
  ...props 
}, ref) => {
  const sizeClasses = {
    sm: 'sm:max-w-md',
    default: 'sm:max-w-lg',
    lg: 'sm:max-w-2xl',
    xl: 'sm:max-w-4xl',
    full: 'sm:max-w-[95vw] sm:max-h-[90vh]',
  }

  return (
    <DialogPortal>
      {!hideOverlay && <DialogOverlay />}
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed z-50 grid w-full gap-4 rounded-b-lg border bg-background p-6 shadow-lg animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:rounded-lg sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0",
          "duration-200",
          sizeClasses[size],
          "max-h-[95vh] overflow-y-auto",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          closeButton || (
            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

// Extended components
interface DialogWithTriggerProps 
  extends React.ComponentProps<typeof DialogPrimitive.Root> {
  /**
   * The trigger element that will open the dialog
   */
  trigger: React.ReactNode
  /**
   * The content of the dialog
   */
  children: React.ReactNode
  /**
   * Additional class name for the trigger
   */
  triggerClassName?: string
  /**
   * Whether the dialog is open by default
   */
  defaultOpen?: boolean
  /**
   * Callback when the dialog is opened or closed
   */
  onOpenChange?: (open: boolean) => void
}

const DialogWithTrigger = ({
  trigger,
  children,
  triggerClassName,
  defaultOpen = false,
  onOpenChange,
  ...props
}: DialogWithTriggerProps) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    onOpenChange?.(open)
  }

  // S'assurer que le trigger est un seul élément React
  const triggerElement = React.isValidElement(trigger)
    ? React.cloneElement(trigger as React.ReactElement, {
        className: cn((trigger as any).props?.className, triggerClassName),
      })
    : <button className={triggerClassName}>{trigger}</button>;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange} {...props}>
      <DialogPrimitive.Trigger asChild>
        {triggerElement}
      </DialogPrimitive.Trigger>
      <DialogPortal>
        {children}
      </DialogPortal>
    </Dialog>
  )
}

// Confirmation dialog component
interface ConfirmationDialogProps {
  /**
   * Whether the dialog is open
   */
  open: boolean
  /**
   * Callback when the dialog is closed
   */
  onClose: () => void
  /**
   * Callback when the confirm button is clicked
   */
  onConfirm: () => void
  /**
   * The title of the dialog
   */
  title: string
  /**
   * The description of the dialog
   */
  description?: string
  /**
   * The text of the confirm button
   * @default "Confirm"
   */
  confirmText?: string
  /**
   * The variant of the confirm button
   * @default "default"
   */
  confirmVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  /**
   * The text of the cancel button
   * @default "Cancel"
   */
  cancelText?: string
  /**
   * Whether to show a loading state on the confirm button
   * @default false
   */
  isLoading?: boolean
  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean
  /**
   * Additional class name for the dialog
   */
  className?: string
}

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  confirmVariant = "default",
  cancelText = "Cancel",
  isLoading = false,
  showCloseButton = true,
  className,
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent 
        showCloseButton={showCloseButton} 
        onInteractOutside={(e) => e.preventDefault()}
        className={className}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogPrimitive.Close asChild>
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              className="mr-2"
            >
              {cancelText}
            </Button>
          </DialogPrimitive.Close>
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            disabled={isLoading}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogWithTrigger,
  ConfirmationDialog,
}
