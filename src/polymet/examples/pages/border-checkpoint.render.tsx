import { BrowserRouter } from "react-router-dom"
import { BorderCheckpoint } from "@/polymet/pages/border-checkpoint"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"

export default function BorderCheckpointRender() {
  return (
    <BrowserRouter>
      <KioskLayout>
        <BorderCheckpoint />
      </KioskLayout>
    </BrowserRouter>
  )
}