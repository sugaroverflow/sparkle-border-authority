import { SparklesIcon, StarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SparkleEffectProps {
  variant?: "sparkles" | "stars" | "glow"
  size?: "sm" | "md" | "lg"
  className?: string
  animate?: boolean
}

export function SparkleEffect({ 
  variant = "sparkles", 
  size = "md",
  className,
  animate = true 
}: SparkleEffectProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  if (variant === "glow") {
    return (
      <div className={cn("relative", className)}>
        <div className={cn(
          "absolute inset-0 rounded-full blur-xl opacity-50",
          animate && "animate-pulse",
          "bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400"
        )} />
      </div>
    )
  }

  const Icon = variant === "stars" ? StarIcon : SparklesIcon

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <Icon 
        className={cn(
          sizeClasses[size],
          "text-purple-300",
          animate && "animate-pulse"
        )}
      />
      {animate && (
        <>
          <div className="absolute inset-0 animate-ping opacity-20">
            <Icon className={cn(sizeClasses[size], "text-pink-300")} />
          </div>
        </>
      )}
    </div>
  )
}

interface StarFieldProps {
  density?: "low" | "medium" | "high"
  className?: string
}

export function StarField({ density = "medium", className }: StarFieldProps) {
  const starCount = {
    low: 20,
    medium: 45,
    high: 80,
  }

  const stars = Array.from({ length: starCount[density] }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    duration: `${2 + Math.random() * 2}s`,
    size: Math.random() > 0.7 ? "lg" : Math.random() > 0.4 ? "md" : "sm",
    blink: Math.random() < 0.35,
    blinkDelay: `${Math.random() * 2}s`,
    blinkDuration: `${1.5 + Math.random() * 1.5}s`,
  }))

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
            ...(star.blink && {
              animation: `star-blink ${star.blinkDuration} ease-in-out infinite`,
              animationDelay: star.blinkDelay,
            }),
          }}
        >
          <StarIcon
            className={cn(
              "text-purple-200/30",
              !star.blink && "animate-pulse",
              star.size === "lg" && "w-3 h-3",
              star.size === "md" && "w-2 h-2",
              star.size === "sm" && "w-1.5 h-1.5"
            )}
            style={!star.blink ? { animationDuration: star.duration } : undefined}
          />
        </div>
      ))}
    </div>
  )
}

