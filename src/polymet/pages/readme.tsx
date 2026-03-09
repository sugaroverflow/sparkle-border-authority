import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { SparkleEffect } from "@/polymet/components/sparkle-effect"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { 
  HomeIcon, 
  FileTextIcon, 
  LayoutDashboardIcon, 
  ShieldCheckIcon,
  BookOpenIcon,
  SparklesIcon
} from "lucide-react"

export function Readme() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 py-8">
      {/* Header */}
      <div className="text-center space-y-4 relative">
        <SparkleEffect variant="sparkles" size="lg" className="absolute -top-4 left-1/4" />
        <SparkleEffect variant="sparkles" size="lg" className="absolute -top-4 right-1/4" />
        
        <h1 className="text-5xl font-bold text-purple-100 tracking-wider uppercase">
          Immigration Kiosk
        </h1>
        <h2 className="text-2xl font-bold text-pink-300 tracking-wider uppercase">
          Ration Club Border Authority
        </h2>
        <p className="text-purple-300/90 max-w-3xl mx-auto">
          A self-service immigration terminal web application for the Ration Club Border Control event,
          featuring a sci-fi spaceport aesthetic with playful celestial elements.
        </p>
      </div>

      {/* Quick Navigation */}
      <TerminalFrame title="Quick Navigation" subtitle="Explore the application" variant="accent" glowEffect>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/">
            <Button className="w-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/50 text-purple-100">
              <HomeIcon className="w-4 h-4 mr-2" />
              Welcome
            </Button>
          </Link>
          <Link to="/border-checkpoint">
            <Button className="w-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/50 text-purple-100">
              <ShieldCheckIcon className="w-4 h-4 mr-2" />
              Checkpoint
            </Button>
          </Link>
          <Link to="/statistics-dashboard">
            <Button className="w-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/50 text-purple-100">
              <LayoutDashboardIcon className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link to="/design-system">
            <Button className="w-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/50 text-purple-100">
              <SparklesIcon className="w-4 h-4 mr-2" />
              Design System
            </Button>
          </Link>
        </div>
      </TerminalFrame>

      {/* Overview */}
      <TerminalFrame title="Application Overview" subtitle="Purpose and functionality">
        <div className="space-y-4 text-purple-200">
          <p>
            The Immigration Kiosk is a comprehensive web application designed for iPad kiosk mode,
            managing guest check-in, document issuance, and entry permissions for the Ration Club
            Border Control event.
          </p>
          <p>
            The application combines the credibility of official government terminals with the
            whimsy of a playful private event, creating a unique "spaceport immigration terminal"
            experience.
          </p>
        </div>
      </TerminalFrame>

      {/* Application Flow */}
      <TerminalFrame title="Application Flow" subtitle="User journey through the system">
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/50 flex items-center justify-center font-bold text-purple-100">
              1
            </div>
            <div>
              <h3 className="font-semibold text-purple-100 mb-1">Welcome / Immigration Terminal</h3>
              <p className="text-sm text-purple-300/70">
                Guests scan their QR code ticket to begin the check-in process. Features animated
                scanning frame and clear instructions.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/50 flex items-center justify-center font-bold text-purple-100">
              2
            </div>
            <div>
              <h3 className="font-semibold text-purple-100 mb-1">Traveler Identification Result</h3>
              <p className="text-sm text-purple-300/70">
                Displays verification status, traveler information, and document type. Shows
                authorization badge and next steps.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/50 flex items-center justify-center font-bold text-purple-100">
              3
            </div>
            <div>
              <h3 className="font-semibold text-purple-100 mb-1">Declaration Form</h3>
              <p className="text-sm text-purple-300/70">
                Playful immigration questionnaire with options like "Purpose: Cake" and
                "Declaration: Good Vibes". Includes sponsor field.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/50 flex items-center justify-center font-bold text-purple-100">
              4
            </div>
            <div>
              <h3 className="font-semibold text-purple-100 mb-1">Document Issuance</h3>
              <p className="text-sm text-purple-300/70">
                Approval screen with animated sparkle effects, document preview, and approval stamp.
                Shows the issued travel document.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/50 flex items-center justify-center font-bold text-purple-100">
              5
            </div>
            <div>
              <h3 className="font-semibold text-purple-100 mb-1">Printing Screen</h3>
              <p className="text-sm text-purple-300/70">
                Animated printing progress with status messages. Shows document preview and
                completion state with sparkle effects.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/50 flex items-center justify-center font-bold text-purple-100">
              6
            </div>
            <div>
              <h3 className="font-semibold text-purple-100 mb-1">Border Checkpoint</h3>
              <p className="text-sm text-purple-300/70">
                Simplified verification interface for the drawing room. Scans documents and displays
                large approval/denial indicators.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/50 flex items-center justify-center font-bold text-purple-100">
              7
            </div>
            <div>
              <h3 className="font-semibold text-purple-100 mb-1">Statistics Dashboard</h3>
              <p className="text-sm text-purple-300/70">
                Admin view showing live immigration metrics: citizens admitted, passports issued,
                declarations received, and more.
              </p>
            </div>
          </div>
        </div>
      </TerminalFrame>

      {/* Document Types */}
      <TerminalFrame title="Document Types" subtitle="Travel authorization categories">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-400/30">
            <h3 className="font-semibold text-blue-200 mb-2">Citizen Passport</h3>
            <p className="text-sm text-blue-300/70">
              Full authorization for Ration Club citizens. Includes all access privileges and
              permanent entry rights.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-400/30">
            <h3 className="font-semibold text-purple-200 mb-2">Border-Issued Passport</h3>
            <p className="text-sm text-purple-300/70">
              Temporary authorization issued at border control. Provides entry with limited
              duration validity.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-pink-500/10 border border-pink-400/30">
            <h3 className="font-semibold text-pink-200 mb-2">Visitor Passcard</h3>
            <p className="text-sm text-pink-300/70">
              Limited access permit for visitors. Requires sponsor and declaration form completion.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-400/30">
            <h3 className="font-semibold text-amber-200 mb-2">Photo Booth Permit</h3>
            <p className="text-sm text-amber-300/70">
              Special authorization for photography activities. Grants access to photo booth areas.
            </p>
          </div>
        </div>
      </TerminalFrame>

      {/* Design Philosophy */}
      <TerminalFrame title="Design Philosophy" subtitle="Visual approach and principles">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-purple-100 mb-3 uppercase tracking-wide">
              Sci-Fi Official Terminal
            </h3>
            <p className="text-sm text-purple-300/70 mb-4">
              The design draws inspiration from airport immigration systems and sci-fi spaceport
              terminals, creating a credible and institutional feel while maintaining visual interest.
            </p>
            <ul className="space-y-2 text-sm text-purple-300/70">
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Terminal panels with corner brackets and scan frames</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Status badges and authorization indicators</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Monospace fonts for document numbers and codes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Glow effects and holographic-style accents</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-purple-100 mb-3 uppercase tracking-wide">
              Playful Cosmic Elements
            </h3>
            <p className="text-sm text-purple-300/70 mb-4">
              Subtle celestial touches add whimsy without compromising the official aesthetic,
              reflecting the host's personality and event theme.
            </p>
            <ul className="space-y-2 text-sm text-purple-300/70">
              <li className="flex items-start gap-2">
                <span className="text-pink-400">✨</span>
                <span>Animated sparkles on success states</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400">⭐</span>
                <span>Twinkling star field backgrounds</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400">💫</span>
                <span>Soft lilac and pastel pink color accents</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400">✨</span>
                <span>Cosmic gradient overlays and glow effects</span>
              </li>
            </ul>
          </div>
        </div>
      </TerminalFrame>

      {/* Technical Implementation */}
      <TerminalFrame title="Technical Implementation" subtitle="Technology stack and architecture">
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <h3 className="font-semibold text-purple-100 mb-2">Frontend Framework</h3>
            <p className="text-sm text-purple-300/70">
              Built with React, TypeScript, and Tailwind CSS for a modern, type-safe, and
              responsive user interface.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <h3 className="font-semibold text-purple-100 mb-2">Component Library</h3>
            <p className="text-sm text-purple-300/70">
              Utilizes Shadcn UI components with custom styling for terminal aesthetics and
              sci-fi visual elements.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <h3 className="font-semibold text-purple-100 mb-2">Routing</h3>
            <p className="text-sm text-purple-300/70">
              React Router for seamless navigation between immigration stages and administrative
              views.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <h3 className="font-semibold text-purple-100 mb-2">Animations</h3>
            <p className="text-sm text-purple-300/70">
              CSS animations and transitions for scanning beams, sparkle effects, progress bars,
              and state changes.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <h3 className="font-semibold text-purple-100 mb-2">Responsive Design</h3>
            <p className="text-sm text-purple-300/70">
              Optimized for iPad kiosk mode with touch-friendly interfaces and tablet-specific
              layouts.
            </p>
          </div>
        </div>
      </TerminalFrame>

      {/* Component Architecture */}
      <TerminalFrame title="Component Architecture" subtitle="Reusable UI building blocks">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-3 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <h4 className="font-semibold text-purple-100 mb-1">SparkleEffect</h4>
            <p className="text-purple-300/70">Animated celestial accents and star fields</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <h4 className="font-semibold text-purple-100 mb-1">TerminalFrame</h4>
            <p className="text-purple-300/70">Panel containers with sci-fi borders</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <h4 className="font-semibold text-purple-100 mb-1">StatusBadge</h4>
            <p className="text-purple-300/70">Authorization and status indicators</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <h4 className="font-semibold text-purple-100 mb-1">ScanFrame</h4>
            <p className="text-purple-300/70">QR scanning interface with animation</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <h4 className="font-semibold text-purple-100 mb-1">DocumentCard</h4>
            <p className="text-purple-300/70">Travel document preview cards</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <h4 className="font-semibold text-purple-100 mb-1">StatTile</h4>
            <p className="text-purple-300/70">Dashboard statistics display</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <h4 className="font-semibold text-purple-100 mb-1">FormField</h4>
            <p className="text-purple-300/70">Terminal-styled form inputs</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <h4 className="font-semibold text-purple-100 mb-1">KioskLayout</h4>
            <p className="text-purple-300/70">Main layout with cosmic background</p>
          </div>
        </div>
      </TerminalFrame>

      {/* Footer */}
      <div className="text-center space-y-4 pt-8">
        <div className="flex justify-center gap-8">
          <SparkleEffect variant="sparkles" size="md" animate />
          <SparkleEffect variant="stars" size="md" animate />
          <SparkleEffect variant="sparkles" size="md" animate />
        </div>
        <p className="text-purple-300/70 text-sm">
          Ration Club Border Authority • Immigration Terminal System v1.0.0
        </p>
      </div>
    </div>
  )
}