import * as React from "react"
import { useDropzone, type DropzoneOptions } from "react-dropzone"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { formatFileSize } from "@/lib/utils"

type FileWithPreview = File & {
  preview: string
  path?: string
  size?: number
  type?: string
}

type FileInputProps = {
  /**
   * The currently selected files
   */
  files?: FileWithPreview[]
  /**
   * Callback when files are selected
   */
  onFilesChange: (files: FileWithPreview[]) => void
  /**
   * Label for the file input
   */
  label?: string
  /**
   * Description text below the input
   */
  description?: string
  /**
   * Whether multiple files can be selected
   */
  multiple?: boolean
  /**
   * Maximum file size in bytes
   */
  maxSize?: number
  /**
   * Accepted file types (MIME types or extensions)
   */
  accept?: Record<string, string[]>
  /**
   * Whether the input is disabled
   */
  disabled?: boolean
  /**
   * Whether to show file previews
   */
  showPreviews?: boolean
  /**
   * Maximum number of files to show in the preview
   */
  maxPreviewFiles?: number
  /**
   * Whether the input is required
   */
  required?: boolean
  /**
   * Error message to display
   */
  error?: string
  /**
   * Custom class name
   */
  className?: string
  /**
   * Dropzone options (from react-dropzone)
   */
  dropzoneOptions?: Omit<DropzoneOptions, 'onDrop' | 'accept' | 'maxSize' | 'multiple' | 'disabled'>
}

export function FileInput({
  files = [],
  onFilesChange,
  label,
  description,
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB
  accept = {
    'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  },
  disabled = false,
  showPreviews = true,
  maxPreviewFiles = 3,
  required = false,
  error,
  className,
  dropzoneOptions,
}: FileInputProps) {
  const [localFiles, setLocalFiles] = React.useState<FileWithPreview[]>([])
  const [isDragging, setIsDragging] = React.useState(false)

  // Update local files when files prop changes
  React.useEffect(() => {
    setLocalFiles(files)
  }, [files])

  const onDrop = React.useCallback(
    (acceptedFiles: File[], fileRejections: any[]) => {
      setIsDragging(false)

      if (fileRejections.length > 0) {
        // Handle file rejections (e.g., file too large, wrong type)
        const rejectionReasons = fileRejections.map(({ file, errors }) => ({
          fileName: file.name,
          errors: errors.map((e) => e.message),
        }))
        console.error("File rejections:", rejectionReasons)
        return
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )

      const updatedFiles = multiple ? [...localFiles, ...newFiles] : newFiles
      setLocalFiles(updatedFiles)
      onFilesChange(updatedFiles)
    },
    [localFiles, multiple, onFilesChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple,
    disabled,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    ...dropzoneOptions,
  })

  const removeFile = (index: number) => {
    const newFiles = [...localFiles]
    const removedFile = newFiles.splice(index, 1)[0]
    
    // Revoke the object URL to avoid memory leaks
    if (removedFile.preview) {
      URL.revokeObjectURL(removedFile.preview)
    }
    
    setLocalFiles(newFiles)
    onFilesChange(newFiles)
  }

  const formatAcceptTypes = (accept: Record<string, string[]>) => {
    const extensions = new Set<string>()
    
    Object.values(accept).forEach((exts) => {
      exts.forEach((ext) => extensions.add(ext))
    })
    
    return Array.from(extensions).join(',')
  }

  const acceptTypes = formatAcceptTypes(accept)
  const hasFiles = localFiles.length > 0
  const showMoreFiles = localFiles.length > maxPreviewFiles
  const visibleFiles = showPreviews ? localFiles.slice(0, maxPreviewFiles) : []

  return (
    <div className={cn("w-full space-y-3", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <Label htmlFor="file-input">
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </Label>
          {hasFiles && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 text-xs text-muted-foreground"
              onClick={() => {
                localFiles.forEach((file) => {
                  if (file.preview) {
                    URL.revokeObjectURL(file.preview)
                  }
                })
                setLocalFiles([])
                onFilesChange([])
              }}
              disabled={disabled}
            >
              Tout supprimer
            </Button>
          )}
        </div>
      )}

      <div
        {...getRootProps()}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-background p-6 text-center transition-colors hover:border-primary/50 hover:bg-accent/20",
          isDragActive && "border-primary bg-accent/10",
          disabled && "cursor-not-allowed opacity-60",
          error && "border-destructive/50"
        )}
      >
        <input
          {...getInputProps()}
          id="file-input"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          disabled={disabled}
          required={required && !hasFiles}
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          <Icons.upload className="h-10 w-10 text-muted-foreground" />
          <div className="space-y-1">
            <p className="text-sm font-medium">
              {isDragging
                ? "Déposez les fichiers ici..."
                : hasFiles
                ? "Cliquez pour ajouter plus de fichiers ou faites glisser"
                : "Glissez et déposez des fichiers ici, ou cliquez pour sélectionner"}
            </p>
            <p className="text-xs text-muted-foreground">
              {acceptTypes} (max {formatFileSize(maxSize)})
            </p>
          </div>
          {!hasFiles && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              disabled={disabled}
              onClick={(e) => e.stopPropagation()}
            >
              Sélectionner des fichiers
            </Button>
          )}
        </div>
      </div>

      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}

      {showPreviews && hasFiles && (
        <div className="space-y-2">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visibleFiles.map((file, index) => (
              <div
                key={file.name + index}
                className="group relative flex items-center space-x-3 overflow-hidden rounded-md border p-3"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-muted">
                  {file.type?.startsWith("image/") ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="h-8 w-8 object-cover"
                      onLoad={() => {
                        // Revoke the data uri to avoid memory leaks
                        URL.revokeObjectURL(file.preview)
                      }}
                    />
                  ) : (
                    <Icons.file className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium">
                    {file.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {formatFileSize(file.size || 0)}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                  disabled={disabled}
                >
                  <Icons.close className="h-3.5 w-3.5" />
                  <span className="sr-only">Supprimer</span>
                </Button>
              </div>
            ))}
          </div>

          {showMoreFiles && (
            <p className="text-sm text-muted-foreground">
              + {localFiles.length - maxPreviewFiles} autres fichiers
            </p>
          )}
        </div>
      )}
    </div>
  )
}

// Utils
function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
