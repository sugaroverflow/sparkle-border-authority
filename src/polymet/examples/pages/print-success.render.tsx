import { BrowserRouter } from "react-router-dom"
import { PrintSuccess } from "@/polymet/pages/print-success"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"

export default function PrintSuccessRender() {
  return (
    <BrowserRouter>
      <KioskLayout>
        <PrintSuccess />
      </KioskLayout>
    </BrowserRouter>
  )
}