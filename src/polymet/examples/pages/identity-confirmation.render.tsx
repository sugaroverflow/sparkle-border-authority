import { BrowserRouter } from "react-router-dom"
import { IdentityConfirmation } from "@/polymet/pages/identity-confirmation"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"

export default function IdentityConfirmationRender() {
  return (
    <BrowserRouter>
      <KioskLayout>
        <IdentityConfirmation />
      </KioskLayout>
    </BrowserRouter>
  )
}