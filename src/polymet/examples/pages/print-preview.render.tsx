import { BrowserRouter } from "react-router-dom"
import { PrintPreview } from "@/polymet/pages/print-preview"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"

export default function PrintPreviewRender() {
  return (
    <BrowserRouter>
      <KioskLayout>
        <PrintPreview />
      </KioskLayout>
    </BrowserRouter>
  )
}