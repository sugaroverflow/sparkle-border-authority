import { BrowserRouter } from "react-router-dom"
import { Declarations } from "@/polymet/pages/declarations"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"

export default function DeclarationsRender() {
  return (
    <BrowserRouter>
      <KioskLayout>
        <Declarations />
      </KioskLayout>
    </BrowserRouter>
  )
}