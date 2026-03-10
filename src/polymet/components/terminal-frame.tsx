import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface TerminalFrameProps {
  children: ReactNode
  title?: string
  subtitle?: string
  variant?: "default" | "accent" | "success" | "warning" | "visitor"
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
  const variantTone = {
    default: {
      corner: "border-purple-300/50",
      headerBorder: "border-purple-400/20",
      title: "text-purple-100",
      subtitle: "text-purple-300/70",
    },
    accent: {
      corner: "border-pink-300/50",
      headerBorder: "border-pink-400/20",
      title: "text-purple-100",
      subtitle: "text-purple-300/70",
    },
    success: {
      corner: "border-emerald-300/50",
      headerBorder: "border-emerald-400/20",
      title: "text-emerald-100",
      subtitle: "text-emerald-300/70",
    },
    warning: {
      corner: "border-amber-300/50",
      headerBorder: "border-amber-400/20",
      title: "text-amber-100",
      subtitle: "text-amber-300/70",
    },
    visitor: {
      corner: "border-teal-300/50",
      headerBorder: "border-teal-400/20",
      title: "text-teal-100",
      subtitle: "text-teal-300/70",
    },
  } as const

  const variantStyles = {
    default: "border-purple-400/30 bg-slate-900/50",
    accent: "border-pink-400/40 bg-slate-900/60",
    success: "border-emerald-400/40 bg-slate-900/60",
    warning: "border-amber-400/40 bg-slate-900/60",
    visitor: "border-teal-400/40 bg-slate-900/60",
  }

  const glowStyles = {
    default: "shadow-[0_0_20px_rgba(192,132,252,0.15)]",
    accent: "shadow-[0_0_20px_rgba(244,114,182,0.15)]",
    success: "shadow-[0_0_20px_rgba(52,211,153,0.15)]",
    warning: "shadow-[0_0_20px_rgba(251,191,36,0.15)]",
    visitor: "shadow-[0_0_20px_rgba(20,184,166,0.2)]",
  }

  return (
    <div className={cn("relative", className)}>
      {/* Corner Brackets */}
      {cornerBrackets && (
        <>
          <div className={cn(
            "absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2",
            variantTone[variant].corner
          )} />
          <div className={cn(
            "absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2",
            variantTone[variant].corner
          )} />
          <div className={cn(
            "absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2",
            variantTone[variant].corner
          )} />
          <div className={cn(
            "absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2",
            variantTone[variant].corner
          )} />
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
          <div className={cn(
            "border-b px-6 py-4 bg-slate-950/30",
            variantTone[variant].headerBorder
          )}>
            {title && (
              <h3 className={cn(
                "text-lg font-bold tracking-wider uppercase",
                variantTone[variant].title
              )}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p className={cn(
                "text-sm mt-1",
                variantTone[variant].subtitle
              )}>{subtitle}</p>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}