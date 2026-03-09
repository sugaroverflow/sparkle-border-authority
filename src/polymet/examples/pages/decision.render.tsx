import { BrowserRouter } from "react-router-dom"
import { Decision } from "@/polymet/pages/decision"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"

export default function DecisionRender() {
  return (
    <BrowserRouter>
      <KioskLayout>
        <Decision />
      </KioskLayout>
    </BrowserRouter>
  )
}