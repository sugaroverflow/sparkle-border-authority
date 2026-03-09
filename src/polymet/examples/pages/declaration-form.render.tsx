import { BrowserRouter } from "react-router-dom"
import { DeclarationForm } from "@/polymet/pages/declaration-form"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"

export default function DeclarationFormRender() {
  return (
    <BrowserRouter>
      <KioskLayout>
        <DeclarationForm />
      </KioskLayout>
    </BrowserRouter>
  )
}