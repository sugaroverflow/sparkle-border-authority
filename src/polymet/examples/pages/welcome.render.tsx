import { BrowserRouter } from "react-router-dom"
import { Welcome } from "@/polymet/pages/welcome"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"

export default function WelcomeRender() {
  return (
    <BrowserRouter>
      <KioskLayout>
        <Welcome />
      </KioskLayout>
    </BrowserRouter>
  )
}