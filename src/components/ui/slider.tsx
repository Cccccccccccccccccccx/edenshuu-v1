import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sliderVariants = cva(
  "relative flex w-full touch-none select-none items-center",
  {
    variants: {
      size: {
        default: "h-6",
        sm: "h-5",
        lg: "h-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const sliderTrackVariants = cva(
  "relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      variant: {
        default: "",
        primary: "",
        success: "",
        warning: "",
        error: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const sliderRangeVariants = cva(
  "absolute h-full",
  {
    variants: {
      variant: {
        default: "bg-primary",
        primary: "bg-blue-500",
        success: "bg-emerald-500",
        warning: "bg-amber-500",
        error: "bg-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const sliderThumbVariants = cva(
  "block h-4 w-4 rounded-full border-2 border-primary bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-primary bg-background",
        primary: "border-blue-500 bg-background",
        success: "border-emerald-500 bg-background",
        warning: "border-amber-500 bg-background",
        error: "border-destructive bg-background",
      },
      size: {
        default: "h-4 w-4",
        sm: "h-3.5 w-3.5",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> &
  VariantProps<typeof sliderVariants> &
  VariantProps<typeof sliderTrackVariants> &
  VariantProps<typeof sliderRangeVariants> &
  VariantProps<typeof sliderThumbVariants> & {
    /**
     * Whether to show tooltip with current value
     */
    showTooltip?: boolean
    /**
     * Custom tooltip formatter
     */
    formatTooltip?: (value: number) => string
    /**
     * Whether to show the value label
     */
    showValue?: boolean
    /**
     * Custom value formatter
     */
    formatValue?: (value: number) => string
    /**
     * Whether to show min and max labels
     */
    showMinMax?: boolean
    /**
     * Custom min label
     */
    minLabel?: string
    /**
     * Custom max label
     */
    maxLabel?: string
    /**
     * Whether to show steps/marks
     */
    showMarks?: boolean
    /**
     * Step size for marks
     */
    stepSize?: number
    /**
     * Whether to show the track background
     */
    showTrack?: boolean
    /**
     * Whether to show the range background
     */
    showRange?: boolean
    /**
     * Whether to show the thumb
     */
    showThumb?: boolean
    /**
     * Whether the slider is disabled
     */
    disabled?: boolean
    /**
     * Additional class name for the root element
     */
    className?: string
    /**
     * Additional class name for the track
     */
    trackClassName?: string
    /**
     * Additional class name for the range
     */
    rangeClassName?: string
    /**
     * Additional class name for the thumb
     */
    thumbClassName?: string
  }

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      variant,
      size,
      showTooltip = false,
      formatTooltip,
      showValue = false,
      formatValue = (value) => value.toString(),
      showMinMax = false,
      minLabel,
      maxLabel,
      showMarks = false,
      stepSize = 25,
      showTrack = true,
      showRange = true,
      showThumb = true,
      disabled = false,
      trackClassName,
      rangeClassName,
      thumbClassName,
      min = 0,
      max = 100,
      step = 1,
      value: propValue,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = React.useState<number[]>(
      propValue || defaultValue || [min]
    )
    const [isDragging, setIsDragging] = React.useState(false)

    // Update internal state when propValue changes
    React.useEffect(() => {
      if (propValue !== undefined) {
        setValue(Array.isArray(propValue) ? propValue : [propValue])
      }
    }, [propValue])

    const handleValueChange = (newValue: number[]) => {
      setValue(newValue)
    }

    const handleDragStart = () => {
      setIsDragging(true)
    }

    const handleDragEnd = () => {
      setIsDragging(false)
    }

    const currentValue = value?.[0] ?? min
    const percentage = ((currentValue - min) / (max - min)) * 100

    const marks = React.useMemo(() => {
      if (!showMarks || stepSize <= 0) return []
      
      const marks = []
      for (let i = min; i <= max; i += stepSize) {
        marks.push(i)
      }
      
      // Ensure max is included
      if (marks[marks.length - 1] !== max) {
        marks.push(max)
      }
      
      return marks
    }, [min, max, stepSize, showMarks])

    const formatTooltipValue = (val: number) => {
      if (formatTooltip) {
        return formatTooltip(val)
      }
      return formatValue ? formatValue(val) : val.toString()
    }

    return (
      <div className="w-full space-y-3">
        {/* Value display */}
        {(showValue || showMinMax) && (
          <div className="flex items-center justify-between">
            {showValue && (
              <div className="text-sm font-medium">
                {formatValue(currentValue)}
              </div>
            )}
            {showMinMax && (
              <div className="flex items-center space-x-4">
                <span className="text-xs text-muted-foreground">
                  {minLabel || formatValue(min)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {maxLabel || formatValue(max)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Slider */}
        <div className="relative w-full">
          <SliderPrimitive.Root
            ref={ref}
            className={cn(
              sliderVariants({ size, className }),
              disabled && "cursor-not-allowed opacity-60"
            )}
            value={value}
            onValueChange={handleValueChange}
            onPointerDown={handleDragStart}
            onPointerUp={handleDragEnd}
            onKeyDownCapture={(e) => {
              // Prevent page scroll when using arrow keys
              if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault()
              }
            }}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            {...props}
          >
            {showTrack && (
              <SliderPrimitive.Track
                className={cn(sliderTrackVariants({ variant }), trackClassName)}
              >
                {showRange && (
                  <SliderPrimitive.Range
                    className={cn(
                      sliderRangeVariants({ variant }),
                      rangeClassName
                    )}
                  />
                )}
              </SliderPrimitive.Track>
            )}

            {value?.map((_, i) => (
              <SliderPrimitive.Thumb
                key={i}
                className={cn(
                  sliderThumbVariants({ variant, size }),
                  thumbClassName,
                  "relative",
                  showTooltip && "group"
                )}
              >
                {showTooltip && !disabled && (
                  <div
                    className={cn(
                      "absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100",
                      isDragging && "opacity-100"
                    )}
                  >
                    {formatTooltipValue(value[i])}
                  </div>
                )}
              </SliderPrimitive.Thumb>
            ))}
          </SliderPrimitive.Root>

          {/* Marks */}
          {showMarks && marks.length > 0 && (
            <div className="relative mt-2 w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="h-0.5 w-full bg-border" />
              </div>
              <div className="relative flex justify-between">
                {marks.map((mark) => {
                  const isActive = value?.some((v) => v >= mark - stepSize / 2 && v <= mark + stepSize / 2)
                  const position = ((mark - min) / (max - min)) * 100
                  
                  return (
                    <div
                      key={mark}
                      className="relative flex flex-col items-center"
                      style={{
                        left: `${position}%`,
                        transform: 'translateX(-50%)',
                      }}
                    >
                      <div
                        className={cn(
                          "h-1.5 w-0.5 rounded-full",
                          isActive
                            ? "bg-foreground"
                            : "bg-border"
                        )}
                      />
                      <span className="mt-1 text-xs text-muted-foreground">
                        {mark}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
)

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider, sliderVariants, sliderTrackVariants, sliderRangeVariants, sliderThumbVariants }
