import { cn } from "@/lib/utils"
import { CheckCircle2Icon, AlertCircleIcon, ShieldCheckIcon } from "lucide-react"
import { SparkleEffect } from "@/polymet/components/sparkle-effect"

interface StatusBadgeProps {
  status: "authorized" | "denied" | "pending" | "visitor"
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
  showSparkles?: boolean
  labelOverride?: string
  className?: string
}

export function StatusBadge({
  status,
  size = "md",
  showIcon = true,
  showSparkles = false,
  labelOverride,
  className,
}: StatusBadgeProps) {
  const statusConfig = {
    authorized: {
      label: "AUTHORIZED",
      icon: ShieldCheckIcon,
      bgColor: "bg-emerald-500/20 dark:bg-emerald-500/20",
      borderColor: "border-emerald-400/50",
      textColor: "text-emerald-300",
      glowColor: "shadow-[0_0_20px_rgba(52,211,153,0.3)]",
    },
    denied: {
      label: "ACCESS DENIED",
      icon: AlertCircleIcon,
      bgColor: "bg-red-500/20 dark:bg-red-500/20",
      borderColor: "border-red-400/50",
      textColor: "text-red-300",
      glowColor: "shadow-[0_0_20px_rgba(248,113,113,0.3)]",
    },
    pending: {
      label: "VERIFICATION PENDING",
      icon: AlertCircleIcon,
      bgColor: "bg-amber-500/20 dark:bg-amber-500/20",
      borderColor: "border-amber-400/50",
      textColor: "text-amber-300",
      glowColor: "shadow-[0_0_20px_rgba(251,191,36,0.3)]",
    },
    visitor: {
      label: "VISITOR STATUS",
      icon: CheckCircle2Icon,
      bgColor: "bg-purple-500/20 dark:bg-purple-500/20",
      borderColor: "border-purple-400/50",
      textColor: "text-purple-300",
      glowColor: "shadow-[0_0_20px_rgba(192,132,252,0.3)]",
    },
  }

  const sizeStyles = {
    sm: {
      container: "px-4 py-2 text-xs",
      icon: "w-4 h-4",
    },
    md: {
      container: "px-6 py-3 text-sm",
      icon: "w-5 h-5",
    },
    lg: {
      container: "px-8 py-4 text-lg",
      icon: "w-6 h-6",
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className={cn("relative inline-flex", className)}>
      {showSparkles && status === "authorized" && (
        <>
          <SparkleEffect 
            variant="sparkles" 
            size="sm" 
            className="absolute -top-2 -left-2"
          />
          <SparkleEffect 
            variant="sparkles" 
            size="sm" 
            className="absolute -top-2 -right-2"
          />
        </>
      )}
      
      <div
        className={cn(
          "inline-flex items-center gap-2 border-2 rounded-md font-bold tracking-wider uppercase backdrop-blur-sm",
          config.bgColor,
          config.borderColor,
          config.textColor,
          config.glowColor,
          sizeStyles[size].container,
          "transition-all duration-300"
        )}
      >
        {showIcon && <Icon className={sizeStyles[size].icon} />}
        <span>{labelOverride ?? config.label}</span>
      </div>
    </div>
  )
}