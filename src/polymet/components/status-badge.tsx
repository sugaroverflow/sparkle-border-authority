import { cn } from "@/lib/utils"
import { CheckCircle2Icon, AlertCircleIcon, ShieldCheckIcon, SparklesIcon } from "lucide-react"
import { SparkleEffect } from "@/polymet/components/sparkle-effect"

interface StatusBadgeProps {
  status: "authorized" | "denied" | "pending" | "visitor"
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
  showSparkles?: boolean
  className?: string
}

export function StatusBadge({
  status,
  size = "md",
  showIcon = true,
  showSparkles = false,
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
        <span>{config.label}</span>
      </div>
    </div>
  )
}

interface DocumentBadgeProps {
  documentType: "citizen-passport" | "border-passport" | "visitor-passcard" | "photo-permit"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function DocumentBadge({ documentType, size = "md", className }: DocumentBadgeProps) {
  const documentConfig = {
    "citizen-passport": {
      label: "Citizen Passport",
      color: "text-blue-300",
      bgColor: "bg-blue-500/20 dark:bg-blue-500/20",
      borderColor: "border-blue-400/50",
    },
    "border-passport": {
      label: "Border-Issued Passport",
      color: "text-purple-300",
      bgColor: "bg-purple-500/20 dark:bg-purple-500/20",
      borderColor: "border-purple-400/50",
    },
    "visitor-passcard": {
      label: "Visitor Passcard",
      color: "text-pink-300",
      bgColor: "bg-pink-500/20 dark:bg-pink-500/20",
      borderColor: "border-pink-400/50",
    },
    "photo-permit": {
      label: "Photo Booth Permit",
      color: "text-amber-300",
      bgColor: "bg-amber-500/20 dark:bg-amber-500/20",
      borderColor: "border-amber-400/50",
    },
  }

  const sizeStyles = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }

  const config = documentConfig[documentType]

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 border rounded-md font-semibold backdrop-blur-sm",
        config.bgColor,
        config.borderColor,
        config.color,
        sizeStyles[size],
        className
      )}
    >
      <SparklesIcon className="w-4 h-4" />
      <span>{config.label}</span>
    </div>
  )
}