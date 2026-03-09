import { BrowserRouter } from "react-router-dom"
import { AdminPanel } from "@/polymet/pages/admin-panel"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"

export default function AdminPanelRender() {
  return (
    <BrowserRouter>
      <KioskLayout>
        <AdminPanel />
      </KioskLayout>
    </BrowserRouter>
  )
}