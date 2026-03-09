import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { StatusBadge } from "@/polymet/components/status-badge"
import { DocumentCard, DocumentStamp } from "@/polymet/components/document-card"
import { SparkleEffect } from "@/polymet/components/sparkle-effect"
import { Button } from "@/components/ui/button"
import { PrinterIcon, CheckCircle2Icon } from "lucide-react"
import type { DocumentType } from "@/polymet/data/immigration-data"

interface DocumentIssuanceProps {
  travelerName?: string
  documentType?: DocumentType
}

export function DocumentIssuance({
  travelerName = "Alex Starfield",
  documentType = "citizen-passport",
}: DocumentIssuanceProps) {
  const [showApproval, setShowApproval] = useState(false)
  const [showDocument, setShowDocument] = useState(false)

  useEffect(() => {
    // Animate approval badge
    const approvalTimer = setTimeout(() => {
      setShowApproval(true)
    }, 500)

    // Animate document card
    const documentTimer = setTimeout(() => {
      setShowDocument(true)
    }, 1500)

    return () => {
      clearTimeout(approvalTimer)
      clearTimeout(documentTimer)
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-4xl space-y-8">
        {/* Approval Badge with Animation */}
        <div className="flex justify-center">
          <div
            className={`transition-all duration-700 ${
              showApproval ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          >
            <StatusBadge status="authorized" size="lg" showSparkles />
          </div>
        </div>

        {/* Main Content */}
        <TerminalFrame
          title="Document Issuance"
          subtitle="Authorization Approved"
          variant="success"
          glowEffect
        >
          <div className="space-y-8">
            {/* Approval Message */}
            <div className="flex items-center gap-4 p-6 rounded-lg bg-emerald-500/10 border border-emerald-400/30">
              <div className="p-3 rounded-full bg-emerald-500/20 border border-emerald-400/50">
                <CheckCircle2Icon className="w-8 h-8 text-emerald-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-emerald-100 uppercase tracking-wide">
                  Declaration Approved
                </h3>
                <p className="text-emerald-200/70 mt-1">
                  Your travel document has been authorized for issuance
                </p>
              </div>
            </div>

            {/* Document Preview */}
            <div
              className={`transition-all duration-700 ${
                showDocument ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-purple-100 uppercase tracking-wide">
                    Document Preview
                  </h3>
                  <DocumentStamp status="approved" className="w-20 h-20 text-base" />
                </div>

                <div className="flex justify-center p-8 rounded-lg bg-slate-950/50 border border-purple-400/20 relative">
                  <DocumentCard
                    documentType={documentType}
                    travelerName={travelerName}
                    size="lg"
                  />

                  {/* Sparkle Effects */}
                  <SparkleEffect
                    variant="sparkles"
                    size="sm"
                    className="absolute top-4 left-4"
                  />
                  <SparkleEffect
                    variant="sparkles"
                    size="sm"
                    className="absolute top-4 right-4"
                  />
                  <SparkleEffect
                    variant="stars"
                    size="sm"
                    className="absolute bottom-4 left-4"
                  />
                  <SparkleEffect
                    variant="stars"
                    size="sm"
                    className="absolute bottom-4 right-4"
                  />
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-400/30">
              <p className="text-purple-100 text-center">
                Please proceed to print your travel document. Present this document at all checkpoints.
              </p>
            </div>
          </div>
        </TerminalFrame>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Link to="/printing">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(192,132,252,0.4)] hover:shadow-[0_0_30px_rgba(192,132,252,0.6)]"
            >
              <PrinterIcon className="w-5 h-5 mr-2" />
              Print Document
            </Button>
          </Link>
        </div>

        {/* Sparkle Decorations */}
        <div className="flex justify-center gap-12">
          <SparkleEffect variant="sparkles" size="md" />
          <SparkleEffect variant="stars" size="md" />
          <SparkleEffect variant="sparkles" size="md" />
        </div>
      </div>
    </div>
  )
}