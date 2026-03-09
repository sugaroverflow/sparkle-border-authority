import { type GuestRecord } from "@/polymet/data/immigration-data"
import { SparkleEffect } from "@/polymet/components/sparkle-effect"
import { format } from "date-fns"

interface VisaCardProps {
  guest: GuestRecord
  visaNumber: string
  purposes: string[]
  declarations: string[]
  privileges: string[]
  issueTimestamp: string
  visaCopy?: string
  visaClassOverride?: string
  size?: "preview" | "print"
}

export function VisaCard({
  guest,
  visaNumber,
  purposes,
  declarations,
  privileges,
  issueTimestamp,
  visaCopy = "Authorized for celebratory presence.",
  visaClassOverride,
  size = "preview",
}: VisaCardProps) {
  const isPrint = size === "print"

  return (
    <div
      className={`
        relative bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900
        border-2 border-purple-400/30 rounded-lg overflow-hidden
        ${isPrint ? "w-[148mm] h-[105mm]" : "w-full max-w-md aspect-[148/105]"}
      `}
      style={isPrint ? { pageBreakAfter: "always" } : undefined}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(168, 85, 247, 0.1) 10px,
            rgba(168, 85, 247, 0.1) 20px
          )`
        }} />
      </div>

      {/* Corner Sparkles */}
      <div className="absolute top-2 right-2">
        <SparkleEffect variant="stars" size="sm" />
      </div>
      <div className="absolute bottom-2 left-2">
        <SparkleEffect variant="stars" size="sm" />
      </div>

      {/* Content */}
      <div className="relative p-6 h-full flex flex-col">
        {/* Header */}
        <div className="text-center border-b border-purple-400/30 pb-3 mb-3">
          <h1 className="text-lg font-bold text-purple-100 uppercase tracking-wider font-mono">
            Ration Club Border Authority
          </h1>
          <p className="text-xs text-purple-300/70 uppercase tracking-widest font-mono mt-1">
            Immigration Terminal
          </p>
        </div>

        {/* Visa Class & Number */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-xs text-purple-300/70 uppercase tracking-wider font-mono">
              Visa Class
            </p>
            <p className="text-sm font-bold text-purple-100 font-mono">
              {visaClassOverride ?? guest.visaClass}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-purple-300/70 uppercase tracking-wider font-mono">
              Visa No.
            </p>
            <p className="text-sm font-bold text-purple-100 font-mono">
              {visaNumber}
            </p>
          </div>
        </div>

        {/* Guest Info */}
        <div className="flex gap-3 mb-3 pb-3 border-b border-purple-400/20">
          {guest.photo && (
            <img
              src={guest.photo}
              alt={guest.name}
              className="w-16 h-16 rounded border-2 border-purple-400/30"
            />
          )}
          <div className="flex-1">
            <p className="text-xs text-purple-300/70 uppercase tracking-wider font-mono">
              Guest Name
            </p>
            <p className="text-base font-bold text-purple-100 mb-1">
              {guest.name}
            </p>
            <p className="text-xs text-purple-300/70 uppercase tracking-wider font-mono">
              Agent Code
            </p>
            <p className="text-sm font-semibold text-purple-200 mb-1">
              {guest.agentCode}
            </p>
            <p className="text-xs text-purple-300/70 uppercase tracking-wider font-mono">
              Status Level
            </p>
            <p className="text-sm font-semibold text-purple-200">
              {guest.status}
            </p>
          </div>
        </div>

        {/* Purpose & Declarations */}
        <div className="grid grid-cols-2 gap-3 mb-3 pb-3 border-b border-purple-400/20">
          <div>
            <p className="text-xs text-purple-300/70 uppercase tracking-wider font-mono mb-1">
              Purpose
            </p>
            <div className="space-y-0.5">
              {purposes.map((purpose, i) => (
                <p key={i} className="text-xs text-purple-100">
                  • {purpose}
                </p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-purple-300/70 uppercase tracking-wider font-mono mb-1">
              Declarations
            </p>
            <div className="space-y-0.5">
              {declarations.map((declaration, i) => (
                <p key={i} className="text-xs text-purple-100">
                  • {declaration}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Privileges */}
        <div className="mb-3">
          <p className="text-xs text-purple-300/70 uppercase tracking-wider font-mono mb-1">
            Privileges Granted
          </p>
          <div className="flex flex-wrap gap-1">
            {privileges.map((privilege, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 bg-purple-500/20 border border-purple-400/30 rounded text-purple-100"
              >
                {privilege}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <p className="text-xs text-purple-300/70 italic text-center mb-2">
            {visaCopy}
          </p>
          <div className="flex justify-between items-end text-xs text-purple-300/70 font-mono">
            <div>
              <p>Issued: {format(new Date(issueTimestamp), "MMM dd, yyyy HH:mm")}</p>
              <p>Valid: {guest.validityMinutes} minutes</p>
            </div>
            <div className="text-right">
              <p className="mb-1">Border Officer</p>
              <div className="border-t border-purple-400/30 w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Print-specific styles
export const visaPrintStyles = `
  @media print {
    @page {
      size: A6 portrait;
      margin: 0;
    }
    
    body {
      margin: 0;
      padding: 0;
    }
    
    .visa-print-container {
      width: 148mm;
      height: 105mm;
      page-break-after: always;
    }
  }
`