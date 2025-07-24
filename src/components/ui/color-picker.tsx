import * as React from "react"
import { HexColorPicker, HexColorInput } from "react-colorful"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { cn } from "@/lib/utils"
import { Check, EyeDropper, Palette, X } from "lucide-react"

interface ColorPickerProps {
  /**
   * The selected color in hex format (e.g., "#FF0000")
   */
  color?: string
  /**
   * Callback when the color changes
   */
  onChange: (color: string) => void
  /**
   * Label for the color picker
   */
  label?: string
  /**
   * Placeholder text
   */
  placeholder?: string
  /**
   * Whether the color picker is disabled
   */
  disabled?: boolean
  /**
   * Whether to show a clear button
   */
  allowClear?: boolean
  /**
   * Whether to show the eye dropper tool
   */
  showEyeDropper?: boolean
  /**
   * Whether to show the palette tool
   */
  showPalette?: boolean
  /**
   * Whether to show the color preview
   */
  showPreview?: boolean
  /**
   * Whether to show the hex input
   */
  showHexInput?: boolean
  /**
   * Whether to show the RGB/HSL/HSV inputs
   */
  showColorInputs?: boolean
  /**
   * Whether to show the alpha channel
   */
  showAlpha?: boolean
  /**
   * Whether to show the recent colors
   */
  showRecentColors?: boolean
  /**
   * Maximum number of recent colors to show
   */
  maxRecentColors?: number
  /**
   * Preset colors to show in the palette
   */
  presetColors?: string[]
  /**
   * Additional class name
   */
  className?: string
  /**
   * Additional class name for the popover content
   */
  popoverClassName?: string
  /**
   * Additional class name for the input
   */
  inputClassName?: string
}

const DEFAULT_PRESET_COLORS = [
  "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF",
  "#FF00FF", "#FF8000", "#800080", "#008000", "#000080",
  "#808080", "#C0C0C0", "#FFFFFF", "#000000"
]

const DEFAULT_RECENT_COLORS = [
  "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"
]

export function ColorPicker({
  color = "#000000",
  onChange,
  label,
  placeholder = "Sélectionner une couleur",
  disabled = false,
  allowClear = true,
  showEyeDropper = true,
  showPalette = true,
  showPreview = true,
  showHexInput = true,
  showColorInputs = false,
  showAlpha = false,
  showRecentColors = true,
  maxRecentColors = 5,
  presetColors = DEFAULT_PRESET_COLORS,
  className,
  popoverClassName,
  inputClassName,
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [internalColor, setInternalColor] = React.useState(color)
  const [recentColors, setRecentColors] = React.useState<string[]>(DEFAULT_RECENT_COLORS)
  const [isPicking, setIsPicking] = React.useState(false)

  // Update internal state when color prop changes
  React.useEffect(() => {
    if (color !== internalColor) {
      setInternalColor(color)
    }
  }, [color])

  const handleColorChange = (newColor: string) => {
    setInternalColor(newColor)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    
    // When closing, apply the selected color
    if (!open && internalColor !== color) {
      onChange(internalColor)
      
      // Add to recent colors if it's not already there
      if (internalColor && !recentColors.includes(internalColor)) {
        const newRecentColors = [internalColor, ...recentColors].slice(0, maxRecentColors)
        setRecentColors(newRecentColors)
      }
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setInternalColor("")
    onChange("")
  }

  const handleEyeDropper = async () => {
    if (!('EyeDropper' in window)) {
      // Fallback for browsers that don't support EyeDropper API
      alert("L'outil pipette n'est pas supporté par votre navigateur")
      return
    }

    try {
      setIsPicking(true)
      // @ts-ignore - TypeScript doesn't know about the EyeDropper API yet
      const eyeDropper = new window.EyeDropper()
      const { sRGBHex } = await eyeDropper.open()
      
      if (sRGBHex) {
        setInternalColor(sRGBHex)
        onChange(sRGBHex)
      }
    } catch (error) {
      // User canceled the operation
      console.log("User canceled the eye dropper")
    } finally {
      setIsPicking(false)
    }
  }

  const handlePresetSelect = (presetColor: string) => {
    setInternalColor(presetColor)
    onChange(presetColor)
  }

  const handleRecentColorSelect = (recentColor: string) => {
    setInternalColor(recentColor)
    onChange(recentColor)
  }

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    
    // Add # if it's not there and the input is not empty
    if (value && !value.startsWith('#')) {
      value = '#' + value
    }
    
    // Only update if it's a valid hex color
    if (isValidHex(value) || value === '') {
      setInternalColor(value)
      
      // If the input is empty, clear the color
      if (value === '') {
        onChange('')
      }
    }
  }

  const isValidHex = (hex: string) => {
    if (!hex) return false
    
    const hexRegex = /^#?([0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/i
    return hexRegex.test(hex)
  }

  const triggerContent = (
    <div className="flex items-center w-full">
      {internalColor ? (
        <>
          <div 
            className="h-4 w-4 rounded-full border mr-2 flex-shrink-0" 
            style={{ backgroundColor: internalColor }}
          />
          <span className="flex-1 truncate text-left">
            {internalColor.toUpperCase()}
          </span>
        </>
      ) : (
        <span className="text-muted-foreground flex-1 text-left">{placeholder}</span>
      )}
      
      {allowClear && internalColor && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-6 w-6 rounded-full hover:bg-transparent hover:text-foreground ml-auto flex-shrink-0"
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
        "w-full justify-start text-left font-normal h-10 px-3",
        !internalColor && "text-muted-foreground"
      )}
      disabled={disabled}
    >
      {triggerContent}
    </Button>
  )

  return (
    <div className={cn("w-full space-y-2", className)}>
      {label && <Label>{label}</Label>}
      
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          {triggerButton}
        </PopoverTrigger>
        
        <PopoverContent 
          className={cn("w-64 p-4 space-y-4", popoverClassName)}
          align="start"
          sideOffset={8}
        >
          {/* Color Picker */}
          <div className="relative aspect-square w-full rounded-md overflow-hidden">
            <HexColorPicker 
              color={internalColor} 
              onChange={handleColorChange}
              className="w-full h-full"
            />
            
            {/* Eye Dropper Button */}
            {showEyeDropper && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={handleEyeDropper}
                disabled={isPicking}
                title="Pipette"
              >
                {isPicking ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
                ) : (
                  <EyeDropper className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
          
          {/* Hex Input */}
          {showHexInput && (
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">#</span>
                <Input
                  type="text"
                  value={internalColor?.replace('#', '') || ''}
                  onChange={handleHexInputChange}
                  className={cn("pl-7", inputClassName)}
                  placeholder="FFFFFF"
                  maxLength={showAlpha ? 8 : 6}
                />
              </div>
              
              {showPreview && (
                <div 
                  className="h-10 w-10 rounded-md border"
                  style={{ backgroundColor: internalColor || 'transparent' }}
                />
              )}
            </div>
          )}
          
          {/* Preset Colors */}
          {showPalette && presetColors.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground">
                Palette
              </div>
              <div className="grid grid-cols-8 gap-2">
                {presetColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    type="button"
                    className="h-6 w-6 rounded-full border transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    style={{ backgroundColor: presetColor }}
                    onClick={() => handlePresetSelect(presetColor)}
                    title={presetColor}
                  >
                    {internalColor?.toLowerCase() === presetColor.toLowerCase() && (
                      <Check className="h-3.5 w-3.5 mx-auto text-white mix-blend-difference" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Recent Colors */}
          {showRecentColors && recentColors.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground">
                Couleurs récentes
              </div>
              <div className="grid grid-cols-8 gap-2">
                {recentColors.map((recentColor) => (
                  <button
                    key={recentColor}
                    type="button"
                    className="h-6 w-6 rounded-full border transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    style={{ backgroundColor: recentColor }}
                    onClick={() => handleRecentColorSelect(recentColor)}
                    title={recentColor}
                  >
                    {internalColor?.toLowerCase() === recentColor.toLowerCase() && (
                      <Check className="h-3.5 w-3.5 mx-auto text-white mix-blend-difference" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Color Inputs (RGB/HSL/HSV) - Could be expanded */}
          {showColorInputs && (
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground">
                Valeurs
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="hex-input" className="w-8 text-xs">HEX</Label>
                  <Input
                    id="hex-input"
                    value={internalColor?.replace('#', '') || ''}
                    onChange={handleHexInputChange}
                    className="h-8 text-xs"
                    maxLength={showAlpha ? 8 : 6}
                  />
                </div>
                {/* Add RGB/HSL/HSV inputs here if needed */}
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

// Export as default for easier imports
export default ColorPicker
