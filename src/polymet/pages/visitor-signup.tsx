import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  FlowActionRow,
  visitorPrimaryActionButtonClass,
  visitorSecondaryActionButtonClass,
} from "@/polymet/components/flow-action-row"
import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { TerminalInput } from "@/polymet/components/form-field"
import { Button } from "@/components/ui/button"
import { registerVisitorGuest } from "@/polymet/data/immigration-data"
import { toPurposeOfVisitRoute } from "@/polymet/flow-routes"
import { AlertCircleIcon, UserPlusIcon } from "lucide-react"

export function VisitorSignup() {
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const trimmed = name.trim()
    if (!trimmed) {
      setError("Please enter your name")
      return
    }

    const guest = registerVisitorGuest(trimmed)
    navigate(toPurposeOfVisitRoute(guest.code))
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-2xl">
        <TerminalFrame
          title="Immigration application for visitors"
          subtitle="You don't need an immigration code — enter your name to start"
          variant="visitor"
          glowEffect
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-teal-200 mb-2">
                Visitors are welcome. Enter your name below to begin your application.
              </p>
              <p className="text-sm text-teal-300/70">
                You will then select your purpose of visit and declarations.
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <label htmlFor="visitor-name" className="text-sm font-semibold text-teal-200 uppercase tracking-wide">
                Your name
              </label>
              <TerminalInput
                id="visitor-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError("")
                }}
                placeholder="Enter your name..."
                className="text-center text-xl w-full max-w-xs border-teal-400/30 focus:border-teal-400/60 focus:ring-teal-400/20"
                autoFocus
              />
            </div>

            {error && (
              <div className="flex justify-center gap-2 text-red-400 bg-red-950/30 border border-red-400/30 rounded p-3">
                <AlertCircleIcon className="w-5 h-5 shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <FlowActionRow>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/code-entry")}
                className={visitorSecondaryActionButtonClass}
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={!name.trim()}
                className={`${visitorPrimaryActionButtonClass} px-8`}
              >
                <UserPlusIcon className="w-5 h-5 mr-2" />
                Continue as visitor
              </Button>
            </FlowActionRow>

            <div className="text-center pt-6 border-t border-teal-400/20">
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
            </div>
          </form>
        </TerminalFrame>
      </div>
    </div>
  )
}
