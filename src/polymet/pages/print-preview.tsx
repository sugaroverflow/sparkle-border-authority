import { useNavigate, useSearchParams } from "react-router-dom"
import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { VisaCard, visaPrintStyles } from "@/polymet/components/visa-card"
import { Button } from "@/components/ui/button"
import { 
  createManualGuest,
  findGuestByCode, 
  purposeOptions, 
  declarationOptions,
  getRandomVisaCopyMessage,
} from "@/polymet/data/immigration-data"
import { PrinterIcon } from "lucide-react"

export function PrintPreview() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const code = searchParams.get("code") || ""
  const visaNumber = searchParams.get("visaNumber") || ""
  const purposes = searchParams.get("purposes")?.split(",") || []
  const declarations = searchParams.get("declarations")?.split(",") || []
  const privileges = searchParams.get("privileges")?.split(",") || []
  const timestamp = searchParams.get("timestamp") || new Date().toISOString()
  const isSecondary = searchParams.get("secondary") === "true"
  const isManual = searchParams.get("manual") === "1"
  const manualName = searchParams.get("manualName") || ""
  const manualAgentCode = searchParams.get("manualAgentCode") || ""

  const lookedUpGuest = findGuestByCode(code)
  const manualGuest =
    isManual && manualName && manualAgentCode
      ? createManualGuest(manualName, manualAgentCode)
      : null
  const guest = lookedUpGuest ?? manualGuest

  if (!guest) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <TerminalFrame title="Error" variant="warning">
          <p className="text-center text-purple-200">Guest not found. Please start over.</p>
          <div className="flex justify-center mt-6">
            <Button onClick={() => navigate("/")}>
              Return to Start
            </Button>
          </div>
        </TerminalFrame>
      </div>
    )
  }

  const getPurposeLabels = () => {
    return purposes.map(p => purposeOptions.find(opt => opt.value === p)?.label || p)
  }

  const getDeclarationLabels = () => {
    return declarations.map(d => declarationOptions.find(opt => opt.value === d)?.label || d)
  }

  const randomVisaCopy = getRandomVisaCopyMessage()
  const effectiveVisaClass = isSecondary
    ? "Temporary Celebration Authorization"
    : guest.visaClass

  const handlePrint = () => {
    window.print()
    // After printing, navigate to success page
    setTimeout(() => {
      if (isManual) {
        navigate(
          `/print-success?manual=1&manualName=${encodeURIComponent(
            guest.name
          )}&manualAgentCode=${encodeURIComponent(
            guest.agentCode
          )}&manualValidity=${guest.validityMinutes}&secondary=${isSecondary}`
        )
        return
      }

      navigate(`/print-success?code=${code}&secondary=${isSecondary}`)
    }, 1000)
  }

  return (
    <>
      <style>{visaPrintStyles}</style>
      
      <div className="print:hidden">
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="w-full max-w-4xl">
            <TerminalFrame
              title="Print Preview"
              subtitle="Review visa before printing"
              variant="accent"
              glowEffect
            >
              <div className="space-y-8">
                <div className="text-center">
                  <p className="text-purple-200 mb-2">
                    Please review the visa details before printing
                  </p>
                  <p className="text-sm text-purple-300/70">
                    Ensure printer is loaded with A6 adhesive sheets
                  </p>
                </div>

                {/* Visa Preview */}
                <div className="flex justify-center">
                  <div className="w-full max-w-2xl">
                    <VisaCard
                      guest={guest}
                      visaNumber={visaNumber}
                      purposes={getPurposeLabels()}
                      declarations={getDeclarationLabels()}
                      privileges={privileges}
                      issueTimestamp={timestamp}
                      visaCopy={randomVisaCopy}
                      visaClassOverride={effectiveVisaClass}
                      size="preview"
                    />
                  </div>
                </div>

                {/* Printing Instructions */}
                <div className="p-4 bg-purple-950/20 border border-purple-400/20 rounded-lg">
                  <p className="text-sm text-purple-200 font-semibold mb-2">
                    Printing Instructions:
                  </p>
                  <ul className="text-sm text-purple-300/70 space-y-1 list-disc list-inside">
                    <li>Ensure printer is connected and ready</li>
                    <li>Use A6 adhesive sheet paper (148mm × 105mm)</li>
                    <li>Set orientation to portrait</li>
                    <li>No margins required</li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() =>
                      isManual
                        ? navigate("/admin")
                        : navigate(
                            `/decision?code=${code}&decision=approved&purposes=${purposes.join(",")}&declarations=${declarations.join(",")}&privileges=${privileges.join(",")}&visaNumber=${visaNumber}&timestamp=${timestamp}`
                          )
                    }
                    className="border-purple-400/50 bg-transparent text-purple-100 hover:bg-purple-950/50 hover:text-white"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handlePrint}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-12 text-lg"
                  >
                    <PrinterIcon className="w-5 h-5 mr-2" />
                    {isManual ? "Print Manual Visa" : "Print Visa"}
                  </Button>
                </div>
              </div>
            </TerminalFrame>
          </div>
        </div>
      </div>

      {/* Print-only content */}
      <div className="hidden print:block visa-print-container">
        <VisaCard
          guest={guest}
          visaNumber={visaNumber}
          purposes={getPurposeLabels()}
          declarations={getDeclarationLabels()}
          privileges={privileges}
          issueTimestamp={timestamp}
          visaCopy={randomVisaCopy}
          visaClassOverride={effectiveVisaClass}
          size="print"
        />
      </div>
    </>
  )
}