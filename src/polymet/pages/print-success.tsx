import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { AgentIdentityCard } from "@/polymet/components/agent-identity-card"
import { SparkleEffect } from "@/polymet/components/sparkle-effect"
import { Button } from "@/components/ui/button"
import { findGuestByCode, markGuestPrinted } from "@/polymet/data/immigration-data"
import { CheckCircleIcon, FileTextIcon, StampIcon } from "lucide-react"

export function PrintSuccess() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const code = searchParams.get("code") || ""
  const isSecondary = searchParams.get("secondary") === "true"
  const isManual = searchParams.get("manual") === "1"
  const manualName = searchParams.get("manualName") || ""
  const manualAgentCode = searchParams.get("manualAgentCode") || ""
  const manualValidity = Number(searchParams.get("manualValidity") || 120)
  const [secondsRemaining, setSecondsRemaining] = useState(30)

  const foundGuest = findGuestByCode(code)
  const guest = foundGuest
    ? foundGuest
    : isManual
    ? {
        name: manualName || "Manual Guest",
        agentCode: manualAgentCode || "Galaxy",
        validityMinutes: manualValidity,
        photo: undefined,
        status: undefined,
      }
    : null

  useEffect(() => {
    if (code && !isManual) {
      markGuestPrinted(code)
    }
  }, [code, isManual])

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          navigate("/")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [navigate])

  if (!guest) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <TerminalFrame title="Error" variant="warning">
          <p className="text-center text-purple-200">Guest not found.</p>
          <div className="flex justify-center mt-6">
            <Button onClick={() => navigate("/")}>
              Return to Start
            </Button>
          </div>
        </TerminalFrame>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-3xl">
        <TerminalFrame
          title="Visa Printed Successfully"
          subtitle="Please follow the instructions below"
          variant="success"
          glowEffect
        >
          <div className="space-y-8">
            {/* Success Icon */}
            <div className="flex justify-center relative">
              <div className="relative">
                <CheckCircleIcon className="w-24 h-24 text-emerald-400" />
                <SparkleEffect
                  variant="sparkles"
                  size="lg"
                  className="absolute -top-2 -right-2"
                />
              </div>
            </div>

            <AgentIdentityCard
              agentCode={guest.agentCode}
              name={guest.name}
              photo={guest.photo}
              statusLabel={guest.status}
              compact
            />

            {/* Instructions */}
            <div className="space-y-4">
              <div className="p-6 bg-emerald-950/20 border border-emerald-400/30 rounded-lg text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <FileTextIcon className="w-5 h-5 text-emerald-400" />
                  <p className="text-lg font-semibold text-emerald-100">
                    Agent {guest.agentCode}, your visa has been issued.
                  </p>
                </div>
                <p className="text-sm text-emerald-300/80">
                  Keep your visa document with you and follow posted venue instructions.
                </p>
              </div>

              {isSecondary ? (
                <div className="p-6 bg-amber-950/20 border border-amber-400/30 rounded-lg">
                  <p className="text-lg font-semibold text-amber-100 mb-2">
                    Secondary screening route
                  </p>
                  <p className="text-sm text-amber-200/80">
                    Please proceed to the gate and see a border agent for entry.
                  </p>
                </div>
              ) : (
                <div className="p-6 bg-purple-950/20 border border-purple-400/30 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <StampIcon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-purple-100 mb-2">
                        Next step: Stamp Control
                      </p>
                      <p className="text-sm text-purple-300/70">
                        Affix your visa to <strong>Page 2</strong>, then proceed to Stamp Control for your page 3 entry stamp.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Important Notice */}
            <div className="p-4 bg-amber-950/20 border border-amber-400/30 rounded-lg">
              <p className="text-sm text-amber-200 text-center">
                <strong>Important:</strong> Your visa is valid for {guest.validityMinutes} minutes from issuance.
                Auto reset in {secondsRemaining}s.
              </p>
            </div>

            {/* Action Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-12"
              >
                Start over
              </Button>
            </div>
          </div>
        </TerminalFrame>
      </div>
    </div>
  )
}