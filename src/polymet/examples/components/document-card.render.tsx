import { BrowserRouter } from "react-router-dom"
import { DocumentCard, DocumentStamp } from "@/polymet/components/document-card"

export default function DocumentCardRender() {
  return (
    <BrowserRouter>
      <div className="p-8 space-y-12 bg-slate-950 min-h-screen">
        <div>
          <h2 className="text-xl font-bold mb-6 text-white">Document Types</h2>
          <div className="grid grid-cols-2 gap-8">
            <DocumentCard
              documentType="citizen-passport"
              travelerName="Alex Starfield"
              size="md"
            />
            <DocumentCard
              documentType="border-passport"
              travelerName="Jordan Cosmos"
              size="md"
            />
            <DocumentCard
              documentType="visitor-passcard"
              travelerName="Sam Nebula"
              size="md"
            />
            <DocumentCard
              documentType="photo-permit"
              travelerName="Riley Galaxy"
              size="md"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6 text-white">Document Sizes</h2>
          <div className="flex flex-wrap gap-8 items-end">
            <DocumentCard
              documentType="citizen-passport"
              travelerName="Alex Starfield"
              size="sm"
            />
            <DocumentCard
              documentType="border-passport"
              travelerName="Jordan Cosmos"
              size="md"
            />
            <DocumentCard
              documentType="visitor-passcard"
              travelerName="Sam Nebula"
              size="lg"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6 text-white">Document Stamps</h2>
          <div className="flex gap-8 bg-slate-900 p-8 rounded-lg">
            <DocumentStamp status="approved" />
            <DocumentStamp status="issued" />
            <DocumentStamp status="verified" />
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}