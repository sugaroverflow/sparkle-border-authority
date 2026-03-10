import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { SparkleEffect } from "@/polymet/components/sparkle-effect"
import { 
  validateApplication, 
  shouldTriggerSecondaryScreeningForGuest,
  findGuestByCode,
  assignPrivileges,
  generateVisaNumber,
  recordDecisionOnce,
} from "@/polymet/data/immigration-data"
import {
  createApplicationId,
  parseCsvParam,
  toApprovedDecisionRoute,
  toRejectedDecisionRoute,
  toSecondaryScreeningRoute,
} from "@/polymet/flow-routes"
import { LoaderIcon } from "lucide-react"

const processingMessages = [
  "Verifying declarations...",
  "Consulting border authority...",
  "Assessing sparkle compliance...",
  "Checking cake allocation...",
  "Reviewing glitter manifests...",
  "Analyzing celebratory intent...",
  "Cross-referencing guest registry...",
  "Evaluating diplomatic credentials...",
]

export function Processing() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const code = searchParams.get("code") || ""
  const purposes = parseCsvParam(searchParams.get("purposes"))
  const declarations = parseCsvParam(searchParams.get("declarations"))
  const applicationId = searchParams.get("applicationId") || createApplicationId()

  const [currentMessage, setCurrentMessage] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Rotate messages
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % processingMessages.length)
    }, 400)

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(messageInterval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      // Process application
      setTimeout(() => {
        processApplication()
      }, 500)
    }
  }, [progress])

  const processApplication = () => {
    const guest = findGuestByCode(code)
    if (!guest) {
      navigate("/code-entry")
      return
    }

    // Diplomatic immunity: approve regardless of declarations
    if (guest.diplomaticImmunity) {
      const privileges = assignPrivileges(guest)
      const visaNumber = generateVisaNumber()
      const timestamp = new Date().toISOString()
      recordDecisionOnce(applicationId, "approved", guest.status)
      navigate(
        toApprovedDecisionRoute({
          code,
          purposes,
          declarations,
          privileges,
          visaNumber,
          timestamp,
          applicationId,
        })
      )
      return
    }

    // Validate application
    const validation = validateApplication(purposes, declarations)

    if (!validation.valid) {
      recordDecisionOnce(applicationId, "rejected", guest.status)
      navigate(
        toRejectedDecisionRoute({
          code,
          reason: validation.reason || "Border Authority Not Yet Convinced",
          retryCaption: validation.retryCaption || "Review your selections and try again.",
          applicationId,
        })
      )
      return
    }

    // Check for secondary screening
    const needsSecondary = shouldTriggerSecondaryScreeningForGuest(guest.status)

    if (needsSecondary) {
      navigate(toSecondaryScreeningRoute(code, purposes, declarations, applicationId))
      return
    }

    // Approved - assign privileges and generate visa
    const privileges = assignPrivileges(guest)
    const visaNumber = generateVisaNumber()
    const timestamp = new Date().toISOString()

    recordDecisionOnce(applicationId, "approved", guest.status)
    navigate(
      toApprovedDecisionRoute({
        code,
        purposes,
        declarations,
        privileges,
        visaNumber,
        timestamp,
        applicationId,
      })
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-2xl">
        <TerminalFrame
          title="Processing Application"
          subtitle="Please wait..."
          variant="accent"
          glowEffect
        >
          <div className="space-y-8 py-8">
            {/* Animated Loader */}
            <div className="flex justify-center">
              <div className="relative">
                <LoaderIcon className="w-24 h-24 text-purple-400 animate-spin" />
                <SparkleEffect
                  variant="sparkles"
                  size="lg"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </div>

            {/* Rotating Messages */}
            <div className="text-center min-h-[60px] flex items-center justify-center">
              <p
                key={currentMessage}
                className="text-xl text-purple-200 font-mono animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                {processingMessages[currentMessage]}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-3 bg-slate-900/50 border border-purple-400/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center text-sm text-purple-300/70 font-mono">
                {progress}% Complete
              </p>
            </div>

            {/* Info */}
            <div className="text-center text-sm text-purple-300/70">
              <p>Do not close this window</p>
              <p className="text-xs mt-1">Processing typically takes 2-3 seconds</p>
            </div>
          </div>
        </TerminalFrame>
      </div>
    </div>
  )
}