import { BrowserRouter } from "react-router-dom"
import { CodeEntry } from "@/polymet/pages/code-entry"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"

export default function CodeEntryRender() {
  return (
    <BrowserRouter>
      <KioskLayout>
        <CodeEntry />
      </KioskLayout>
    </BrowserRouter>
  )
}