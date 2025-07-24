import * as React from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar as CalendarIcon, Clock, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type DatePickerProps = {
  /**
   * The selected date
   */
  date?: Date | null
  /**
   * Callback when the date changes
   */
  onSelect: (date: Date | null) => void
  /**
   * Label for the date picker
   */
  label?: string
  /**
   * Placeholder text
   */
  placeholder?: string
  /**
   * Whether the date picker is disabled
   */
  disabled?: boolean
  /**
   * Whether to show time selection
   */
  showTimeSelect?: boolean
  /**
   * Time interval in minutes
   */
  timeIntervals?: number
  /**
   * Minimum date that can be selected
   */
  minDate?: Date
  /**
   * Maximum date that can be selected
   */
  maxDate?: Date
  /**
   * Whether to allow clearing the date
   */
  allowClear?: boolean
  /**
   * Additional class name
   */
  className?: string
}

export function DatePicker({
  date,
  onSelect,
  label,
  placeholder = "Sélectionner une date",
  disabled = false,
  showTimeSelect = false,
  timeIntervals = 30,
  minDate,
  maxDate,
  allowClear = true,
  className,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(date || null)
  const [timeValue, setTimeValue] = React.useState<string>(
    date ? format(date, 'HH:mm') : ''
  )

  // Update internal state when date prop changes
  React.useEffect(() => {
    setSelectedDate(date || null)
    if (date) {
      setTimeValue(format(date, 'HH:mm'))
    } else {
      setTimeValue('')
    }
  }, [date])

  const handleDateSelect = (newDate: Date | undefined) => {
    if (!newDate) return
    
    let dateWithTime = newDate
    
    // If we have a time value, apply it to the new date
    if (timeValue) {
      const [hours, minutes] = timeValue.split(':').map(Number)
      dateWithTime = new Date(newDate)
      dateWithTime.setHours(hours, minutes, 0, 0)
    }
    
    setSelectedDate(dateWithTime)
    onSelect(dateWithTime)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value
    setTimeValue(newTime)
    
    if (selectedDate && newTime) {
      const [hours, minutes] = newTime.split(':').map(Number)
      const newDate = new Date(selectedDate)
      newDate.setHours(hours, minutes, 0, 0)
      onSelect(newDate)
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedDate(null)
    setTimeValue('')
    onSelect(null)
  }

  const formatDisplayDate = (date: Date | null) => {
    if (!date) return ''
    
    if (showTimeSelect) {
      return format(date, 'PPPp', { locale: fr })
    }
    
    return format(date, 'PPP', { locale: fr })
  }

  const triggerContent = (
    <div className="flex w-full items-center">
      <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
      <span className="flex-1 truncate text-left">
        {selectedDate ? formatDisplayDate(selectedDate) : placeholder}
      </span>
      
      {allowClear && selectedDate && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="ml-2 h-6 w-6 rounded-full hover:bg-transparent hover:text-foreground"
          onClick={handleClear}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  )

  const triggerButton = (
    <Button
      variant="outline"
      className={cn(
        "w-full justify-start text-left font-normal",
        !selectedDate && "text-muted-foreground"
      )}
      disabled={disabled}
    >
      {triggerContent}
    </Button>
  )

  return (
    <div className={cn("w-full space-y-2", className)}>
      {label && <Label>{label}</Label>}
      
      <Popover>
        <PopoverTrigger asChild>
          {triggerButton}
        </PopoverTrigger>
        
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate || undefined}
            onSelect={handleDateSelect}
            locale={fr}
            initialFocus
            disabled={disabled}
            fromDate={minDate}
            toDate={maxDate}
            className="border-0"
          />
          
          {showTimeSelect && (
            <div className="border-t p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="time"
                  value={timeValue}
                  onChange={handleTimeChange}
                  className="w-full"
                  step={timeIntervals * 60}
                />
              </div>
            </div>
          )}
          
          <div className="flex justify-end border-t p-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedDate(new Date())
                setTimeValue(format(new Date(), 'HH:mm'))
                onSelect(new Date())
              }}
            >
              Aujourd'hui
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
