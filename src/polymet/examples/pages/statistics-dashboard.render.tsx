import { BrowserRouter } from "react-router-dom"
import { StatisticsDashboard } from "@/polymet/pages/statistics-dashboard"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"

export default function StatisticsDashboardRender() {
  return (
    <BrowserRouter>
      <KioskLayout>
        <StatisticsDashboard />
      </KioskLayout>
    </BrowserRouter>
  )
}