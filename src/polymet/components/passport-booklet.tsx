export interface PassportBookletProps {
  guestName: string
  guestCode: string
  passportType: "diplomatic" | "visa-on-arrival" | "standard"
  status: "Visitor" | "Diplomat" | "VIP" | "Special Envoy" | "Citizen"
  photo?: string
  issueDate?: string
  size?: "preview" | "print"
}

export function PassportBooklet({
  guestName,
  guestCode,
  passportType,
  status,
  photo,
  issueDate = new Date().toLocaleDateString(),
  size = "preview",
}: PassportBookletProps) {
  const isPrint = size === "print"
  const scale = isPrint ? 1 : 0.5

  const getCoverStyles = () => {
    switch (passportType) {
      case "diplomatic":
        return {
          bg: "bg-white",
          border: "border-purple-900",
          text: "text-slate-900",
          emblemBg: "bg-purple-50",
          emblemBorder: "border-purple-900",
          accentColor: "text-purple-600",
        }
      case "visa-on-arrival":
        return {
          bg: "bg-white",
          border: "border-slate-900",
          text: "text-slate-900",
          emblemBg: "bg-slate-100",
          emblemBorder: "border-slate-900",
          accentColor: "text-slate-600",
        }
      default:
        return {
          bg: "bg-white",
          border: "border-purple-900",
          text: "text-slate-900",
          emblemBg: "bg-purple-50",
          emblemBorder: "border-purple-900",
          accentColor: "text-purple-600",
        }
    }
  }

  const coverStyles = getCoverStyles()
  const placeholderPhoto = !photo ? guestName.trim().charAt(0).toUpperCase() : null

  return (
    <div
      className="passport-booklet"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >
      <div className={`passport-page passport-cover ${coverStyles.bg} ${coverStyles.text} border-4 ${coverStyles.border}`}>
        <div className="passport-page-inner relative">
          <div className={`absolute top-6 left-6 w-12 h-12 border-l-4 border-t-4 ${coverStyles.border}`} />
          <div className={`absolute top-6 right-6 w-12 h-12 border-r-4 border-t-4 ${coverStyles.border}`} />
          <div className={`absolute bottom-6 left-6 w-12 h-12 border-l-4 border-b-4 ${coverStyles.border}`} />
          <div className={`absolute bottom-6 right-6 w-12 h-12 border-r-4 border-b-4 ${coverStyles.border}`} />

          {passportType !== "visa-on-arrival" && (
            <>
              <div className={`absolute top-10 right-10 text-3xl ${coverStyles.accentColor}`}>*</div>
              <div className={`absolute bottom-10 left-10 text-3xl ${coverStyles.accentColor}`}>*</div>
            </>
          )}

          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <div className={`w-24 h-24 rounded-full border-4 ${coverStyles.emblemBorder} flex items-center justify-center ${coverStyles.emblemBg}`}>
              <div className="text-5xl">{passportType === "visa-on-arrival" ? "T" : "*"}</div>
            </div>

            <div className="text-center space-y-3">
              <h1 className={`text-3xl font-bold tracking-wider ${coverStyles.text}`}>RATION CLUB</h1>
              <p className={`text-xl tracking-widest ${coverStyles.text}`}>BORDER AUTHORITY</p>
              <p className={`text-xs tracking-wider ${coverStyles.accentColor} mt-2`}>sponsored by Sparkle Bureaucracy</p>
            </div>

            <div className="text-center mt-4">
              <p className={`text-sm uppercase tracking-wider font-bold ${coverStyles.accentColor}`}>
                {passportType === "diplomatic" && "Diplomatic Passport"}
                {passportType === "visa-on-arrival" && "Visa on Arrival"}
                {passportType === "standard" && "Travel Document"}
              </p>
            </div>

            <div className="text-center mt-12">
              <p className={`text-xs ${coverStyles.accentColor} mb-2`}>Document No.</p>
              <p className={`text-xl font-mono tracking-widest ${coverStyles.text}`}>{guestCode}</p>
            </div>
          </div>

          <div className="absolute bottom-10 left-0 right-0 text-center">
            <p className={`text-xs ${coverStyles.accentColor} tracking-wider`}>OFFICIAL TRAVEL DOCUMENT</p>
          </div>

          {passportType !== "diplomatic" && (
            <>
              <div className={`absolute top-20 left-0 right-0 h-px ${passportType === "visa-on-arrival" ? "bg-slate-300" : "bg-purple-300"}`} />
              <div className={`absolute bottom-20 left-0 right-0 h-px ${passportType === "visa-on-arrival" ? "bg-slate-300" : "bg-purple-300"}`} />
            </>
          )}
        </div>
      </div>

      <div className="passport-page bg-white text-slate-900">
        <div className="passport-page-inner">
          <div className="border-b-2 border-purple-900 pb-4 mb-8">
            <h2 className="text-xl font-bold tracking-wide">ENTRY STAMPS</h2>
            <p className="text-xs text-slate-600 mt-1">Border Control Authorization</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border-2 border-dashed border-purple-300 rounded-lg p-6 min-h-[140px] flex items-center justify-center bg-purple-50/20"
              >
                <div className="text-center">
                  <div className="text-4xl text-purple-300 mb-2">*</div>
                  <p className="text-xs text-slate-400 font-mono">STAMP AREA</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t-2 border-slate-300">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 mb-2">Bearer Signature:</p>
                <div className="border-b-2 border-slate-300 h-12"></div>
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <p className="font-bold">UNAUTHORIZED USE PROHIBITED</p>
                <p>This document is property of Ration Club Border Authority. Unauthorized use, alteration, or duplication may result in immediate revocation of travel privileges.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="passport-page bg-white text-slate-900">
        <div className="passport-page-inner flex flex-col">
          <div className="border-b-2 border-purple-900 pb-4 mb-6">
            <h2 className="text-xl font-bold tracking-wide">VISA AFFIXATION</h2>
            <p className="text-xs text-slate-600 mt-1">Entry Authorization Sticker</p>
          </div>

          <div className="flex-1 border-4 border-dashed border-purple-400 rounded-lg p-6 flex flex-col items-center justify-center bg-gradient-to-br from-purple-50/50 via-white to-pink-50/50 relative">
            <div className="absolute top-3 left-3 w-8 h-8 border-l-4 border-t-4 border-purple-500" />
            <div className="absolute top-3 right-3 w-8 h-8 border-r-4 border-t-4 border-purple-500" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-l-4 border-b-4 border-purple-500" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-r-4 border-b-4 border-purple-500" />

            <div className="text-center space-y-4 z-10">
              <div className="text-7xl text-purple-300">[]</div>
              <p className="text-base font-bold text-purple-900">AFFIX VISA STICKER HERE</p>
              <p className="text-sm text-slate-600 max-w-sm">
                Place the printed A6 visa authorization sticker within this area
              </p>
              <div className="mt-6 pt-6 border-t border-purple-300">
                <p className="text-xs text-slate-500 font-mono">A6 SIZE: 148mm x 105mm</p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-xs text-slate-600 space-y-1 bg-purple-50 p-3 rounded border border-purple-200">
            <p className="font-semibold text-purple-900 mb-2">IMPORTANT INSTRUCTIONS:</p>
            <p>- Visa must be affixed by authorized border control officer only</p>
            <p>- Do not remove or tamper with visa once affixed</p>
            <p>- Visa validity period begins upon affixation</p>
            <p>- Ensure sticker is aligned with corner guides</p>
          </div>
        </div>
      </div>

      <div className="passport-page bg-white text-slate-900 border-4 border-purple-900">
        <div className="passport-page-inner relative flex flex-col items-center justify-center">
          <div className="absolute top-8 left-8 text-4xl text-purple-600">*</div>
          <div className="absolute top-12 right-12 text-3xl text-purple-600">*</div>
          <div className="absolute bottom-16 left-16 text-3xl text-purple-600">*</div>
          <div className="absolute bottom-12 right-8 text-4xl text-purple-600">*</div>

          <div className="text-center space-y-8 max-w-md z-10">
            <div className="space-y-4">
              <div className="text-6xl text-purple-500">*</div>
              <p className="text-xl font-serif italic text-purple-900 leading-relaxed">
                "May the borders you cross welcome you, and your journeys end in laughter."
              </p>
            </div>

            <div className="pt-6 space-y-2">
              <p className="text-sm font-semibold text-purple-900">With lots of love!</p>
              <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Supreme Benevolent Dictator
              </p>
              <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                princess sugaroverflow
              </p>
            </div>

            <div className="pt-8 mt-8 border-t-2 border-purple-300">
              <p className="text-xs text-purple-700 tracking-wider uppercase">
                Sparkle Bureaucracy - Official Document
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .passport-booklet {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          width: fit-content;
        }

        .passport-page {
          width: 148mm;
          height: 210mm;
          padding: 0;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          page-break-inside: avoid;
        }

        .passport-page-inner {
          padding: 2rem;
          height: 100%;
          position: relative;
        }

        .passport-cover {
          position: relative;
          overflow: hidden;
        }

        @media print {
          .passport-booklet {
            transform: none !important;
            gap: 0;
          }

          .passport-page {
            box-shadow: none;
            page-break-after: always;
          }

          .passport-page:last-child {
            page-break-after: auto;
          }
        }

        @media screen {
          .passport-page {
            border-radius: 0.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export interface VisaStickerProps {
  guestName: string
  guestCode: string
  visaClass: string
  status: string
  purposes: string[]
  declarations: string[]
  privileges: string[]
  validityMinutes: number
  issueTimestamp: string
  visaNumber: string
  photo?: string
  size?: "preview" | "print"
}

export function VisaSticker({
  guestName,
  guestCode,
  visaClass,
  status,
  purposes,
  declarations,
  privileges,
  validityMinutes,
  issueTimestamp,
  visaNumber,
  photo,
  size = "preview",
}: VisaStickerProps) {
  const isPrint = size === "print"
  const scale = isPrint ? 1 : 0.5

  const issueDate = new Date(issueTimestamp)
  const expiryDate = new Date(issueDate.getTime() + validityMinutes * 60000)

  const formatDate = (date: Date) => {
    return (
      date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }) +
      " " +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    )
  }

  const getColorScheme = () => {
    switch (status) {
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
          headerBg: "bg-pink-50",
          headerBorder: "border-pink-900",
          headerText: "text-pink-900",
          border: "border-pink-900",
          accentText: "text-pink-900",
          labelText: "text-pink-700",
          badgeBg: "bg-pink-100",
          badgeBorder: "border-pink-900",
        }
    }
  }

  const colors = getColorScheme()
  const placeholderPhoto = !photo ? guestName.trim().charAt(0).toUpperCase() : null

  return (
    <div
      className="visa-sticker-container"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >
      <div className="visa-sticker relative">
        <div className={`absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 ${colors.border} z-10`} />
        <div className={`absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 ${colors.border} z-10`} />
        <div className={`absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 ${colors.border} z-10`} />
        <div className={`absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 ${colors.border} z-10`} />

        <div className={`w-full h-full rounded-lg border-4 overflow-hidden bg-white ${colors.border} shadow-lg`}>
          <div className={`${colors.headerBg} px-6 py-4 border-b-2 ${colors.headerBorder}`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className={`text-sm font-bold tracking-wider ${colors.headerText} uppercase`}>RATION CLUB BORDER AUTHORITY</h3>
                <p className={`text-xs ${colors.labelText} mt-1`}>sponsored by Sparkle Bureaucracy</p>
                <p className={`text-xs ${colors.labelText} mt-0.5 uppercase tracking-wide`}>IMMIGRATION TERMINAL</p>
              </div>
              <div className="text-3xl">*</div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className={`flex justify-between items-start pb-4 border-b-2 ${colors.border}`}>
              <div>
                <p className={`text-xs ${colors.labelText} uppercase tracking-wide`}>Visa Class</p>
                <p className={`text-base font-bold ${colors.accentText}`}>{visaClass}</p>
              </div>
              <div className="text-right">
                <p className={`text-xs ${colors.labelText} uppercase tracking-wide`}>Visa No.</p>
                <p className={`text-base font-mono font-bold ${colors.accentText}`}>{visaNumber}</p>
              </div>
            </div>

            <div className={`flex gap-4 pb-4 border-b-2 ${colors.border}`}>
              <div className="flex-shrink-0">
                <div className={`w-24 h-28 border-2 ${colors.border} bg-slate-50 flex items-center justify-center overflow-hidden rounded`}>
                  {photo ? (
                    <img src={photo} alt={guestName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-3xl font-semibold text-slate-600">{placeholderPhoto}</div>
                  )}
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <div>
                  <p className={`text-xs ${colors.labelText} uppercase tracking-wide`}>Guest Name</p>
                  <p className={`text-base font-bold ${colors.accentText}`}>{guestName}</p>
                </div>
                <div>
                  <p className={`text-xs ${colors.labelText} uppercase tracking-wide`}>Agent Code</p>
                  <p className={`text-sm font-mono ${colors.accentText}`}>{guestCode}</p>
                </div>
                <div>
                  <p className={`text-xs ${colors.labelText} uppercase tracking-wide`}>Status Level</p>
                  <p className={`text-sm font-semibold ${colors.accentText}`}>{status}</p>
                </div>
              </div>
            </div>

            <div className={`pb-4 border-b-2 ${colors.border}`}>
              <p className={`text-xs ${colors.labelText} uppercase tracking-wide mb-2`}>Purpose</p>
              <div className="space-y-1">
                {purposes.map((purpose, i) => (
                  <p key={i} className={`text-sm ${colors.accentText}`}>- {purpose}</p>
                ))}
              </div>
            </div>

            <div className={`pb-4 border-b-2 ${colors.border}`}>
              <p className={`text-xs ${colors.labelText} uppercase tracking-wide mb-2`}>Declarations</p>
              <div className="space-y-1">
                {declarations.map((declaration, i) => (
                  <p key={i} className={`text-sm ${colors.accentText}`}>- {declaration}</p>
                ))}
              </div>
            </div>

            {privileges.length > 0 && (
              <div className={`pb-4 border-b-2 ${colors.border}`}>
                <p className={`text-xs ${colors.labelText} uppercase tracking-wide mb-2`}>Privileges Granted</p>
                <div className="flex flex-wrap gap-2">
                  {privileges.map((privilege) => (
                    <span
                      key={privilege}
                      className={`text-xs ${colors.badgeBg} ${colors.accentText} px-2 py-1 rounded border ${colors.badgeBorder} font-medium`}
                    >
                      {privilege}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className={`space-y-2 text-xs pb-4 border-b-2 ${colors.border}`}>
              <div className="flex justify-between">
                <span className={colors.labelText}>Issued:</span>
                <span className={`font-mono ${colors.accentText}`}>{formatDate(issueDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className={colors.labelText}>Valid:</span>
                <span className={`font-mono ${colors.accentText}`}>{validityMinutes} minutes</span>
              </div>
              <div className="flex justify-between">
                <span className={colors.labelText}>Expires:</span>
                <span className={`font-mono ${colors.accentText}`}>{formatDate(expiryDate)}</span>
              </div>
            </div>

            <div className="text-center">
              <p className={`text-xs ${colors.labelText} mb-2`}>Party credentials verified and stamped.</p>
              <div className="flex justify-between items-center">
                <p className={`text-xs ${colors.labelText} font-mono`}>{formatDate(issueDate)}</p>
                <p className={`text-xs ${colors.accentText} font-semibold`}>Border Officer</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 opacity-5">
            <div className={`text-6xl ${colors.accentText}`}>*</div>
          </div>
        </div>
      </div>

      <style>{`
        .visa-sticker-container {
          width: fit-content;
        }

        .visa-sticker {
          width: 105mm;
          height: 148mm;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          page-break-inside: avoid;
          position: relative;
        }

        @media print {
          .visa-sticker-container {
            transform: none !important;
          }

          .visa-sticker {
            box-shadow: none;
          }
        }

        @media screen {
          .visa-sticker {
            border-radius: 0.5rem;
          }
        }
      `}</style>
    </div>
  )
}
