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

const SHOOTING_STAR_COUNT = 4
const shootingStarConfigs = Array.from({ length: SHOOTING_STAR_COUNT }, (_, i) => ({
  id: i,
  startX: -15 - Math.random() * 20,
  startY: -5 - Math.random() * 25,
  angle: 225 + (Math.random() * 30 - 15),
  duration: 2.2 + Math.random() * 1.5,
  delay: i * 3.5 + Math.random() * 4,
  tailLength: 80 + Math.random() * 60,
  glitterCount: 5 + Math.floor(Math.random() * 4),
}))

export function GlitterShootingStars({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden
    >
      <style>{`
        @keyframes shooting-star-fly {
          0% {
            opacity: 0;
            transform: translate(var(--sx), var(--sy)) rotate(var(--angle)) translateX(0);
          }
          5% { opacity: 1; }
          85% { opacity: 0.8; }
          100% {
            opacity: 0;
            transform: translate(var(--sx), var(--sy)) rotate(var(--angle)) translateX(120vmax);
          }
        }
        @keyframes glitter-twinkle {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
      {shootingStarConfigs.map((config) => {
        const rad = (config.angle * Math.PI) / 180
        return (
          <div
            key={config.id}
            className="absolute left-0 top-0"
            style={{
              ["--sx" as string]: `${config.startX}vw`,
              ["--sy" as string]: `${config.startY}vh`,
              ["--angle" as string]: `${config.angle}deg`,
              animation: `shooting-star-fly ${config.duration}s ease-in-out ${config.delay}s infinite`,
            }}
          >
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] rounded-full"
              style={{
                width: config.tailLength,
                background: `linear-gradient(90deg, transparent 0%, rgba(216,180,254,0.15) 15%, rgba(244,114,182,0.5) 45%, rgba(250,204,21,0.9) 75%, rgba(255,255,255,0.95) 100%)`,
                boxShadow: "0 0 8px rgba(250,204,21,0.4), 0 0 16px rgba(244,114,182,0.2)",
              }}
            />
            {Array.from({ length: config.glitterCount }, (_, j) => {
              const t = 0.2 + (j / config.glitterCount) * 0.7
              const x = t * config.tailLength
              return (
                <div
                  key={j}
                  className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-amber-200/90"
                  style={{
                    left: x - 2,
                    boxShadow: "0 0 4px rgba(250,204,21,0.8), 0 0 8px rgba(244,114,182,0.4)",
                    animation: `glitter-twinkle ${0.4 + j * 0.1}s ease-in-out ${j * 0.08}s infinite`,
                  }}
                />
              )
            })}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(250,204,21,0.8) 40%, transparent 70%)",
                boxShadow: "0 0 12px rgba(255,255,255,0.9), 0 0 24px rgba(250,204,21,0.6), 0 0 36px rgba(244,114,182,0.3)",
              }}
            />
          </div>
        )
      })}
    </div>
  )
}