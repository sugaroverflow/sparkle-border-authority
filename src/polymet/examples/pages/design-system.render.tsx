import { BrowserRouter } from "react-router-dom"
import { DesignSystem } from "@/polymet/pages/design-system"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"

export default function DesignSystemRender() {
  return (
    <BrowserRouter>
      <KioskLayout>
        <DesignSystem />
      </KioskLayout>
    </BrowserRouter>
  )
}