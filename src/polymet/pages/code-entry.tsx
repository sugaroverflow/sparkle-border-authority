import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  FlowActionRow,
  primaryActionButtonClass,
  secondaryActionButtonClass,
  visitorPrimaryActionButtonClass,
  visitorSecondaryActionButtonClass,
} from "@/polymet/components/flow-action-row"
import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { TerminalInput } from "@/polymet/components/form-field"
import { Button } from "@/components/ui/button"
import { findGuestByCode } from "@/polymet/data/immigration-data"
import { toIdentityConfirmationRoute } from "@/polymet/flow-routes"
import { cn } from "@/lib/utils"
import { AlertCircleIcon } from "lucide-react"

export function CodeEntry() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [showBorderAssistance, setShowBorderAssistance] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isVisitorApplication = pathname === "/visitor-application"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setShowBorderAssistance(false)

    if (code.length !== 4) {
      setError("Immigration code must be 4 characters")
      return
    }

    const guest = findGuestByCode(code)
    if (!guest) {
      setError("Clearance Pending Manual Review")
      setShowBorderAssistance(true)
      return
    }

    // Navigate to identity confirmation with guest code
    navigate(toIdentityConfirmationRoute(code))
  }

  // SSSS Alert screen when code is wrong (wrong code = "SSSS" path)
  if (showBorderAssistance) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-2xl">
          <TerminalFrame
            title="Security Notice"
            subtitle="Manual review required"
            variant="accent"
            glowEffect
          >
            <div className="space-y-8 text-center py-6">
              <div className="text-amber-400 border-2 border-amber-400/50 rounded-lg bg-amber-950/40 px-6 py-8">
                <p className="text-4xl font-black tracking-[0.4em] text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]">
                  SSSS!!
                </p>
                <p className="text-lg font-semibold text-amber-200 mt-3 uppercase tracking-wider">
                  Suspicious Stellar Security Screening
                </p>
                <p className="text-amber-300/90 mt-4 text-base">
                  Proceed to the border...
                </p>
              </div>
              <p className="text-sm text-purple-300/80">
                If that was a mistake and you&apos;d like to try again →{" "}
                <button
                  type="button"
                  onClick={() => {
                    setShowBorderAssistance(false)
                    setError("")
                    setCode("")
                  }}
                  className="text-purple-200 underline hover:text-purple-100 font-medium"
                >
                  go back
                </button>
              </p>
              <Button
                type="button"
                onClick={() => navigate("/border-checkpoint")}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold"
              >
                Proceed to border
              </Button>
            </div>
          </TerminalFrame>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-2xl">
        <TerminalFrame
          title={isVisitorApplication ? "Immigration Application for Visitors" : "Immigration Code Entry"}
          subtitle={isVisitorApplication ? "Enter a code from staff, or proceed to border for in-person assistance" : "Enter your 4-character code"}
          variant={isVisitorApplication ? "visitor" : "accent"}
          glowEffect
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <p className={isVisitorApplication ? "text-teal-200 mb-2" : "text-purple-200 mb-2"}>
                {isVisitorApplication
                  ? "If you received a code from border staff, enter it below. Otherwise use the link below for in-person assistance."
                  : "Please enter the immigration code from your invitation"}
              </p>
              <p className={isVisitorApplication ? "text-sm text-teal-300/70" : "text-sm text-purple-300/70"}>
                Format: 4 characters (e.g., A7K2)
              </p>
            </div>

            <div className="flex justify-center">
              <TerminalInput
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))
                  setError("")
                  setShowBorderAssistance(false)
                }}
                placeholder="Enter code..."
                maxLength={4}
                className={cn(
                  "text-center text-3xl font-mono tracking-widest w-64 uppercase",
                  isVisitorApplication && "border-teal-400/30 focus:border-teal-400/60 focus:ring-teal-400/20"
                )}
                autoFocus
              />
            </div>

            {error && (
              <div className="flex items-center justify-center gap-2 text-red-400 bg-red-950/30 border border-red-400/30 rounded p-3">
                <AlertCircleIcon className="w-5 h-5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <FlowActionRow>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(isVisitorApplication ? "/code-entry" : "/")}
                className={isVisitorApplication ? visitorSecondaryActionButtonClass : secondaryActionButtonClass}
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={code.length !== 4}
                className={`${isVisitorApplication ? visitorPrimaryActionButtonClass : primaryActionButtonClass} px-8`}
              >
                Continue
              </Button>
            </FlowActionRow>

            <div className={cn("text-center pt-6 border-t", isVisitorApplication ? "border-teal-400/20" : "border-purple-400/20")}>
              {isVisitorApplication ? (
                <>
                  <p className="text-sm text-teal-300/70 mb-2">
                    Need in-person assistance?
                  </p>
                  <Button
                    type="button"
                    variant="link"
                    className="text-teal-300 hover:text-teal-200"
                    onClick={() => navigate("/border-checkpoint")}
                  >
                    Proceed to border assistance
                  </Button>
                  <p className="text-sm text-teal-300/70 mt-4 mb-2">
                    No code? Start the visitor application with your name.
                  </p>
                  <Button
                    type="button"
                    variant="link"
                    className="text-teal-200 hover:text-teal-100 font-semibold"
                    onClick={() => navigate("/visitor-signup")}
                  >
                    I&apos;m a visitor — enter my name
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-base font-semibold text-teal-200 mb-2">
                    Don&apos;t have an immigration code?
                  </p>
                  <p className="text-sm text-teal-300/80 mb-4">
                    Immigration application for visitors
                  </p>
                  <Button
                    type="button"
                    className={`${visitorPrimaryActionButtonClass} px-8`}
                    onClick={() => navigate("/visitor-signup")}
                  >
                    I&apos;m a visitor
                  </Button>
                </>
              )}
            </div>
          </form>
        </TerminalFrame>
      </div>
    </div>
  )
}