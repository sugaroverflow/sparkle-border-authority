import { BrowserRouter } from "react-router-dom"
import { Printing } from "@/polymet/pages/printing"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"

export default function PrintingRender() {
  return (
    <BrowserRouter>
      <KioskLayout>
        <Printing />
      </KioskLayout>
    </BrowserRouter>
  )
}