import { BrowserRouter } from "react-router-dom"
import { StatusBadge, DocumentBadge } from "@/polymet/components/status-badge"

export default function StatusBadgeRender() {
  return (
    <BrowserRouter>
      <div className="p-8 space-y-12 bg-slate-950 min-h-screen">
        <div>
          <h2 className="text-xl font-bold mb-6 text-white">Status Badges</h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-400 mb-3">Small Size</p>
              <div className="flex flex-wrap gap-4">
                <StatusBadge status="authorized" size="sm" />
                <StatusBadge status="denied" size="sm" />
                <StatusBadge status="pending" size="sm" />
                <StatusBadge status="visitor" size="sm" />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-3">Medium Size (Default)</p>
              <div className="flex flex-wrap gap-4">
                <StatusBadge status="authorized" size="md" />
                <StatusBadge status="denied" size="md" />
                <StatusBadge status="pending" size="md" />
                <StatusBadge status="visitor" size="md" />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-3">Large Size</p>
              <div className="flex flex-wrap gap-4">
                <StatusBadge status="authorized" size="lg" />
                <StatusBadge status="denied" size="lg" />
                <StatusBadge status="pending" size="lg" />
                <StatusBadge status="visitor" size="lg" />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-3">With Sparkles</p>
              <div className="flex flex-wrap gap-4">
                <StatusBadge status="authorized" size="lg" showSparkles />
                <StatusBadge status="visitor" size="lg" showSparkles />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6 text-white">Document Badges</h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-400 mb-3">All Document Types</p>
              <div className="flex flex-wrap gap-4">
                <DocumentBadge documentType="citizen-passport" />
                <DocumentBadge documentType="border-passport" />
                <DocumentBadge documentType="visitor-passcard" />
                <DocumentBadge documentType="photo-permit" />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-3">Different Sizes</p>
              <div className="flex flex-wrap gap-4 items-center">
                <DocumentBadge documentType="citizen-passport" size="sm" />
                <DocumentBadge documentType="border-passport" size="md" />
                <DocumentBadge documentType="visitor-passcard" size="lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}