import { StatusBadge } from "@/polymet/components/status-badge"
import { cn, getGuestInitials } from "@/lib/utils"

interface AgentIdentityCardProps {
  agentCode: string
  name: string
  photo?: string
  statusLabel?: string
  showAuthorizedBadge?: boolean
  compact?: boolean
  className?: string
}

export function AgentIdentityCard({
  agentCode,
  name,
  photo,
  statusLabel,
  showAuthorizedBadge = false,
  compact = false,
  className,
}: AgentIdentityCardProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className={cn("mx-auto mb-3 rounded-xl border border-emerald-400/30 bg-emerald-950/20 p-3", compact ? "max-w-sm" : "max-w-md")}>
        <div className="flex items-center justify-center gap-3">
          {photo ? (
            <div className="galactic-photo-frame">
              <img
                src={photo}
                alt={name}
                className={cn(
                  "galactic-photo",
                  compact ? "w-12 h-12" : "w-16 h-16"
                )}
              />
            </div>
          ) : (
            <div
              className={cn(
                "rounded-lg border border-emerald-300/40 bg-emerald-50/10 text-emerald-100 flex items-center justify-center font-bold",
                compact ? "w-12 h-12 text-sm" : "w-16 h-16 text-lg"
              )}
              aria-hidden
            >
              {getGuestInitials(name)}
            </div>
          )}
          <div className="text-left min-w-0">
            <p
              className={cn(
                "font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-200 whitespace-normal break-words leading-tight",
                compact ? "text-lg tracking-[0.08em]" : "text-2xl tracking-[0.12em]"
              )}
              style={{ fontFamily: "var(--font-agent)" }}
            >
              Agent {agentCode}
            </p>
            <p className={cn("text-emerald-200/90 whitespace-normal break-words leading-tight", compact ? "text-sm" : "text-base")}>
              {name}
            </p>
            {statusLabel && (
              <p className="text-xs text-emerald-300/70 mt-0.5">
                Status: {statusLabel}
              </p>
            )}
          </div>
        </div>
      </div>
      {showAuthorizedBadge && <StatusBadge status="authorized" size="lg" showSparkles />}
    </div>
  )
}
