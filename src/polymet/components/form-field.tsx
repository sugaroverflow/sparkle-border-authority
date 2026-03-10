import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

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

interface OptionCardProps {
  label: string
  icon?: string
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
  selectedClassName?: string
  unselectedClassName?: string
  selectedBadgeClassName?: string
}

export function OptionCard({
  label,
  icon,
  selected,
  disabled,
  onClick,
  className,
  selectedClassName,
  unselectedClassName,
  selectedBadgeClassName,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative p-4 rounded-lg border-2 text-left transition-all duration-300",
        "hover:scale-[1.02] active:scale-[0.99]",
        selected
          ? selectedClassName ?? "bg-purple-600/30 border-purple-400 shadow-lg shadow-purple-500/30"
          : unselectedClassName ?? "bg-slate-900/30 border-purple-400/20 hover:border-purple-400/50 hover:bg-purple-950/30",
        disabled && "opacity-50 cursor-not-allowed hover:scale-100 active:scale-100",
        className
      )}
    >
      {selected && (
        <div className={cn("absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center", selectedBadgeClassName)}>
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
        <span className="font-semibold text-purple-100">
          {label}
        </span>
      </div>
    </button>
  )
}