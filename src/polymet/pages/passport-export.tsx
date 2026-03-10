import { PassportBooklet, VisaSticker } from "@/polymet/components/passport-booklet"
import { getAllGuests } from "@/polymet/data/immigration-data"
import { Button } from "@/components/ui/button"
import { PrinterIcon } from "lucide-react"

export function PassportExport() {
  const handlePrint = () => {
    window.print()
  }

  const allGuests = getAllGuests()
  const guests = allGuests.length > 0 ? allGuests : []
  const sampleGuest = guests[0]
  const diplomatGuest = guests.find((g) => g.status === "Diplomat") ?? sampleGuest
  const visitorGuest = guests.find((g) => g.status === "Visitor") ?? sampleGuest

  if (!sampleGuest || !diplomatGuest || !visitorGuest) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="max-w-lg w-full rounded-xl border border-slate-300 bg-white p-6 text-center">
          <p className="text-slate-900 font-semibold">No guest data available yet.</p>
          <p className="text-sm text-slate-600 mt-2">
            Open the kiosk home once to load guest registry, then return to this export page.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="no-print sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Passport &amp; Visa Export</h1>
              <p className="text-sm text-slate-600 mt-1">Print-ready documents for all guests</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handlePrint} size="lg" className="gap-2">
                <PrinterIcon className="w-5 h-5" />
                Print All Documents
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="no-print max-w-7xl mx-auto px-6 py-6">
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
            <PrinterIcon className="w-5 h-5" />
            Printing Instructions
          </h3>
          <div className="space-y-3 text-sm text-purple-900">
            <div>
              <p className="font-semibold mb-1">Passport Booklets:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Print on white A4 paper (210mm x 297mm)</li>
                <li>Fold in half horizontally to create 4-page booklet</li>
                <li>Pages: Front Cover | Inside Left (Stamps) | Inside Right (Visa) | Back Cover</li>
                <li>Staple along the fold if desired</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-1">Visa Stickers:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Print on A6 adhesive sheet (148mm x 105mm) or regular paper</li>
                <li>Cut along borders if using regular paper</li>
                <li>Affix to inside right page of passport booklet</li>
                <li>Align with corner guides on the affixation page</li>
              </ul>
            </div>
            <div className="pt-2 border-t border-purple-300">
              <p className="font-semibold">Tip:</p>
              <p>Use Cmd+P (Mac) or Ctrl+P (Windows) and enable print backgrounds for best results.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-16">
        <div className="document-section">
          <div className="no-print mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Diplomatic Passport</h2>
            <p className="text-sm text-slate-600 mt-1">{diplomatGuest.name} - {diplomatGuest.code}</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <PassportBooklet
              guestName={diplomatGuest.name}
              guestCode={diplomatGuest.code}
              passportType="diplomatic"
              status={diplomatGuest.status}
              photo={diplomatGuest.photo}
              size="preview"
            />
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg mt-8">
            <VisaSticker
              guestName={diplomatGuest.name}
              guestCode={diplomatGuest.code}
              visaClass={diplomatGuest.visaClass}
              status={diplomatGuest.status}
              purposes={["Birthday Diplomacy"]}
              declarations={["Sparkles", "Good Vibes"]}
              privileges={diplomatGuest.basePrivileges}
              validityMinutes={diplomatGuest.validityMinutes}
              issueTimestamp={new Date().toISOString()}
              visaNumber={`RC-2026-${diplomatGuest.code}`}
              photo={diplomatGuest.photo}
              size="preview"
            />
          </div>
        </div>

        <div className="page-break" />

        <div className="document-section">
          <div className="no-print mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Standard Passport</h2>
            <p className="text-sm text-slate-600 mt-1">{sampleGuest.name} - {sampleGuest.code}</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <PassportBooklet
              guestName={sampleGuest.name}
              guestCode={sampleGuest.code}
              passportType="standard"
              status={sampleGuest.status}
              photo={sampleGuest.photo}
              size="preview"
            />
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg mt-8">
            <VisaSticker
              guestName={sampleGuest.name}
              guestCode={sampleGuest.code}
              visaClass={sampleGuest.visaClass}
              status={sampleGuest.status}
              purposes={["Cake Acquisition"]}
              declarations={["Snacks"]}
              privileges={sampleGuest.basePrivileges}
              validityMinutes={sampleGuest.validityMinutes}
              issueTimestamp={new Date().toISOString()}
              visaNumber={`RC-2026-${sampleGuest.code}`}
              photo={sampleGuest.photo}
              size="preview"
            />
          </div>
        </div>

        <div className="page-break" />

        <div className="document-section">
          <div className="no-print mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Visa on Arrival</h2>
            <p className="text-sm text-slate-600 mt-1">{visitorGuest.name} - {visitorGuest.code}</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <PassportBooklet
              guestName={visitorGuest.name}
              guestCode={visitorGuest.code}
              passportType="visa-on-arrival"
              status={visitorGuest.status}
              photo={visitorGuest.photo}
              size="preview"
            />
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg mt-8">
            <VisaSticker
              guestName={visitorGuest.name}
              guestCode={visitorGuest.code}
              visaClass={visitorGuest.visaClass}
              status={visitorGuest.status}
              purposes={["Celebration"]}
              declarations={["Nothing to Declare"]}
              privileges={visitorGuest.basePrivileges}
              validityMinutes={visitorGuest.validityMinutes}
              issueTimestamp={new Date().toISOString()}
              visaNumber={`RC-2026-${visitorGuest.code}`}
              photo={visitorGuest.photo}
              size="preview"
            />
          </div>
        </div>

        <div className="page-break" />

        {guests.slice(3).map((guest, index) => (
          <div key={guest.code}>
            <div className="document-section">
              <div className="no-print mb-6">
                <h2 className="text-2xl font-bold text-slate-900">{guest.name}</h2>
                <p className="text-sm text-slate-600 mt-1">{guest.status} - {guest.code}</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <PassportBooklet
                  guestName={guest.name}
                  guestCode={guest.code}
                  passportType={guest.status === "Diplomat" ? "diplomatic" : guest.status === "Visitor" ? "visa-on-arrival" : "standard"}
                  status={guest.status}
                  photo={guest.photo}
                  size="preview"
                />
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg mt-8">
                <VisaSticker
                  guestName={guest.name}
                  guestCode={guest.code}
                  visaClass={guest.visaClass}
                  status={guest.status}
                  purposes={["Birthday Celebration"]}
                  declarations={["Good Vibes"]}
                  privileges={guest.basePrivileges}
                  validityMinutes={guest.validityMinutes}
                  issueTimestamp={new Date().toISOString()}
                  visaNumber={`RC-2026-${guest.code}`}
                  photo={guest.photo}
                  size="preview"
                />
              </div>
            </div>
            {index < guests.slice(3).length - 1 && <div className="page-break" />}
          </div>
        ))}
      </div>

      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }

          .page-break {
            page-break-before: always;
            break-before: page;
          }

          .document-section {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          body {
            background: white !important;
          }

          .bg-slate-100 {
            background: white !important;
          }
        }
      `}</style>
    </div>
  )
}
