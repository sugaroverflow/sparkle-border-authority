import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { StatusBadge } from "@/polymet/components/status-badge"
import { SparkleEffect } from "@/polymet/components/sparkle-effect"
import { Button } from "@/components/ui/button"
import { findGuestByCode } from "@/polymet/data/immigration-data"
import { cn, getGuestInitials } from "@/lib/utils"
import { ShieldCheckIcon, CreditCardIcon, AlertTriangle, PartyPopper, Sparkles } from "lucide-react"

export function IdentityConfirmation() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const code = searchParams.get("code") || ""
  const [showAlert, setShowAlert] = useState(false)
  const [showStars, setShowStars] = useState(true)

  const guest = findGuestByCode(code)

  useEffect(() => {
    if (!guest?.customAlert) return
    const t1 = setTimeout(() => {
      setShowAlert(true)
      setShowStars(true)
    }, 500)
    const t2 = setTimeout(() => setShowStars(false), 3000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [guest?.customAlert])

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

  const firstName = guest.name.trim().split(/\s+/)[0] || guest.name

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
            {/* Custom alert for special guests - appears after a delay to surprise */}
            {guest.customAlert && showAlert && (
              <div className="relative">
                {/* Stars around the alert - fade out after ~2.5s */}
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 z-0",
                    !showStars && "animate-out fade-out duration-500"
                  )}
                  style={{ margin: "-12px" }}
                  aria-hidden
                >
                  <SparkleEffect variant="stars" size="sm" className="absolute -top-1 -left-1" />
                  <SparkleEffect variant="stars" size="sm" className="absolute -top-1 right-2" />
                  <SparkleEffect variant="stars" size="sm" className="absolute top-2 -right-1" />
                  <SparkleEffect variant="stars" size="sm" className="absolute -bottom-1 right-4" />
                  <SparkleEffect variant="stars" size="sm" className="absolute -bottom-1 -left-2" />
                  <SparkleEffect variant="stars" size="sm" className="absolute left-4 -bottom-1" />
                  <SparkleEffect variant="stars" size="sm" className="absolute -left-1 top-1/2 -translate-y-1/2" />
                  <SparkleEffect variant="stars" size="sm" className="absolute -right-1 top-1/3" />
                </div>
                <div
                  className={cn(
                    "relative z-10 animate-in fade-in slide-in-from-top-4 duration-500",
                    guest.customAlert.variant === "celebratory"
                      ? "p-5 rounded-lg border-2 bg-gradient-to-r from-amber-950/40 to-yellow-950/30 border-amber-400/50 text-amber-100 shadow-lg shadow-amber-500/10"
                      : guest.customAlert.variant === "cute"
                        ? "p-5 rounded-lg border-2 bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-fuchsia-950/30 border-pink-400/40 text-pink-100 shadow-lg shadow-pink-500/10"
                        : "p-5 rounded-lg border-2 bg-red-950/50 border-red-500/70 text-red-100 shadow-lg shadow-red-900/30"
                  )}
                >
                <div className="flex items-center justify-center gap-2 mb-2">
                  {guest.customAlert.variant === "celebratory" ? (
                    <PartyPopper className="w-5 h-5 text-amber-300 shrink-0" />
                  ) : guest.customAlert.variant === "cute" ? (
                    <Sparkles className="w-5 h-5 text-pink-300 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                  )}
                  {guest.customAlert.variant === "warning" && (
                    <span className="font-mono text-xs uppercase tracking-widest text-red-300">
                      Official notice
                    </span>
                  )}
                </div>
                <p className="text-center font-mono text-sm leading-relaxed">
                  {guest.customAlert.message.replace(/\(name\)/gi, guest.name)}
                </p>
              </div>
              </div>
            )}

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
                  <span className="text-4xl font-bold text-purple-400/80">
                    {getGuestInitials(guest.name)}
                  </span>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <p
                    className="text-3xl font-black tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-fuchsia-200 to-pink-200"
                    style={{ fontFamily: "var(--font-agent)" }}
                  >
                    Agent {guest.agentCode}
                  </p>
                  <p className="text-lg text-purple-200/90 mt-1 font-medium">
                    {guest.name}
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