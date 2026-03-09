import { BrowserRouter } from "react-router-dom"
import { TerminalFrame, ScanBrackets } from "@/polymet/components/terminal-frame"

export default function TerminalFrameRender() {
  return (
    <BrowserRouter>
      <div className="p-8 space-y-8 bg-slate-950 min-h-screen">
        <div className="grid grid-cols-2 gap-6">
          <TerminalFrame title="Default Terminal" subtitle="Standard border control panel">
            <p className="text-purple-100">This is a default terminal frame with corner brackets and subtle glow.</p>
          </TerminalFrame>

          <TerminalFrame 
            title="Accent Terminal" 
            subtitle="Highlighted panel"
            variant="accent"
            glowEffect
          >
            <p className="text-purple-100">This terminal has an accent variant with enhanced glow effect.</p>
          </TerminalFrame>

          <TerminalFrame 
            title="Success Status" 
            variant="success"
            glowEffect
          >
            <p className="text-emerald-100">Authorization granted. Proceed to next checkpoint.</p>
          </TerminalFrame>

          <TerminalFrame 
            title="Warning Status" 
            variant="warning"
            glowEffect
          >
            <p className="text-amber-100">Additional verification required.</p>
          </TerminalFrame>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6 text-white">Scan Brackets</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="relative h-48 bg-slate-900 rounded-lg flex items-center justify-center">
              <ScanBrackets size="sm" />
              <p className="text-purple-100 text-sm">Small</p>
            </div>
            <div className="relative h-48 bg-slate-900 rounded-lg flex items-center justify-center">
              <ScanBrackets size="md" animate />
              <p className="text-purple-100 text-sm">Medium (Animated)</p>
            </div>
            <div className="relative h-48 bg-slate-900 rounded-lg flex items-center justify-center">
              <ScanBrackets size="lg" />
              <p className="text-purple-100 text-sm">Large</p>
            </div>
          </div>
        </div>

        <TerminalFrame 
          title="No Corner Brackets" 
          subtitle="Clean variant"
          cornerBrackets={false}
          className="max-w-2xl"
        >
          <p className="text-purple-100">This frame variant removes the corner brackets for a cleaner look.</p>
        </TerminalFrame>
      </div>
    </BrowserRouter>
  )
}