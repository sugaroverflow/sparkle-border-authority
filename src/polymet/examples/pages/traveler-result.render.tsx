import { BrowserRouter } from "react-router-dom"
import { TravelerResult } from "@/polymet/pages/traveler-result"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"

export default function TravelerResultRender() {
  return (
    <BrowserRouter>
      <KioskLayout>
        <TravelerResult />
      </KioskLayout>
    </BrowserRouter>
  )
}