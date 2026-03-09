import { BrowserRouter } from "react-router-dom"
import { Processing } from "@/polymet/pages/processing"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"

export default function ProcessingRender() {
  return (
    <BrowserRouter>
      <KioskLayout>
        <Processing />
      </KioskLayout>
    </BrowserRouter>
  )
}