import * as React from "react"
import { cn } from "@/lib/utils"
import { Loader2, X, Search, Eye, EyeOff, Check, AlertCircle } from "lucide-react"

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'> {
  /**
   * Optional prefix element (like an icon) to display before the input
   */
  prefix?: React.ReactNode
  /**
   * Optional suffix element (like an icon) to display after the input
   */
  suffix?: React.ReactNode
  /**
   * Show a loading spinner
   */
  isLoading?: boolean
  /**
   * Show a clear button that appears when there's a value
   */
  showClearButton?: boolean
  /**
   * Callback when the clear button is clicked
   */
  onClear?: () => void
  /**
   * Show a search icon (overrides suffix when true)
   */
  isSearch?: boolean
  /**
   * Show a password toggle button (overrides suffix when true)
   */
  isPassword?: boolean
  /**
   * Show a success state with a checkmark
   */
  isValid?: boolean
  /**
   * Show an error state with an error icon
   */
  hasError?: boolean
  /**
   * Error message to display below the input
   */
  errorMessage?: string
  /**
   * Helper text to display below the input
   */
  helperText?: string
  /**
   * Label text for the input
   */
  label?: string
  /**
   * HTML id for the input (required when label is provided for a11y)
   */
  id?: string
  /**
   * Size variant of the input
   */
  inputSize?: 'sm' | 'md' | 'lg'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type,
    prefix,
    suffix,
    isLoading = false,
    showClearButton = false,
    onClear,
    isSearch = false,
    isPassword = false,
    isValid = false,
    hasError = false,
    errorMessage,
    helperText,
    label,
    id,
    inputSize = 'md',
    value,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)
    const inputId = id || React.useId()
    const hasValue = value !== undefined && value !== null && value !== ''
    const showClearBtn = showClearButton && hasValue && !isLoading
    const showSuffix = suffix || isSearch || isPassword || showClearBtn || isValid || hasError

    const inputSizeClasses = {
      sm: 'h-8 text-xs px-2.5',
      md: 'h-10 text-sm px-3',
      lg: 'h-12 text-base px-4',
    }

    const iconSizeClasses = {
      sm: 'h-3.5 w-3.5',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    }

    const renderSuffix = () => {
      if (isLoading) {
        return <Loader2 className={cn(iconSizeClasses[inputSize], "animate-spin text-muted-foreground")} />
      }
      
      if (hasError) {
        return <AlertCircle className={cn(iconSizeClasses[inputSize], "text-destructive")} />
      }
      
      if (isValid) {
        return <Check className={cn(iconSizeClasses[inputSize], "text-emerald-500")} />
      }
      
      if (showClearBtn) {
        return (
          <button
            type="button"
            onClick={onClear}
            className="rounded-full p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className={iconSizeClasses[inputSize]} />
          </button>
        )
      }
      
      if (isPassword) {
        const Icon = showPassword ? EyeOff : Eye
        return (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon className={iconSizeClasses[inputSize]} />
          </button>
        )
      }
      
      if (isSearch) {
        return <Search className={cn(iconSizeClasses[inputSize], "text-muted-foreground")} />
      }
      
      return suffix
    }

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {prefix && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-muted-foreground">
                {prefix}
              </span>
            </div>
          )}
          
          <input
            type={isPassword && !showPassword ? 'password' : type}
            id={inputId}
            className={cn(
              "flex w-full rounded-md border border-input bg-background font-medium ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    inputSizeClasses[inputSize],
              {
                'pl-9': prefix,
                'pr-9': showSuffix,
                'border-destructive focus-visible:ring-destructive/30': hasError,
                'border-emerald-500 focus-visible:ring-emerald-500/30': isValid,
                'focus:border-primary': !hasError && !isValid,
              },
              className
            )}
            ref={ref}
            value={value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          
          {showSuffix && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {renderSuffix()}
            </div>
          )}
        </div>
        
        {(errorMessage || helperText) && (
          <p className={cn(
            "text-xs",
            hasError ? "text-destructive" : "text-muted-foreground"
          )}>
            {errorMessage || helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
