import { BrowserRouter } from "react-router-dom"
import { SecondaryScreening } from "@/polymet/pages/secondary-screening"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"

export default function SecondaryScreeningRender() {
  return (
    <BrowserRouter>
      <KioskLayout>
        <SecondaryScreening />
      </KioskLayout>
    </BrowserRouter>
  )
}