import { BrowserRouter } from "react-router-dom"
import { SparkleEffect, StarField } from "@/polymet/components/sparkle-effect"

export default function SparkleEffectRender() {
  return (
    <BrowserRouter>
      <div className="p-8 space-y-12 bg-slate-900 min-h-screen">
        <div>
          <h2 className="text-xl font-bold mb-6 text-white">Sparkle Variants</h2>
          <div className="flex gap-8 items-center">
            <div className="text-center">
              <SparkleEffect variant="sparkles" size="sm" />
              <p className="text-xs text-gray-400 mt-2">Small Sparkles</p>
            </div>
            <div className="text-center">
              <SparkleEffect variant="sparkles" size="md" />
              <p className="text-xs text-gray-400 mt-2">Medium Sparkles</p>
            </div>
            <div className="text-center">
              <SparkleEffect variant="sparkles" size="lg" />
              <p className="text-xs text-gray-400 mt-2">Large Sparkles</p>
            </div>
            <div className="text-center">
              <SparkleEffect variant="stars" size="md" />
              <p className="text-xs text-gray-400 mt-2">Stars</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6 text-white">Glow Effect</h2>
          <div className="flex gap-8">
            <div className="w-32 h-32 bg-slate-800 rounded-lg relative overflow-hidden">
              <SparkleEffect variant="glow" className="w-full h-full" />
            </div>
            <div className="w-32 h-32 bg-slate-800 rounded-lg relative overflow-hidden">
              <SparkleEffect variant="glow" className="w-20 h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6 text-white">Star Field Backgrounds</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="relative h-48 bg-slate-800 rounded-lg overflow-hidden">
              <StarField density="low" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-white text-sm">Low Density</p>
              </div>
            </div>
            <div className="relative h-48 bg-slate-800 rounded-lg overflow-hidden">
              <StarField density="medium" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-white text-sm">Medium Density</p>
              </div>
            </div>
            <div className="relative h-48 bg-slate-800 rounded-lg overflow-hidden">
              <StarField density="high" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-white text-sm">High Density</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}