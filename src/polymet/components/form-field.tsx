import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface FormFieldProps {
  label: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function FormField({ label, required, children, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-purple-200 font-semibold uppercase tracking-wide text-sm">
        {label}
        {required && <span className="text-pink-400 ml-1">*</span>}
      </Label>
      {children}
    </div>
  )
}

interface TerminalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export function TerminalInput({ className, ...props }: TerminalInputProps) {
  return (
    <Input
      className={cn(
        "bg-slate-900/50 border-2 border-purple-400/30 text-purple-100",
        "focus:border-pink-400/50 focus:ring-2 focus:ring-pink-400/20",
        "placeholder:text-purple-400/40",
        "font-mono",
        className
      )}
      {...props}
    />
  )
}

interface TerminalTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

export function TerminalTextarea({ className, ...props }: TerminalTextareaProps) {
  return (
    <Textarea
      className={cn(
        "bg-slate-900/50 border-2 border-purple-400/30 text-purple-100",
        "focus:border-pink-400/50 focus:ring-2 focus:ring-pink-400/20",
        "placeholder:text-purple-400/40",
        "font-mono min-h-24",
        className
      )}
      {...props}
    />
  )
}

interface OptionCardProps {
  label: string
  icon?: string
  selected?: boolean
  onClick?: () => void
  className?: string
}

export function OptionCard({ label, icon, selected, onClick, className }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative p-4 rounded-lg border-2 text-left transition-all duration-300",
        "hover:scale-105 active:scale-95",
        selected
          ? "bg-purple-500/20 border-pink-400/60 shadow-[0_0_20px_rgba(244,114,182,0.3)]"
          : "bg-slate-900/50 border-purple-400/30 hover:border-purple-400/50",
        className
      )}
    >
      {selected && (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
      
      <div className="flex items-center gap-3">
        {icon && <span className="text-3xl">{icon}</span>}
        <span className={cn(
          "font-semibold",
          selected ? "text-pink-100" : "text-purple-200"
        )}>
          {label}
        </span>
      </div>
    </button>
  )
}

interface TerminalRadioGroupProps {
  options: Array<{ value: string; label: string; icon?: string }>
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

export function TerminalRadioGroup({ options, value, onValueChange, className }: TerminalRadioGroupProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-3", className)}>
      {options.map((option) => (
        <OptionCard
          key={option.value}
          label={option.label}
          icon={option.icon}
          selected={value === option.value}
          onClick={() => onValueChange?.(option.value)}
        />
      ))}
    </div>
  )
}