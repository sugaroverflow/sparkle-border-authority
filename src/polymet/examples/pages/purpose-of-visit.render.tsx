import { BrowserRouter } from "react-router-dom"
import { PurposeOfVisit } from "@/polymet/pages/purpose-of-visit"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"

export default function PurposeOfVisitRender() {
  return (
    <BrowserRouter>
      <KioskLayout>
        <PurposeOfVisit />
      </KioskLayout>
    </BrowserRouter>
  )
}