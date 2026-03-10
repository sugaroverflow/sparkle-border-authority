import { Suspense, lazy, useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"
import { initializeImmigrationData } from "@/polymet/data/immigration-data"

const Welcome = lazy(() => import("@/polymet/pages/welcome").then((m) => ({ default: m.Welcome })))
const CodeEntry = lazy(() => import("@/polymet/pages/code-entry").then((m) => ({ default: m.CodeEntry })))
const IdentityConfirmation = lazy(() =>
  import("@/polymet/pages/identity-confirmation").then((m) => ({ default: m.IdentityConfirmation }))
)
const PurposeOfVisit = lazy(() =>
  import("@/polymet/pages/purpose-of-visit").then((m) => ({ default: m.PurposeOfVisit }))
)
const Declarations = lazy(() => import("@/polymet/pages/declarations").then((m) => ({ default: m.Declarations })))
const Processing = lazy(() => import("@/polymet/pages/processing").then((m) => ({ default: m.Processing })))
const SecondaryScreening = lazy(() =>
  import("@/polymet/pages/secondary-screening").then((m) => ({ default: m.SecondaryScreening }))
)
const Decision = lazy(() => import("@/polymet/pages/decision").then((m) => ({ default: m.Decision })))
const PrintPreview = lazy(() => import("@/polymet/pages/print-preview").then((m) => ({ default: m.PrintPreview })))
const PrintSuccess = lazy(() => import("@/polymet/pages/print-success").then((m) => ({ default: m.PrintSuccess })))
const BorderCheckpoint = lazy(() =>
  import("@/polymet/pages/border-checkpoint").then((m) => ({ default: m.BorderCheckpoint }))
)
const VisitorSignup = lazy(() => import("@/polymet/pages/visitor-signup").then((m) => ({ default: m.VisitorSignup })))
const AdminPanel = lazy(() => import("@/polymet/pages/admin-panel").then((m) => ({ default: m.AdminPanel })))
const StatisticsDashboard = lazy(() =>
  import("@/polymet/pages/statistics-dashboard").then((m) => ({ default: m.StatisticsDashboard }))
)

function RouteShell({ children }: { children: React.ReactNode }) {
  return (
    <KioskLayout>
      <Suspense
        fallback={
          <div className="min-h-[calc(100vh-200px)] flex items-center justify-center text-purple-200">
            Loading screen...
          </div>
        }
      >
        {children}
      </Suspense>
    </KioskLayout>
  )
}

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
        <Route path="/" element={<RouteShell><Welcome /></RouteShell>} />
        <Route path="/code-entry" element={<RouteShell><CodeEntry /></RouteShell>} />
        <Route path="/visitor-application" element={<RouteShell><CodeEntry /></RouteShell>} />
        <Route path="/visitor-signup" element={<RouteShell><VisitorSignup /></RouteShell>} />
        <Route path="/identity-confirmation" element={<RouteShell><IdentityConfirmation /></RouteShell>} />
        <Route path="/purpose-of-visit" element={<RouteShell><PurposeOfVisit /></RouteShell>} />
        <Route path="/declarations" element={<RouteShell><Declarations /></RouteShell>} />
        <Route path="/processing" element={<RouteShell><Processing /></RouteShell>} />
        <Route path="/secondary-screening" element={<RouteShell><SecondaryScreening /></RouteShell>} />
        <Route path="/decision" element={<RouteShell><Decision /></RouteShell>} />
        <Route path="/print-preview" element={<RouteShell><PrintPreview /></RouteShell>} />
        <Route path="/print-success" element={<RouteShell><PrintSuccess /></RouteShell>} />
        
        {/* Additional Pages */}
        <Route path="/border-checkpoint" element={<RouteShell><BorderCheckpoint /></RouteShell>} />
        <Route path="/admin" element={<RouteShell><AdminPanel /></RouteShell>} />
        <Route path="/statistics-dashboard" element={<RouteShell><StatisticsDashboard /></RouteShell>} />
      </Routes>
    </Router>
  )
}