import { ReactNode } from "react"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { StarField } from "@/polymet/components/sparkle-effect"
import { cn } from "@/lib/utils"

interface KioskLayoutProps {
  children: ReactNode
  showHeader?: boolean
  className?: string
}

export function KioskLayout({ children, showHeader = true, className }: KioskLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Reset kiosk to welcome if no interaction for 3 minutes.
    if (location.pathname === "/" || location.pathname === "/admin") {
      return
    }

    let timeout: ReturnType<typeof setTimeout>
    const resetTimer = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => navigate("/"), 180000)
    }

    const events: Array<keyof WindowEventMap> = ["pointerdown", "keydown", "touchstart", "mousemove"]
    events.forEach((eventName) => window.addEventListener(eventName, resetTimer))
    resetTimer()

    return () => {
      clearTimeout(timeout)
      events.forEach((eventName) => window.removeEventListener(eventName, resetTimer))
    }
  }, [location.pathname, navigate])

  return (
    <div className="dark min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Star Field Background */}
      <StarField density="medium" />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-pink-900/10 pointer-events-none" />
      
      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        {showHeader && (
          <header className="border-b border-purple-400/20 bg-slate-950/50 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-purple-100 tracking-wider uppercase">
                    Ration Club Border Authority
                  </h1>
                  <p className="text-xs text-purple-400/60 mt-0.5 font-normal normal-case tracking-normal">
                    sponsored by Sparkle Beaurocracy
                  </p>
                  <p className="text-sm text-purple-300/70 mt-1">
                    Immigration Terminal System
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm text-purple-300 font-mono">ONLINE</span>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Main Content */}
        <main className={cn("flex-1 container mx-auto px-6 py-8", className)}>
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-purple-400/20 bg-slate-950/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between text-sm text-purple-300/70">
              <p>
                © 2024 Ration Club Border Authority
                <span className="text-xs text-purple-400/50 ml-1">sponsored by Sparkle Beaurocracy</span>
              </p>
              <p className="font-mono">v1.0.0</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Corner Accent Lines */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-purple-400/20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-purple-400/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-purple-400/20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-purple-400/20 pointer-events-none" />
    </div>
  )
}