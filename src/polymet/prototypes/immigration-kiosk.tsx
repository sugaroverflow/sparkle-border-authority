import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"
import { Welcome } from "@/polymet/pages/welcome"
import { CodeEntry } from "@/polymet/pages/code-entry"
import { IdentityConfirmation } from "@/polymet/pages/identity-confirmation"
import { PurposeOfVisit } from "@/polymet/pages/purpose-of-visit"
import { Declarations } from "@/polymet/pages/declarations"
import { Processing } from "@/polymet/pages/processing"
import { SecondaryScreening } from "@/polymet/pages/secondary-screening"
import { Decision } from "@/polymet/pages/decision"
import { PrintPreview } from "@/polymet/pages/print-preview"
import { PrintSuccess } from "@/polymet/pages/print-success"
import { BorderCheckpoint } from "@/polymet/pages/border-checkpoint"
import { AdminPanel } from "@/polymet/pages/admin-panel"
import { StatisticsDashboard } from "@/polymet/pages/statistics-dashboard"
import { initializeImmigrationData } from "@/polymet/data/immigration-data"

export default function ImmigrationKiosk() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initializeImmigrationData().finally(() => setReady(true))
  }, [])

  if (!ready) {
    return (
      <div className="min-h-screen bg-slate-950 text-purple-100 flex items-center justify-center">
        Loading immigration registry...
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        {/* Main Application Flow */}
        <Route path="/" element={<KioskLayout><Welcome /></KioskLayout>} />
        <Route path="/code-entry" element={<KioskLayout><CodeEntry /></KioskLayout>} />
        <Route path="/identity-confirmation" element={<KioskLayout><IdentityConfirmation /></KioskLayout>} />
        <Route path="/purpose-of-visit" element={<KioskLayout><PurposeOfVisit /></KioskLayout>} />
        <Route path="/declarations" element={<KioskLayout><Declarations /></KioskLayout>} />
        <Route path="/processing" element={<KioskLayout><Processing /></KioskLayout>} />
        <Route path="/secondary-screening" element={<KioskLayout><SecondaryScreening /></KioskLayout>} />
        <Route path="/decision" element={<KioskLayout><Decision /></KioskLayout>} />
        <Route path="/print-preview" element={<KioskLayout><PrintPreview /></KioskLayout>} />
        <Route path="/print-success" element={<KioskLayout><PrintSuccess /></KioskLayout>} />
        
        {/* Additional Pages */}
        <Route path="/border-checkpoint" element={<KioskLayout><BorderCheckpoint /></KioskLayout>} />
        <Route path="/admin" element={<KioskLayout><AdminPanel /></KioskLayout>} />
        <Route path="/statistics-dashboard" element={<KioskLayout><StatisticsDashboard /></KioskLayout>} />
      </Routes>
    </Router>
  )
}