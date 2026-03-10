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
    low: 8,
    medium: 15,
    high: 25,
  }

  const stars = Array.from({ length: starCount[density] }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    duration: `${2 + Math.random() * 2}s`,
    size: Math.random() > 0.7 ? "lg" : Math.random() > 0.4 ? "md" : "sm",
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
          }}
        >
          <StarIcon
            className={cn(
              "text-purple-200/30 animate-pulse",
              star.size === "lg" && "w-3 h-3",
              star.size === "md" && "w-2 h-2",
              star.size === "sm" && "w-1.5 h-1.5"
            )}
            style={{ animationDuration: star.duration }}
          />
        </div>
      ))}
    </div>
  )
}

const SHOOTING_STAR_COUNT = 5
const shootingStarConfigs = Array.from({ length: SHOOTING_STAR_COUNT }, (_, i) => ({
  id: i,
  startX: `${-12 - Math.random() * 18}vw`,
  startY: `${-8 - Math.random() * 20}vh`,
  angle: 228 + (Math.random() * 24 - 12),
  duration: 2 + Math.random() * 1.2,
  delay: i * 2.8 + Math.random() * 3,
  tailLength: 100 + Math.random() * 80,
  glitterCount: 6 + Math.floor(Math.random() * 4),
}))

const STAR_BOX_WIDTH = 220
const STAR_BOX_HEIGHT = 28

export function GlitterShootingStars({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none z-[1]", className)}
      aria-hidden
    >
      {shootingStarConfigs.map((config) => (
        <div
          key={config.id}
          className="absolute left-0 top-0 will-change-transform"
          style={{
            width: STAR_BOX_WIDTH,
            height: STAR_BOX_HEIGHT,
            ["--star-sx" as string]: config.startX,
            ["--star-sy" as string]: config.startY,
            ["--star-angle" as string]: `${config.angle}deg`,
            animation: `glitter-shooting-star-fly ${config.duration}s ease-in-out ${config.delay}s infinite`,
          }}
        >
          <div
            className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full"
            style={{
              width: config.tailLength,
              background: "linear-gradient(90deg, transparent 0%, rgba(216,180,254,0.25) 12%, rgba(244,114,182,0.6) 40%, rgba(250,204,21,0.95) 70%, rgba(255,255,255,1) 95%)",
              boxShadow: "0 0 10px rgba(250,204,21,0.5), 0 0 20px rgba(244,114,182,0.25)",
            }}
          />
          {Array.from({ length: config.glitterCount }, (_, j) => {
            const t = 0.15 + (j / config.glitterCount) * 0.75
            const x = t * config.tailLength
            return (
              <div
                key={j}
                className="absolute left-0 top-1/2 w-1.5 h-1.5 rounded-full bg-amber-200"
                style={{
                  left: x,
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 0 6px rgba(250,204,21,0.9), 0 0 10px rgba(244,114,182,0.5)",
                  animation: `glitter-twinkle-dot ${0.35 + j * 0.08}s ease-in-out ${j * 0.06}s infinite`,
                }}
              />
            )
          })}
          <div
            className="absolute left-0 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(250,204,21,0.85) 35%, rgba(244,114,182,0.4) 60%, transparent 75%)",
              boxShadow: "0 0 14px rgba(255,255,255,0.95), 0 0 28px rgba(250,204,21,0.7), 0 0 42px rgba(244,114,182,0.35)",
            }}
          />
        </div>
      ))}
    </div>
  )
}