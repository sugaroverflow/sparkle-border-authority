import { useNavigate, useSearchParams } from "react-router-dom"
import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { StatusBadge } from "@/polymet/components/status-badge"
import { SparkleEffect } from "@/polymet/components/sparkle-effect"
import { Button } from "@/components/ui/button"
import { findGuestByCode } from "@/polymet/data/immigration-data"
import { UserIcon, ShieldCheckIcon, CreditCardIcon } from "lucide-react"

export function IdentityConfirmation() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const code = searchParams.get("code") || ""

  const guest = findGuestByCode(code)

  if (!guest) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <TerminalFrame title="Error" variant="warning">
          <p className="text-center text-purple-200">Guest not found. Please try again.</p>
          <div className="flex justify-center mt-6">
            <Button onClick={() => navigate("/code-entry")}>
              Back to Code Entry
            </Button>
          </div>
        </TerminalFrame>
      </div>
    )
  }

  const handleConfirm = () => {
    navigate(`/purpose-of-visit?code=${code}`)
  }

  const handleManualReview = () => {
    // In a real app, this would trigger a staff notification
    alert("Manual review requested. Please wait for border authority assistance.")
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-3xl">
        <TerminalFrame
          title="Identity Confirmation"
          subtitle="Please verify your information"
          variant="success"
          glowEffect
        >
          <div className="space-y-8">
            {/* Guest Photo and Name */}
            <div className="flex items-center justify-center gap-6">
              {guest.photo ? (
                <div className="relative">
                  <img
                    src={guest.photo}
                    alt={guest.name}
                    className="w-32 h-32 rounded-lg border-4 border-purple-400/30"
                  />
                  <SparkleEffect
                    variant="sparkles"
                    size="sm"
                    className="absolute -top-2 -right-2"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-lg border-4 border-purple-400/30 bg-purple-950/30 flex items-center justify-center">
                  <UserIcon className="w-16 h-16 text-purple-400/50" />
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-purple-300/70 uppercase tracking-wider font-mono">
                    Guest Name
                  </p>
                  <p className="text-3xl font-bold text-purple-100">
                    {guest.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-purple-300/70 uppercase tracking-wider font-mono">
                    Agent Code
                  </p>
                  <p className="text-xl font-mono text-purple-200">
                    {guest.agentCode}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-purple-300/70 uppercase tracking-wider font-mono">
                    Immigration Code
                  </p>
                  <p className="text-xl font-mono text-purple-200">
                    {guest.code}
                  </p>
                </div>
              </div>
            </div>

            {/* Guest Details */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-purple-950/30 border border-purple-400/20 rounded-lg text-center">
                <StatusBadge
                  status={
                    guest.status === "VIP" || guest.status === "Special Envoy" || guest.status === "Citizen"
                      ? "authorized"
                      : "visitor"
                  }
                  size="sm"
                  className="mb-2"
                />
                <p className="text-sm text-purple-300/70 uppercase tracking-wider font-mono">
                  Status Level
                </p>
                <p className="text-lg font-bold text-purple-100">
                  {guest.status}
                </p>
              </div>

              <div className="p-4 bg-purple-950/30 border border-purple-400/20 rounded-lg text-center">
                <CreditCardIcon className="w-6 h-6 text-purple-300 mx-auto mb-2" />
                <p className="text-sm text-purple-300/70 uppercase tracking-wider font-mono">
                  Passport Type
                </p>
                <p className="text-lg font-bold text-purple-100 capitalize">
                  {guest.passportType}
                </p>
              </div>

              <div className="p-4 bg-purple-950/30 border border-purple-400/20 rounded-lg text-center">
                <ShieldCheckIcon className="w-6 h-6 text-purple-300 mx-auto mb-2" />
                <p className="text-sm text-purple-300/70 uppercase tracking-wider font-mono">
                  Visa Class
                </p>
                <p className="text-sm font-bold text-purple-100">
                  {guest.visaClass}
                </p>
              </div>
            </div>

            {/* Passport Type Notice */}
            {guest.passportType === "fancy" && (
              <div className="p-4 bg-pink-950/20 border border-pink-400/30 rounded-lg">
                <p className="text-sm text-pink-200 text-center">
                  <strong>Note:</strong> Retrieve your passport booklet by finding your named envelope
                </p>
              </div>
            )}
            {guest.passportType === "visitor" && (
              <div className="p-4 bg-amber-950/20 border border-amber-400/30 rounded-lg">
                <p className="text-sm text-amber-200 text-center">
                  <strong>Note:</strong> Retrieve a visitor booklet from the box near the kiosk.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-4">
              <Button
                variant="outline"
                onClick={handleManualReview}
                className="border-purple-400/50 bg-transparent text-purple-100 hover:bg-purple-950/50 hover:text-white"
              >
                Request Manual Review
              </Button>
              <Button
                onClick={handleConfirm}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-12"
              >
                Confirm Identity
              </Button>
            </div>
          </div>
        </TerminalFrame>
      </div>
    </div>
  )
}