import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { DocumentCard } from "@/polymet/components/document-card"
import { SparkleEffect } from "@/polymet/components/sparkle-effect"
import { Button } from "@/components/ui/button"
import { PrinterIcon, CheckCircle2Icon, HomeIcon } from "lucide-react"
import type { DocumentType } from "@/polymet/data/immigration-data"

interface PrintingProps {
  travelerName?: string
  documentType?: DocumentType
}

export function Printing({
  travelerName = "Alex Starfield",
  documentType = "citizen-passport",
}: PrintingProps) {
  const [printingProgress, setPrintingProgress] = useState(0)
  const [isPrinting, setIsPrinting] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!isPrinting) return

    const interval = setInterval(() => {
      setPrintingProgress((prev) => {
        if (prev >= 100) {
          setIsPrinting(false)
          setIsComplete(true)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [isPrinting])

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-4xl space-y-8">
        {/* Status Header */}
        <div className="text-center space-y-3">
          {isComplete ? (
            <>
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50">
                  <CheckCircle2Icon className="w-12 h-12 text-emerald-300" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-emerald-100 uppercase tracking-wider">
                Printing Complete
              </h2>
              <p className="text-emerald-200/70">
                Please collect your travel document from the printer
              </p>
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-purple-500/20 border-2 border-purple-400/50 animate-pulse">
                  <PrinterIcon className="w-12 h-12 text-purple-300" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-purple-100 uppercase tracking-wider">
                Printing Document
              </h2>
              <p className="text-purple-200/70">Please wait while your document is being printed...</p>
            </>
          )}
        </div>

        {/* Main Content */}
        <TerminalFrame
          title="Document Printing"
          subtitle={isComplete ? "Ready for Collection" : "Processing..."}
          variant={isComplete ? "success" : "accent"}
          glowEffect
        >
          <div className="space-y-8">
            {/* Document Preview */}
            <div className="flex justify-center p-8 rounded-lg bg-slate-950/50 border border-purple-400/20 relative">
              <div className={`transition-all duration-500 ${isPrinting ? "opacity-50 blur-sm" : "opacity-100 blur-0"}`}>
                <DocumentCard
                  documentType={documentType}
                  travelerName={travelerName}
                  size="lg"
                />
              </div>

              {/* Printing Animation Overlay */}
              {isPrinting && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="space-y-4 text-center">
                    <PrinterIcon className="w-16 h-16 text-purple-300 mx-auto animate-pulse" />
                    <div className="flex items-center gap-2">
                      <SparkleEffect variant="sparkles" size="sm" />
                      <SparkleEffect variant="stars" size="sm" />
                      <SparkleEffect variant="sparkles" size="sm" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-300 font-semibold uppercase tracking-wide">
                  {isComplete ? "Complete" : "Printing Progress"}
                </span>
                <span className="text-purple-100 font-mono font-bold">{printingProgress}%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-950/50 border border-purple-400/30 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 relative overflow-hidden"
                  style={{ width: `${printingProgress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {isComplete ? (
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-400/30">
                <p className="text-emerald-100 text-center font-semibold">
                  ✓ Your travel document has been printed successfully
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-400/20">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <p className="text-purple-200 text-sm">Generating document...</p>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-400/20">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <p className="text-purple-200 text-sm">Applying security features...</p>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-400/20">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <p className="text-purple-200 text-sm">Printing in progress...</p>
                </div>
              </div>
            )}
          </div>
        </TerminalFrame>

        {/* Action Buttons */}
        {isComplete && (
          <div className="flex gap-4 justify-center">
            <Link to="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(192,132,252,0.4)] hover:shadow-[0_0_30px_rgba(192,132,252,0.6)]"
              >
                <HomeIcon className="w-5 h-5 mr-2" />
                Return to Welcome
              </Button>
            </Link>
          </div>
        )}

        {/* Sparkle Decorations */}
        {isComplete && (
          <div className="flex justify-center gap-12">
            <SparkleEffect variant="sparkles" size="md" animate />
            <SparkleEffect variant="stars" size="md" animate />
            <SparkleEffect variant="sparkles" size="md" animate />
          </div>
        )}
      </div>
    </div>
  )
}