import { type GuestRecord } from "@/polymet/data/immigration-data"
import { SparkleEffect } from "@/polymet/components/sparkle-effect"
import { getPrivilegeTagClass } from "@/polymet/components/privilege-tag-variants"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

// Ink-friendly privilege tag classes for print (no heavy background)
const PRINT_PRIVILEGE_TAG_CLASSES = [
  "bg-transparent border-emerald-600 text-emerald-800",
  "bg-transparent border-purple-600 text-purple-800",
  "bg-transparent border-pink-600 text-pink-800",
  "bg-transparent border-amber-600 text-amber-800",
]

function getPrivilegeTagClassPrint(index: number): string {
  return cn("text-[10px] px-1.5 py-0.5 border rounded font-medium", PRINT_PRIVILEGE_TAG_CLASSES[index % PRINT_PRIVILEGE_TAG_CLASSES.length])
}

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
      className={cn(
        "relative rounded-lg overflow-hidden flex flex-col",
        isPrint
          ? "w-[148mm] h-[105mm] min-h-0 bg-white border-2 border-slate-300"
          : "bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 border-2 border-purple-400/30 w-full max-w-md aspect-[148/105]"
      )}
      style={isPrint ? { pageBreakAfter: "always" } : undefined}
    >
      {/* Background: gradient for screen, none for print */}
      {!isPrint && (
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
      )}

      {/* Corner Sparkles - screen only */}
      {!isPrint && (
        <>
          <div className="absolute top-2 right-2">
            <SparkleEffect variant="stars" size="sm" />
          </div>
          <div className="absolute bottom-2 left-2">
            <SparkleEffect variant="stars" size="sm" />
          </div>
        </>
      )}

      {/* Content - compact in print */}
      <div className={cn(
        "relative h-full flex flex-col min-h-0",
        isPrint ? "p-3" : "p-6"
      )}>
        {/* Header */}
        <div className={cn(
          "text-center border-b pb-2 mb-2 shrink-0",
          isPrint ? "border-slate-300" : "border-purple-400/30"
        )}>
          <h1 className={cn(
            "font-bold uppercase tracking-wider font-mono",
            isPrint ? "text-sm text-slate-800" : "text-lg text-purple-100"
          )}>
            Ration Club Border Authority
          </h1>
          <p className={cn(
            "uppercase tracking-widest font-mono mt-0.5",
            isPrint ? "text-[10px] text-slate-500" : "text-xs text-purple-300/70"
          )}>
            Immigration Terminal
          </p>
        </div>

        {/* Visa Class & Number */}
        <div className="flex justify-between items-start mb-2 shrink-0">
          <div>
            <p className={cn(
              "uppercase tracking-wider font-mono",
              isPrint ? "text-[9px] text-slate-500" : "text-xs text-purple-300/70"
            )}>
              Visa Class
            </p>
            <p className={cn(
              "font-bold font-mono",
              isPrint ? "text-[10px] text-slate-800" : "text-sm text-purple-100"
            )}>
              {visaClassOverride ?? guest.visaClass}
            </p>
          </div>
          <div className="text-right">
            <p className={cn(
              "uppercase tracking-wider font-mono",
              isPrint ? "text-[9px] text-slate-500" : "text-xs text-purple-300/70"
            )}>
              Visa No.
            </p>
            <p className={cn(
              "font-bold font-mono",
              isPrint ? "text-[10px] text-slate-800" : "text-sm text-purple-100"
            )}>
              {visaNumber}
            </p>
          </div>
        </div>

        {/* Guest Info */}
        <div className={cn(
          "flex gap-2 mb-2 pb-2 border-b shrink-0",
          isPrint ? "border-slate-200" : "border-purple-400/20"
        )}>
          {guest.photo && !isPrint && (
            <img
              src={guest.photo}
              alt={guest.name}
              className="w-16 h-16 rounded border-2 border-purple-400/30"
            />
          )}
          {guest.photo && isPrint && (
            <img
              src={guest.photo}
              alt={guest.name}
              className="w-10 h-10 rounded border border-slate-300"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className={cn(
              "uppercase tracking-wider font-mono",
              isPrint ? "text-[9px] text-slate-500" : "text-xs text-purple-300/70"
            )}>
              Guest Name
            </p>
            <p className={cn(
              "font-bold mb-0.5",
              isPrint ? "text-xs text-slate-800" : "text-base text-purple-100 mb-1"
            )}>
              {guest.name}
            </p>
            <p className={cn(
              "uppercase tracking-wider font-mono",
              isPrint ? "text-[9px] text-slate-500" : "text-xs text-purple-300/70"
            )}>
              Agent Code
            </p>
            <p className={cn(
              "font-semibold mb-0.5",
              isPrint ? "text-[10px] text-slate-700" : "text-sm text-purple-200 mb-1"
            )}>
              {guest.agentCode}
            </p>
            <p className={cn(
              "uppercase tracking-wider font-mono",
              isPrint ? "text-[9px] text-slate-500" : "text-xs text-purple-300/70"
            )}>
              Status Level
            </p>
            <p className={cn(
              "font-semibold",
              isPrint ? "text-[10px] text-slate-700" : "text-sm text-purple-200"
            )}>
              {guest.status}
            </p>
          </div>
        </div>

        {/* Purpose & Declarations - single column in print to avoid cut-off */}
        <div className={cn(
          "mb-2 pb-2 border-b shrink-0 min-h-0",
          isPrint ? "border-slate-200 grid grid-cols-2 gap-x-3 gap-y-1" : "border-purple-400/20 grid grid-cols-2 gap-3 mb-3 pb-3"
        )}>
          <div className="min-w-0">
            <p className={cn(
              "uppercase tracking-wider font-mono mb-0.5",
              isPrint ? "text-[9px] text-slate-500" : "text-xs text-purple-300/70 mb-1"
            )}>
              Purpose
            </p>
            <div className="space-y-0">
              {purposes.map((purpose, i) => (
                <p key={i} className={cn(
                  isPrint ? "text-[10px] text-slate-800" : "text-xs text-purple-100"
                )}>
                  • {purpose}
                </p>
              ))}
            </div>
          </div>
          <div className="min-w-0">
            <p className={cn(
              "uppercase tracking-wider font-mono mb-0.5",
              isPrint ? "text-[9px] text-slate-500" : "text-xs text-purple-300/70 mb-1"
            )}>
              Declarations
            </p>
            <div className="space-y-0">
              {declarations.map((declaration, i) => (
                <p key={i} className={cn(
                  isPrint ? "text-[10px] text-slate-800" : "text-xs text-purple-100"
                )}>
                  • {declaration}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Privileges */}
        <div className="mb-2 shrink-0">
          <p className={cn(
            "uppercase tracking-wider font-mono mb-0.5",
            isPrint ? "text-[9px] text-slate-500" : "text-xs text-purple-300/70 mb-1"
          )}>
            Privileges Granted
          </p>
          <div className="flex flex-wrap gap-1">
            {privileges.map((privilege, i) => (
              <span
                key={i}
                className={cn(
                  "text-xs px-2 py-0.5 border rounded font-medium",
                  isPrint ? getPrivilegeTagClassPrint(i) : getPrivilegeTagClass(i)
                )}
              >
                {privilege}
              </span>
            ))}
          </div>
        </div>

        {/* Footer - ensure it's visible */}
        <div className="mt-auto shrink-0 pt-1">
          <p className={cn(
            "italic text-center mb-1",
            isPrint ? "text-[9px] text-slate-600" : "text-xs text-purple-300/70 mb-2"
          )}>
            {visaCopy}
          </p>
          <div className={cn(
            "flex justify-between items-end font-mono",
            isPrint ? "text-[9px] text-slate-600" : "text-xs text-purple-300/70"
          )}>
            <div>
              <p>Issued: {format(new Date(issueTimestamp), "MMM dd, yyyy HH:mm")}</p>
              <p>Valid: {guest.validityMinutes} minutes</p>
            </div>
            <div className="text-right">
              <p className="mb-0.5">Border Officer</p>
              <div className={cn(
                "border-t w-24",
                isPrint ? "border-slate-400" : "border-purple-400/30"
              )} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Print-specific styles: only the visa prints, fit to A6, no app chrome
export const visaPrintStyles = `
  @media print {
    @page {
      size: 148mm 105mm;
      margin: 0;
    }
    
    body, body * {
      visibility: hidden;
    }
    
    .visa-print-container,
    .visa-print-container * {
      visibility: visible;
    }
    
    .visa-print-container {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 148mm !important;
      height: 105mm !important;
      margin: 0 !important;
      padding: 0 !important;
      background: white !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      page-break-after: avoid;
    }
    
    .visa-print-container > * {
      width: 148mm !important;
      height: 105mm !important;
      flex-shrink: 0 !important;
    }
  }
`