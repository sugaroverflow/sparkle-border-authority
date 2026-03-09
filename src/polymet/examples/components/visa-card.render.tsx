import { BrowserRouter } from "react-router-dom"
import { VisaCard } from "@/polymet/components/visa-card"
import { mockGuests } from "@/polymet/data/immigration-data"

export default function VisaCardRender() {
  const sampleGuest = mockGuests[0]
  const samplePurposes = ["Cake Acquisition", "Birthday Shenanigans"]
  const sampleDeclarations = ["Snacks", "Excellent Vibes"]
  const samplePrivileges = ["Cake Priority Queue", "Sparkle Clearance II", "Lounge Access"]

  return (
    <BrowserRouter>
      <div className="p-8 space-y-12 bg-slate-950 min-h-screen">
        <div>
          <h2 className="text-xl font-bold mb-6 text-white">Visa Card - Preview Size</h2>
          <div className="flex justify-center">
            <VisaCard
              guest={sampleGuest}
              visaNumber="AB-1234"
              purposes={samplePurposes}
              declarations={sampleDeclarations}
              privileges={samplePrivileges}
              issueTimestamp={new Date().toISOString()}
              visaCopy="Authorized for celebratory presence."
              size="preview"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6 text-white">Different Guest Statuses</h2>
          <div className="grid grid-cols-2 gap-6">
            {mockGuests.slice(0, 4).map((guest) => (
              <VisaCard
                key={guest.code}
                guest={guest}
                visaNumber={`${guest.code.slice(0, 2)}-${Math.floor(Math.random() * 9999).toString().padStart(4, "0")}`}
                purposes={["Birthday Shenanigans"]}
                declarations={["Excellent Vibes"]}
                privileges={guest.basePrivileges}
                issueTimestamp={new Date().toISOString()}
                size="preview"
              />
            ))}
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}