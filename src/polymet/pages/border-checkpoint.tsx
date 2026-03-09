import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { ScanFrame, ScanButton } from "@/polymet/components/scan-frame"
import { StatusBadge } from "@/polymet/components/status-badge"
import { SparkleEffect } from "@/polymet/components/sparkle-effect"
import { ShieldCheckIcon, AlertCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { findGuestByCode, markGuestArrived } from "@/polymet/data/immigration-data"

type VerificationStatus = "idle" | "scanning" | "granted" | "denied"

export function BorderCheckpoint() {
  const [searchParams] = useSearchParams()
  const incomingCode = (searchParams.get("code") || "").toUpperCase()
  const guestFromCode = incomingCode ? findGuestByCode(incomingCode) : undefined
  const [status, setStatus] = useState<VerificationStatus>("idle")
  const [travelerName, setTravelerName] = useState("")

  const handleScan = () => {
    setStatus("scanning")
    
    // If a known guest code is supplied, verification resolves to granted.
    setTimeout(() => {
      const isGranted = guestFromCode ? true : Math.random() > 0.3
      setStatus(isGranted ? "granted" : "denied")
      setTravelerName(
        isGranted
          ? guestFromCode
            ? `${guestFromCode.name} (${guestFromCode.agentCode})`
            : "Verified Traveler"
          : "Unknown Traveler"
      )
      if (isGranted && guestFromCode) {
        markGuestArrived(guestFromCode.code)
      }
    }, 2000)
  }

  const handleReset = () => {
    setStatus("idle")
    setTravelerName("")
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-3xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 relative">
          <SparkleEffect variant="stars" size="lg" className="absolute -top-4 left-1/4" />
          <SparkleEffect variant="stars" size="lg" className="absolute -top-4 right-1/4" />
          
          <div className="flex items-center justify-center gap-3">
            <ShieldCheckIcon className="w-10 h-10 text-purple-300" />
            <h1 className="text-4xl font-bold text-purple-100 tracking-wider uppercase">
              Drawing Room Border
            </h1>
          </div>
          <p className="text-xl text-purple-300/90 uppercase tracking-widest">
            Checkpoint Verification
          </p>
        </div>

        {/* Main Verification Interface */}
        <TerminalFrame
          title="Document Verification"
          subtitle="Scan passport or passcard to verify entry"
          variant={status === "granted" ? "success" : status === "denied" ? "warning" : "accent"}
          glowEffect={status !== "idle"}
        >
          <div className="space-y-8">
            {/* Scanning Frame */}
            {(status === "idle" || status === "scanning") && (
              <div className="flex flex-col items-center space-y-6">
                <ScanFrame size="lg" isScanning={status === "scanning"} />
                
                <div className="text-center space-y-4">
                  <p className="text-lg text-purple-200 font-semibold">
                    {status === "scanning" ? "Verifying document..." : "Present travel document"}
                  </p>
                  {guestFromCode && status === "idle" && (
                    <p className="text-sm text-emerald-300/80">
                      Loaded guest: {guestFromCode.name} ({guestFromCode.code})
                    </p>
                  )}
                  <p className="text-sm text-purple-300/70 max-w-md">
                    Position the QR code on your passport or passcard within the scanning frame
                  </p>
                </div>

                <ScanButton onClick={handleScan} disabled={status === "scanning"}>
                  {status === "scanning" ? "Verifying..." : "Scan Document"}
                </ScanButton>
              </div>
            )}

            {/* Verification Result - Entry Granted */}
            {status === "granted" && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex justify-center">
                  <StatusBadge status="authorized" size="lg" showSparkles />
                </div>

                <div className="p-6 rounded-lg bg-emerald-500/10 border-2 border-emerald-400/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-emerald-500/20 border border-emerald-400/50">
                      <ShieldCheckIcon className="w-8 h-8 text-emerald-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-emerald-100 uppercase tracking-wide">
                        Entry Granted
                      </h3>
                      <p className="text-emerald-200/70 mt-1">Document verified successfully</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-emerald-400/30">
                    <p className="text-sm text-emerald-300/70 uppercase tracking-wide mb-1">
                      Traveler
                    </p>
                    <p className="text-xl font-bold text-emerald-100">{travelerName}</p>
                  </div>
                </div>

                <div className="flex justify-center gap-8">
                  <SparkleEffect variant="sparkles" size="md" animate />
                  <SparkleEffect variant="stars" size="md" animate />
                  <SparkleEffect variant="sparkles" size="md" animate />
                </div>

                <Button
                  onClick={handleReset}
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold uppercase tracking-wider"
                >
                  Next Traveler
                </Button>
              </div>
            )}

            {/* Verification Result - Access Denied */}
            {status === "denied" && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex justify-center">
                  <StatusBadge status="denied" size="lg" />
                </div>

                <div className="p-6 rounded-lg bg-red-500/10 border-2 border-red-400/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-red-500/20 border border-red-400/50">
                      <AlertCircleIcon className="w-8 h-8 text-red-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-red-100 uppercase tracking-wide">
                        Access Denied
                      </h3>
                      <p className="text-red-200/70 mt-1">Document verification failed</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-red-400/30 space-y-3">
                    <p className="text-red-200 font-semibold">
                      Please return to Border Control for assistance
                    </p>
                    <ul className="text-sm text-red-300/70 space-y-1 list-disc list-inside">
                      <li>Document may be invalid or expired</li>
                      <li>QR code may be damaged or unreadable</li>
                      <li>Additional verification may be required</li>
                    </ul>
                  </div>
                </div>

                <Button
                  onClick={handleReset}
                  size="lg"
                  variant="outline"
                  className="w-full border-purple-400/50 text-purple-200 hover:bg-purple-500/10"
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </TerminalFrame>

        {/* Manual Verification Option */}
        {status === "idle" && (
          <div className="p-4 rounded-lg bg-slate-900/30 border border-purple-400/20 text-center">
            <p className="text-sm text-purple-300/70">
              For manual verification, please contact border authority staff
            </p>
          </div>
        )}
      </div>
    </div>
  )
}