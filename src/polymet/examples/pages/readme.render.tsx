import { BrowserRouter } from "react-router-dom"
import { Readme } from "@/polymet/pages/readme"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"

export default function ReadmeRender() {
  return (
    <BrowserRouter>
      <KioskLayout>
        <Readme />
      </KioskLayout>
    </BrowserRouter>
  )
}