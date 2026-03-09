import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { SparkleEffect } from "@/polymet/components/sparkle-effect"

interface StatTileProps {
  label: string
  value: number | string
  icon: LucideIcon
  variant?: "default" | "accent" | "success" | "warning"
  showSparkle?: boolean
  className?: string
}

export function StatTile({
  label,
  value,
  icon: Icon,
  variant = "default",
  showSparkle = false,
  className,
}: StatTileProps) {
  const variantStyles = {
    default: {
      bg: "bg-slate-900/50",
      border: "border-purple-400/30",
      glow: "shadow-[0_0_20px_rgba(192,132,252,0.15)]",
      iconColor: "text-purple-400",
      valueColor: "text-purple-100",
    },
    accent: {
      bg: "bg-slate-900/60",
      border: "border-pink-400/40",
      glow: "shadow-[0_0_20px_rgba(244,114,182,0.2)]",
      iconColor: "text-pink-400",
      valueColor: "text-pink-100",
    },
    success: {
      bg: "bg-slate-900/60",
      border: "border-emerald-400/40",
      glow: "shadow-[0_0_20px_rgba(52,211,153,0.2)]",
      iconColor: "text-emerald-400",
      valueColor: "text-emerald-100",
    },
    warning: {
      bg: "bg-slate-900/60",
      border: "border-amber-400/40",
      glow: "shadow-[0_0_20px_rgba(251,191,36,0.2)]",
      iconColor: "text-amber-400",
      valueColor: "text-amber-100",
    },
  }

  const styles = variantStyles[variant]

  return (
    <div className={cn("relative group", className)}>
      {showSparkle && (
        <SparkleEffect
          variant="sparkles"
          size="sm"
          className="absolute -top-2 -right-2 z-10"
        />
      )}

      <div
        className={cn(
          "relative border-2 rounded-lg p-6 backdrop-blur-sm",
          "transition-all duration-300",
          "hover:scale-105",
          styles.bg,
          styles.border,
          styles.glow
        )}
      >
        {/* Icon */}
        <div className="flex items-start justify-between mb-4">
          <div className={cn("p-3 rounded-lg bg-slate-950/50", styles.border, "border")}>
            <Icon className={cn("w-6 h-6", styles.iconColor)} />
          </div>
        </div>

        {/* Value */}
        <div className="space-y-1">
          <p className={cn("text-4xl font-bold tracking-tight", styles.valueColor)}>
            {value}
          </p>
          <p className="text-sm text-purple-300/70 uppercase tracking-wider font-medium">
            {label}
          </p>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500/0 via-pink-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  )
}

interface CompactStatProps {
  label: string
  value: number | string
  icon: LucideIcon
  className?: string
}

export function CompactStat({ label, value, icon: Icon, className }: CompactStatProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg",
        "bg-slate-900/50 border border-purple-400/20",
        "backdrop-blur-sm",
        className
      )}
    >
      <div className="p-2 rounded-md bg-purple-500/20 border border-purple-400/30">
        <Icon className="w-4 h-4 text-purple-300" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-purple-300/70 uppercase tracking-wide">{label}</p>
        <p className="text-lg font-bold text-purple-100">{value}</p>
      </div>
    </div>
  )
}