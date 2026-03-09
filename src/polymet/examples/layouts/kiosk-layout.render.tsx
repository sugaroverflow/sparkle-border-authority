import { BrowserRouter } from "react-router-dom"
import { KioskLayout } from "@/polymet/layouts/kiosk-layout"
import { Skeleton } from "@/components/ui/skeleton"

export default function KioskLayoutRender() {
  return (
    <BrowserRouter>
      <KioskLayout>
        <div className="space-y-6">
          <Skeleton className="h-12 w-96 bg-purple-500/20" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-48 w-full bg-purple-500/20" />
            <Skeleton className="h-48 w-full bg-purple-500/20" />
            <Skeleton className="h-48 w-full bg-purple-500/20" />
          </div>
          <Skeleton className="h-96 w-full bg-purple-500/20" />
        </div>
      </KioskLayout>
    </BrowserRouter>
  )
}