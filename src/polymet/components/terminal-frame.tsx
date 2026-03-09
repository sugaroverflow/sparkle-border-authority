import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface TerminalFrameProps {
  children: ReactNode
  title?: string
  subtitle?: string
  variant?: "default" | "accent" | "success" | "warning"
  className?: string
  glowEffect?: boolean
  cornerBrackets?: boolean
}

export function TerminalFrame({
  children,
  title,
  subtitle,
  variant = "default",
  className,
  glowEffect = false,
  cornerBrackets = true,
}: TerminalFrameProps) {
  const variantStyles = {
    default: "border-purple-400/30 bg-slate-900/50",
    accent: "border-pink-400/40 bg-slate-900/60",
    success: "border-emerald-400/40 bg-slate-900/60",
    warning: "border-amber-400/40 bg-slate-900/60",
  }

  const glowStyles = {
    default: "shadow-[0_0_20px_rgba(192,132,252,0.15)]",
    accent: "shadow-[0_0_20px_rgba(244,114,182,0.15)]",
    success: "shadow-[0_0_20px_rgba(52,211,153,0.15)]",
    warning: "shadow-[0_0_20px_rgba(251,191,36,0.15)]",
  }

  return (
    <div className={cn("relative", className)}>
      {/* Corner Brackets */}
      {cornerBrackets && (
        <>
          {/* Top Left */}
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-purple-300/50" />
          {/* Top Right */}
          <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-purple-300/50" />
          {/* Bottom Left */}
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-purple-300/50" />
          {/* Bottom Right */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-purple-300/50" />
        </>
      )}

      {/* Main Frame */}
      <div
        className={cn(
          "border-2 rounded-lg backdrop-blur-sm",
          variantStyles[variant],
          glowEffect && glowStyles[variant],
          "transition-all duration-300"
        )}
      >
        {/* Header */}
        {(title || subtitle) && (
          <div className="border-b border-purple-400/20 px-6 py-4 bg-slate-950/30">
            {title && (
              <h3 className="text-lg font-bold tracking-wider text-purple-100 uppercase">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-purple-300/70 mt-1">{subtitle}</p>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

interface ScanBracketsProps {
  className?: string
  animate?: boolean
  size?: "sm" | "md" | "lg"
}

export function ScanBrackets({ className, animate = false, size = "md" }: ScanBracketsProps) {
  const sizeStyles = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const bracketClass = cn(
    "absolute border-2 border-pink-400",
    animate && "animate-pulse"
  )

  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      {/* Top Left */}
      <div className={cn(bracketClass, sizeStyles[size], "top-0 left-0 border-b-0 border-r-0")} />
      {/* Top Right */}
      <div className={cn(bracketClass, sizeStyles[size], "top-0 right-0 border-b-0 border-l-0")} />
      {/* Bottom Left */}
      <div className={cn(bracketClass, sizeStyles[size], "bottom-0 left-0 border-t-0 border-r-0")} />
      {/* Bottom Right */}
      <div className={cn(bracketClass, sizeStyles[size], "bottom-0 right-0 border-t-0 border-l-0")} />
    </div>
  )
}