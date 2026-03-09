import { Link } from "react-router-dom"
import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { StatusBadge, DocumentBadge } from "@/polymet/components/status-badge"
import { SparkleEffect } from "@/polymet/components/sparkle-effect"
import { CheckCircle2Icon, UserIcon, TicketIcon, ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TravelerResultProps {
  travelerName?: string
  ticketVerified?: boolean
  documentType?: "citizen-passport" | "border-passport" | "visitor-passcard" | "photo-permit"
  status?: "passport-holder" | "passport-at-border" | "visitor-passcard"
}

export function TravelerResult({
  travelerName = "Alex Starfield",
  ticketVerified = true,
  documentType = "citizen-passport",
  status = "passport-holder",
}: TravelerResultProps) {
  const getStatusInfo = () => {
    switch (status) {
      case "passport-holder":
        return {
          badge: "authorized" as const,
          message: "Citizen passport verified. Proceed to document issuance.",
        }
      case "passport-at-border":
        return {
          badge: "authorized" as const,
          message: "Passport will be issued at border control.",
        }
      case "visitor-passcard":
        return {
          badge: "visitor" as const,
          message: "Visitor passcard required. Complete declaration form.",
        }
      default:
        return {
          badge: "pending" as const,
          message: "Please contact border authority.",
        }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-3xl space-y-6">
        {/* Status Badge */}
        <div className="flex justify-center">
          <StatusBadge 
            status={statusInfo.badge} 
            size="lg" 
            showSparkles={statusInfo.badge === "authorized"}
          />
        </div>

        {/* Main Result Card */}
        <TerminalFrame
          title="Traveler Identification"
          subtitle="Verification Complete"
          variant={statusInfo.badge === "authorized" ? "success" : "accent"}
          glowEffect
        >
          <div className="space-y-6">
            {/* Traveler Info */}
            <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-950/50 border border-purple-400/20">
              <div className="p-3 rounded-lg bg-purple-500/20 border border-purple-400/30">
                <UserIcon className="w-8 h-8 text-purple-300" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-purple-300/70 uppercase tracking-wide mb-1">
                  Traveler Name
                </p>
                <p className="text-2xl font-bold text-purple-100">{travelerName}</p>
              </div>
              {ticketVerified && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50">
                  <CheckCircle2Icon className="w-4 h-4 text-emerald-300" />
                  <span className="text-xs font-semibold text-emerald-300 uppercase">
                    Verified
                  </span>
                </div>
              )}
            </div>

            {/* Ticket Status */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-950/50 border border-purple-400/20">
              <TicketIcon className="w-6 h-6 text-purple-300" />
              <div className="flex-1">
                <p className="text-sm text-purple-300/70 uppercase tracking-wide">
                  Ticket Status
                </p>
                <p className="text-lg font-semibold text-purple-100">
                  {ticketVerified ? "Luma Check-in Verified" : "Pending Verification"}
                </p>
              </div>
            </div>

            {/* Document Type */}
            <div className="space-y-3">
              <p className="text-sm text-purple-300/70 uppercase tracking-wide">
                Document Type
              </p>
              <DocumentBadge documentType={documentType} size="lg" />
            </div>

            {/* Status Message */}
            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-400/30">
              <p className="text-purple-100 leading-relaxed">{statusInfo.message}</p>
            </div>
          </div>
        </TerminalFrame>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Link to="/declaration-form">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(192,132,252,0.4)] hover:shadow-[0_0_30px_rgba(192,132,252,0.6)]"
            >
              Continue to Declaration
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Sparkle Decorations */}
        <div className="flex justify-center gap-8">
          <SparkleEffect variant="stars" size="sm" />
          <SparkleEffect variant="sparkles" size="sm" />
          <SparkleEffect variant="stars" size="sm" />
        </div>
      </div>
    </div>
  )
}