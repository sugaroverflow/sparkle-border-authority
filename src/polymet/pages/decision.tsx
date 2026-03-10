import { useNavigate, useSearchParams } from "react-router-dom"
import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { AgentIdentityCard } from "@/polymet/components/agent-identity-card"
import {
  FlowActionRow,
  primaryActionButtonClass,
  secondaryActionButtonClass,
} from "@/polymet/components/flow-action-row"
import { FlowErrorState } from "@/polymet/components/flow-error-state"
import { SparkleEffect } from "@/polymet/components/sparkle-effect"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { findGuestByCode, purposeOptions, declarationOptions } from "@/polymet/data/immigration-data"
import {
  parseBooleanParam,
  parseCsvParam,
  toPrintPreviewRoute,
} from "@/polymet/flow-routes"
import { getPrivilegeTagClass } from "@/polymet/components/privilege-tag-variants"
import { AlertTriangleIcon, CheckCircleIcon, Clock3Icon, ClockIcon, XCircleIcon } from "lucide-react"

export function Decision() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const code = searchParams.get("code") || ""
  const decision = searchParams.get("decision") as "approved" | "rejected" | null
  const reason = searchParams.get("reason") || ""
  const retryCaption = searchParams.get("retryCaption") || "Review your selections and try again."
  const purposes = parseCsvParam(searchParams.get("purposes"))
  const declarations = parseCsvParam(searchParams.get("declarations"))
  const privileges = parseCsvParam(searchParams.get("privileges"))
  const visaNumber = searchParams.get("visaNumber") || ""
  const timestamp = searchParams.get("timestamp") || ""
  const isSecondary = parseBooleanParam(searchParams.get("secondary"))
  const applicationId = searchParams.get("applicationId") || undefined

  const guest = findGuestByCode(code)

  if (!guest || !decision) {
    return <FlowErrorState message="Invalid request. Please start over." onButtonClick={() => navigate("/")} />
  }

  const getPurposeLabels = () => {
    return purposes.map(p => purposeOptions.find(opt => opt.value === p)?.label || p)
  }

  const getDeclarationLabels = () => {
    return declarations.map(d => declarationOptions.find(opt => opt.value === d)?.label || d)
  }

  if (decision === "approved") {
    const isVisitor = guest.status === "Visitor"
    const hasWarningAlert = guest.customAlert?.variant === "warning"
    const headerTitle = isVisitor ? "Visa on Arrival Approved" : "Visa Approved"
    const headerSubtitle = isVisitor ? "Temporary authorization granted" : "Authorization granted"
    const displayStatusLabel = isVisitor ? "Temporary Approved" : guest.status

    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-3xl">
          <TerminalFrame
            title={headerTitle}
            subtitle={headerSubtitle}
            variant="success"
            glowEffect
          >
            <div className="space-y-8">
              {/* Success Icon */}
              <div className="flex justify-center relative">
                <div className="relative">
                  {hasWarningAlert ? (
                    <AlertTriangleIcon className="w-32 h-32 text-violet-300" />
                  ) : isVisitor ? (
                    <Clock3Icon className="w-32 h-32 text-amber-400" />
                  ) : (
                    <CheckCircleIcon className="w-32 h-32 text-emerald-400" />
                  )}
                  <SparkleEffect
                    variant="sparkles"
                    size="lg"
                    className="absolute -top-4 -right-4"
                  />
                  <SparkleEffect
                    variant="sparkles"
                    size="lg"
                    className="absolute -bottom-4 -left-4"
                  />
                </div>
              </div>

              {isVisitor && (
                <div className="p-4 bg-amber-950/25 border border-orange-400/40 rounded-lg">
                  <p className="text-sm text-amber-100 text-center leading-relaxed">
                    You have been temporarily approved for a visa on arrival to the party on Sparkle Planet Consortium. Please be advised that any unauthorized behavior may result in the termination of your visa.
                  </p>
                </div>
              )}

              {hasWarningAlert && (
                <div className="p-4 bg-violet-950/25 border border-violet-400/40 rounded-lg">
                  <p className="text-sm text-violet-100 text-center leading-relaxed">
                    Fear not. Sparkle Bureaucracy is benevolent and your presence is appreciated. Your envoy renewal is under Intergalactic Court review; please be prepared to make your case to border agents.
                  </p>
                </div>
              )}

              <AgentIdentityCard
                agentCode={guest.agentCode}
                name={guest.name}
                photo={guest.photo}
                statusLabel={displayStatusLabel}
                badgeStatus={hasWarningAlert ? "visitor" : isVisitor ? "pending" : "authorized"}
                badgeLabel={hasWarningAlert ? "Tentatively Authorized" : isVisitor ? "Temporary Approved" : undefined}
                badgeClassName={hasWarningAlert ? "text-violet-200" : undefined}
              />

              {/* Visa Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-950/20 border border-emerald-400/30 rounded-lg">
                  <p className="text-xs text-emerald-300/70 uppercase tracking-wider font-mono mb-1">
                    Visa Class
                  </p>
                  <p className="text-sm font-bold text-emerald-100">
                    {guest.visaClass}
                  </p>
                </div>
                <div className="p-4 bg-slate-900/60 border border-purple-400/40 rounded-lg shadow-[0_0_20px_rgba(192,132,252,0.1)]">
                  <p className="text-xs text-purple-300/70 uppercase tracking-wider font-mono mb-1">
                    Visa Number
                  </p>
                  <p className="text-sm font-bold text-purple-100 font-mono">
                    {visaNumber}
                  </p>
                </div>
              </div>

              {/* Privileges */}
              <div className="p-4 bg-slate-900/50 border border-emerald-400/30 rounded-lg border-t-purple-400/20 border-l-pink-400/20">
                <p className="text-xs text-emerald-300/70 uppercase tracking-wider font-mono mb-3">
                  Privileges Granted
                </p>
                <div className="flex flex-wrap gap-2">
                  {privileges.map((privilege, i) => (
                    <span
                      key={i}
                      className={cn(
                        "text-xs px-3 py-1 border rounded font-medium",
                        getPrivilegeTagClass(i)
                      )}
                    >
                      {privilege}
                    </span>
                  ))}
                </div>
              </div>

              {/* Validity */}
              <div className="flex items-center justify-center gap-2 text-purple-300/80">
                <ClockIcon className="w-4 h-4 text-purple-400/80" />
                <p className="text-sm">
                  Valid for {guest.validityMinutes} minutes from issuance
                </p>
              </div>

              {/* Action Button */}
              <FlowActionRow className="pt-0">
                <Button
                  onClick={() =>
                    navigate(
                      toPrintPreviewRoute({
                        code,
                        visaNumber,
                        purposes,
                        declarations,
                        privileges,
                        timestamp,
                        secondary: isSecondary,
                        applicationId,
                      })
                    )
                  }
                  className={cn(
                    "px-12 text-lg border",
                    hasWarningAlert
                      ? "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 hover:from-violet-500 hover:via-fuchsia-500 hover:to-indigo-500 border-violet-300/30 shadow-[0_0_24px_rgba(168,85,247,0.35)]"
                      : isVisitor
                      ? "bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 hover:from-amber-400 hover:via-orange-400 hover:to-pink-400 border-orange-300/30 shadow-[0_0_24px_rgba(251,146,60,0.35)]"
                      : "bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:via-purple-500/90 hover:to-pink-500/90 border-purple-400/20 shadow-[0_0_24px_rgba(52,211,153,0.25)]"
                  )}
                >
                  {isSecondary || isVisitor ? "Print Temporary Visa" : "Print Visa"}
                </Button>
              </FlowActionRow>
            </div>
          </TerminalFrame>
        </div>
      </div>
    )
  }

  // Rejected
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-3xl">
        <TerminalFrame
          title="Application Rejected"
          subtitle="Entry not authorized"
          variant="warning"
          glowEffect
        >
          <div className="space-y-8">
            {/* Rejection Icon */}
            <div className="flex justify-center">
              <XCircleIcon className="w-32 h-32 text-red-400" />
            </div>

            {/* Rejection Reason */}
            <div className="p-6 bg-red-950/20 border border-red-400/30 rounded-lg text-center">
              <p className="text-xl font-bold text-red-100 mb-2">
                {reason}
              </p>
              <p className="text-sm text-red-300/70">
                {retryCaption}
              </p>
            </div>

            {/* Application Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900/30 border border-purple-400/20 rounded-lg">
                <p className="text-xs text-purple-300/70 uppercase tracking-wider font-mono mb-2">
                  Purposes Submitted
                </p>
                <div className="space-y-1">
                  {getPurposeLabels().map((purpose, i) => (
                    <p key={i} className="text-sm text-purple-100">
                      • {purpose}
                    </p>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-slate-900/30 border border-purple-400/20 rounded-lg">
                <p className="text-xs text-purple-300/70 uppercase tracking-wider font-mono mb-2">
                  Declarations Submitted
                </p>
                <div className="space-y-1">
                  {getDeclarationLabels().map((declaration, i) => (
                    <p key={i} className="text-sm text-purple-100">
                      • {declaration}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <FlowActionRow>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className={secondaryActionButtonClass}
              >
                Start over
              </Button>
              <Button
                onClick={() => navigate("/border-checkpoint")}
                className={cn(primaryActionButtonClass, "px-8 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500")}
              >
                Proceed to border for assistance
              </Button>
            </FlowActionRow>
          </div>
        </TerminalFrame>
      </div>
    </div>
  )
}