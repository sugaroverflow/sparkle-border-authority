import { BrowserRouter } from "react-router-dom"
import { DocumentIssuance } from "@/polymet/pages/document-issuance"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"

export default function DocumentIssuanceRender() {
  return (
    <BrowserRouter>
      <KioskLayout>
        <DocumentIssuance />
      </KioskLayout>
    </BrowserRouter>
  )
}