import { BrowserRouter } from "react-router-dom"
import { ScanFrame, ScanButton } from "@/polymet/components/scan-frame"
import { useState } from "react"

export default function ScanFrameRender() {
  const [isScanning1, setIsScanning1] = useState(false)
  const [isScanning2, setIsScanning2] = useState(true)

  return (
    <BrowserRouter>
      <div className="p-8 space-y-12 bg-slate-950 min-h-screen">
        <div>
          <h2 className="text-xl font-bold mb-6 text-white">Scan Frame Sizes</h2>
          <div className="flex flex-wrap gap-12 items-end">
            <div>
              <p className="text-sm text-gray-400 mb-4">Small</p>
              <ScanFrame size="sm" />
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-4">Medium</p>
              <ScanFrame size="md" />
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-4">Large</p>
              <ScanFrame size="lg" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6 text-white">Scanning States</h2>
          <div className="flex flex-wrap gap-12">
            <div>
              <p className="text-sm text-gray-400 mb-4">Idle State</p>
              <ScanFrame size="md" isScanning={isScanning1} />
              <div className="mt-8">
                <ScanButton 
                  onClick={() => setIsScanning1(!isScanning1)}
                >
                  {isScanning1 ? "Stop Scanning" : "Start Scanning"}
                </ScanButton>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-4">Active Scanning</p>
              <ScanFrame size="md" isScanning={isScanning2} />
              <div className="mt-8">
                <ScanButton 
                  onClick={() => setIsScanning2(!isScanning2)}
                >
                  {isScanning2 ? "Stop Scanning" : "Start Scanning"}
                </ScanButton>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6 text-white">Scan Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <ScanButton />
            <ScanButton disabled>
              Disabled
            </ScanButton>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}