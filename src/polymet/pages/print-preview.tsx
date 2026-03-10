import { useMemo, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import {
  FlowActionRow,
  primaryActionButtonClass,
  secondaryActionButtonClass,
} from "@/polymet/components/flow-action-row"
import { FlowErrorState } from "@/polymet/components/flow-error-state"
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
import {
  createApplicationId,
  parseBooleanParam,
  parseCsvParam,
  toApprovedDecisionRoute,
  toPrintSuccessRoute,
} from "@/polymet/flow-routes"
import { PrinterIcon, DownloadIcon } from "lucide-react"

export function PrintPreview() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const visaCaptureRef = useRef<HTMLDivElement>(null)
  const [printAttempted, setPrintAttempted] = useState(false)
  const [printConfirmed, setPrintConfirmed] = useState(false)

  const code = searchParams.get("code") || ""
  const visaNumber = searchParams.get("visaNumber") || ""
  const purposes = parseCsvParam(searchParams.get("purposes"))
  const declarations = parseCsvParam(searchParams.get("declarations"))
  const privileges = parseCsvParam(searchParams.get("privileges"))
  const timestamp = searchParams.get("timestamp") || new Date().toISOString()
  const isSecondary = parseBooleanParam(searchParams.get("secondary"))
  const isManual = searchParams.get("manual") === "1"
  const manualName = searchParams.get("manualName") || ""
  const manualAgentCode = searchParams.get("manualAgentCode") || ""
  const applicationId = searchParams.get("applicationId") || undefined

  const lookedUpGuest = findGuestByCode(code)
  const manualGuest = useMemo(
    () =>
      isManual && manualName && manualAgentCode
        ? createManualGuest(manualName, manualAgentCode)
        : null,
    [isManual, manualName, manualAgentCode]
  )
  const guest = lookedUpGuest ?? manualGuest

  if (!guest) {
    return <FlowErrorState message="Guest not found. Please start over." onButtonClick={() => navigate("/")} />
  }

  const getPurposeLabels = () => {
    return purposes.map(p => purposeOptions.find(opt => opt.value === p)?.label || p)
  }

  const getDeclarationLabels = () => {
    return declarations.map(d => declarationOptions.find(opt => opt.value === d)?.label || d)
  }

  const randomVisaCopy = useMemo(() => getRandomVisaCopyMessage(), [])
  const effectiveVisaClass = isSecondary
    ? "Temporary Celebration Authorization"
    : guest.visaClass

  const handlePrint = () => {
    setPrintAttempted(true)
    window.print()
  }

  const handleContinueAfterPrint = () => {
    const printProofToken = createApplicationId()
    if (typeof window !== "undefined" && printConfirmed) {
      window.sessionStorage.setItem(
        `print-proof:${printProofToken}`,
        JSON.stringify({
          code: code || null,
          issuedAt: Date.now(),
        })
      )
    }

    if (isManual) {
      navigate(
        toPrintSuccessRoute({
          manual: true,
          manualName: guest.name,
          manualAgentCode: guest.agentCode,
          manualValidity: guest.validityMinutes,
          secondary: isSecondary,
          applicationId,
          printedConfirmed: printConfirmed,
          printProofToken,
        })
      )
      return
    }

    navigate(
      toPrintSuccessRoute({
        code,
        secondary: isSecondary,
        applicationId,
        printedConfirmed: printConfirmed,
        printProofToken,
      })
    )
  }

  const handleDownloadPng = async () => {
    const wrapper = visaCaptureRef.current
    if (!wrapper) return
    const el = (wrapper.firstElementChild ?? wrapper) as HTMLElement
    try {
      const { default: html2canvas } = await import("html2canvas")
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        width: el.offsetWidth,
        height: el.offsetHeight,
      })
      const dataUrl = canvas.toDataURL("image/png")
      const a = document.createElement("a")
      a.href = dataUrl
      a.download = `visa-${guest.name.replace(/\s+/g, "-")}-${visaNumber}.png`
      a.click()
    } catch (e) {
      console.error("PNG export failed", e)
    }
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
                {/* Visa Preview - show print-style (ink-friendly) so preview matches print */}
                <div className="flex justify-center">
                  <div ref={visaCaptureRef} className="w-full max-w-2xl flex justify-center" style={{ maxWidth: "105mm" }}>
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
                </div>

                {/* Action Buttons */}
                <FlowActionRow className="flex-wrap">
                  <Button
                    variant="outline"
                    onClick={() =>
                      isManual
                        ? navigate("/admin")
                        : navigate(
                            toApprovedDecisionRoute({
                              code,
                              purposes,
                              declarations,
                              privileges,
                              visaNumber,
                              timestamp,
                              secondary: isSecondary,
                              applicationId: applicationId ?? `back-${code}-${visaNumber}`,
                            })
                          )
                    }
                    className={secondaryActionButtonClass}
                  >
                    Back
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDownloadPng}
                    className="border-teal-400/50 bg-transparent text-teal-100 hover:bg-teal-950/50 hover:text-white"
                  >
                    <DownloadIcon className="w-5 h-5 mr-2" />
                    Download PNG
                  </Button>
                  <Button
                    onClick={handlePrint}
                    className={`${primaryActionButtonClass} px-12 text-lg`}
                  >
                    <PrinterIcon className="w-5 h-5 mr-2" />
                    {isManual ? "Print Manual Visa" : "Print Visa"}
                  </Button>
                  <Button
                    onClick={handleContinueAfterPrint}
                    disabled={!printAttempted || !printConfirmed}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue After Successful Print
                  </Button>
                </FlowActionRow>
                {!printAttempted && (
                  <p className="text-center text-xs text-purple-300/70">
                    Print first, then continue only if printing succeeded.
                  </p>
                )}
                {printAttempted && (
                  <label className="flex items-center justify-center gap-2 text-sm text-purple-200">
                    <input
                      type="checkbox"
                      checked={printConfirmed}
                      onChange={(event) => setPrintConfirmed(event.target.checked)}
                    />
                    I have confirmed the visa printed successfully
                  </label>
                )}
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