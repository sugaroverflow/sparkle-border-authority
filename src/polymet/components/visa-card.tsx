import { type GuestRecord } from "@/polymet/data/immigration-data"
import { getGuestInitials } from "@/lib/utils"
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
  const effectiveVisaClassRaw =
    guest.status === "Visitor"
      ? `${visaClassOverride ?? guest.visaClass} - Temporary Authorization`
      : visaClassOverride ?? guest.visaClass
  const effectiveVisaClass = effectiveVisaClassRaw.length > 33
    ? `${effectiveVisaClassRaw.slice(0, 33)}...`
    : effectiveVisaClassRaw

  const formatDate = (date: Date) =>
    `${format(date, "MMM dd, yyyy")} ${format(date, "HH:mm")}`

  const getColorScheme = () => {
    switch (guest.status) {
      case "Diplomat":
        return {
          headerBg: "bg-purple-50",
          headerBorder: "border-purple-900",
          headerText: "text-purple-900",
          border: "border-purple-900",
          accentText: "text-purple-900",
          labelText: "text-purple-700",
          badgeBg: "bg-purple-100",
          badgeBorder: "border-purple-900",
        }
      case "VIP":
        return {
          headerBg: "bg-blue-50",
          headerBorder: "border-blue-900",
          headerText: "text-blue-900",
          border: "border-blue-900",
          accentText: "text-blue-900",
          labelText: "text-blue-700",
          badgeBg: "bg-blue-100",
          badgeBorder: "border-blue-900",
        }
      case "Special Envoy":
        return {
          headerBg: "bg-amber-50",
          headerBorder: "border-amber-900",
          headerText: "text-amber-900",
          border: "border-amber-900",
          accentText: "text-amber-900",
          labelText: "text-amber-700",
          badgeBg: "bg-amber-100",
          badgeBorder: "border-amber-900",
        }
      default:
        return {
          headerBg: "bg-orange-50",
          headerBorder: "border-red-900",
          headerText: "text-red-900",
          border: "border-red-900",
          accentText: "text-red-900",
          labelText: "text-orange-700",
          badgeBg: "bg-amber-100",
          badgeBorder: "border-orange-900",
        }
    }
  }

  const colors = getColorScheme()
  const issueDate = new Date(issueTimestamp)

  return (
    <div className="visa-sticker relative" style={isPrint ? { pageBreakAfter: "always" } : undefined}>
      <div className={`absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 ${colors.border} z-10`} />
      <div className={`absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 ${colors.border} z-10`} />
      <div className={`absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 ${colors.border} z-10`} />
      <div className={`absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 ${colors.border} z-10`} />

      <div className={`w-full h-full rounded-lg border-4 overflow-hidden bg-white ${colors.border} shadow-lg flex flex-col`}>
        <div className={`${colors.headerBg} px-4 py-3 border-b-2 ${colors.headerBorder}`}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className={`text-[9px] font-bold tracking-wider ${colors.headerText} uppercase leading-tight`}>
                RATION CLUB BORDER AUTHORITY
              </h3>
              <p className={`text-[7px] ${colors.labelText} mt-0.5 leading-tight`}>sponsored by Sparkle Bureaucracy</p>
              <p className={`text-[7px] ${colors.labelText} mt-0.5 uppercase tracking-wide leading-tight`}>IMMIGRATION TERMINAL</p>
            </div>
            <div className="text-sm">✦</div>
          </div>
        </div>

        <div className="px-4 pt-3 pb-2 space-y-2.5">
          <div className={`flex justify-between items-start pb-2 border-b ${colors.border}`}>
            <div>
              <p className={`text-[7px] ${colors.labelText} uppercase tracking-wide`}>Visa Class</p>
              <p className={`text-sm font-bold ${colors.accentText} leading-tight`}>{effectiveVisaClass}</p>
            </div>
            <div className="text-right">
              <p className={`text-[7px] ${colors.labelText} uppercase tracking-wide`}>Visa No.</p>
              <p className={`text-sm font-mono font-bold ${colors.accentText} leading-tight`}>{visaNumber}</p>
            </div>
          </div>

          <div className={`flex gap-3 pb-2 border-b ${colors.border}`}>
            <div className={`w-11 h-14 border ${colors.border} bg-slate-50 flex items-center justify-center overflow-hidden rounded`}>
              {guest.photo ? (
                <img src={guest.photo} alt={guest.name} className="w-full h-full object-cover object-center" />
              ) : (
                <div className={`text-xs font-bold ${colors.accentText}`}>{getGuestInitials(guest.name)}</div>
              )}
            </div>

            <div className="flex-1 space-y-1.5 min-w-0">
              <div>
                <p className={`text-[7px] ${colors.labelText} uppercase tracking-wide`}>Guest Name</p>
                <p className={`text-[10px] font-bold ${colors.accentText} truncate`} title={guest.name}>
                  {guest.name}
                </p>
              </div>
              <div>
                <p className={`text-[7px] ${colors.labelText} uppercase tracking-wide`}>Agent Code</p>
                <p className={`text-[9px] font-mono ${colors.accentText} truncate`} title={guest.agentCode}>
                  {guest.agentCode}
                </p>
              </div>
              <div>
                <p className={`text-[7px] ${colors.labelText} uppercase tracking-wide`}>Status Level</p>
                <p className={`text-[9px] font-semibold ${colors.accentText}`}>{guest.status}</p>
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-2 gap-2 pb-2 border-b ${colors.border}`}>
            <div>
              <p className={`text-[7px] ${colors.labelText} uppercase tracking-wide mb-1`}>Purpose</p>
              <div className="space-y-0.5">
                {purposes.map((purpose, i) => (
                  <p key={i} className={`text-[9px] ${colors.accentText} leading-tight truncate`}>• {purpose}</p>
                ))}
              </div>
            </div>
            <div>
              <p className={`text-[7px] ${colors.labelText} uppercase tracking-wide mb-1`}>Declarations</p>
              <div className="space-y-0.5">
                {declarations.map((declaration, i) => (
                  <p key={i} className={`text-[9px] ${colors.accentText} leading-tight truncate`}>• {declaration}</p>
                ))}
              </div>
            </div>
          </div>

          {privileges.length > 0 && (
            <div className={`pb-2 border-b ${colors.border}`}>
              <p className={`text-[7px] ${colors.labelText} uppercase tracking-wide mb-1`}>Privileges Granted</p>
              <div className="flex flex-wrap gap-1">
                {privileges.map((privilege) => (
                  <span
                    key={privilege}
                    className={`text-[7px] ${colors.badgeBg} ${colors.accentText} px-1.5 py-0.5 rounded border ${colors.badgeBorder} font-medium leading-tight`}
                  >
                    {privilege}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1" />

        <div className="px-4 pb-3 space-y-1">
          <p className={`text-[7px] ${colors.labelText} text-center`}>{visaCopy}</p>
          <div className="flex justify-between items-end">
            <div className={`text-[7px] ${colors.labelText} font-mono`}>
              <p>Issued: {formatDate(issueDate)}</p>
              <p>Valid: {guest.validityMinutes} minutes</p>
            </div>
            <p className={`text-[7px] ${colors.accentText} font-semibold`}>Border Officer</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Print-specific styles: only the visa prints, fit to A6 portrait, no app chrome
export const visaPrintStyles = `
  @media print {
    @page {
      size: 105mm 148mm;
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
      width: 105mm !important;
      height: 148mm !important;
      margin: 0 !important;
      padding: 0 !important;
      background: white !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      page-break-after: avoid;
    }
    
    .visa-print-container > * {
      width: 105mm !important;
      height: 148mm !important;
      flex-shrink: 0 !important;
    }

    .visa-sticker {
      width: 105mm !important;
      height: 148mm !important;
      box-shadow: none !important;
    }
  }

  .visa-sticker {
    width: 105mm;
    height: 148mm;
  }
`