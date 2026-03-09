import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { TerminalInput } from "@/polymet/components/form-field"
import { Button } from "@/components/ui/button"
import { findGuestByCode } from "@/polymet/data/immigration-data"
import { AlertCircleIcon } from "lucide-react"

export function CodeEntry() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [showBorderAssistance, setShowBorderAssistance] = useState(false)
  const navigate = useNavigate()

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
    navigate(`/identity-confirmation?code=${code}`)
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-2xl">
        <TerminalFrame
          title="Immigration Code Entry"
          subtitle="Enter your 4-character code"
          variant="accent"
          glowEffect
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <p className="text-purple-200 mb-2">
                Please enter the immigration code from your invitation
              </p>
              <p className="text-sm text-purple-300/70">
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
                className="text-center text-3xl font-mono tracking-widest w-64 uppercase"
                autoFocus
              />
            </div>

            {error && (
              <div className="flex items-center justify-center gap-2 text-red-400 bg-red-950/30 border border-red-400/30 rounded p-3">
                <AlertCircleIcon className="w-5 h-5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {showBorderAssistance && (
              <div className="text-center text-sm text-amber-300 bg-amber-950/30 border border-amber-400/30 rounded p-3">
                Verify your code or proceed to the border for assistance (SSSS - Secondary Something Something Suspicious Screening).
              </div>
            )}

            <div className="flex justify-center gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
                className="border-purple-400/30 text-purple-200 hover:bg-purple-950/50"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={code.length !== 4}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-8"
              >
                Continue
              </Button>
            </div>

            {showBorderAssistance && (
              <div className="flex justify-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="border-purple-400/30 text-purple-200 hover:bg-purple-950/50"
                >
                  Start over
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate("/border-checkpoint")}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold"
                >
                  Proceed to border assistance
                </Button>
              </div>
            )}

            <div className="text-center pt-6 border-t border-purple-400/20">
              <p className="text-sm text-purple-300/70 mb-2">
                Don't have an immigration code?
              </p>
              <Button
                type="button"
                variant="link"
                className="text-purple-300 hover:text-purple-200"
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