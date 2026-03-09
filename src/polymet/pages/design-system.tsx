import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { StatusBadge, DocumentBadge } from "@/polymet/components/status-badge"
import { SparkleEffect, StarField } from "@/polymet/components/sparkle-effect"
import { ScanFrame } from "@/polymet/components/scan-frame"
import { DocumentCard } from "@/polymet/components/document-card"
import { StatTile } from "@/polymet/components/stat-tile"
import { FormField, TerminalInput, TerminalRadioGroup } from "@/polymet/components/form-field"
import { UsersIcon, SparklesIcon } from "lucide-react"

export function DesignSystem() {
  return (
    <div className="space-y-12 py-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-purple-100 tracking-wider uppercase">
          Immigration Kiosk
        </h1>
        <h2 className="text-3xl font-bold text-pink-300 tracking-wider uppercase">
          Design System
        </h2>
        <p className="text-purple-300/90 max-w-3xl mx-auto">
          A comprehensive visual system for the Ration Club Border Authority immigration terminal,
          combining sci-fi spaceport aesthetics with playful celestial elements.
        </p>
      </div>

      {/* Color Palette */}
      <TerminalFrame title="Color Palette" subtitle="Cosmic color scheme">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-purple-100 mb-4">Primary Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-slate-950 border border-purple-400/30" />
                <p className="text-sm text-purple-200 font-mono">Midnight Navy</p>
                <p className="text-xs text-purple-300/70">#020617</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-purple-500 border border-purple-400/30" />
                <p className="text-sm text-purple-200 font-mono">Soft Lilac</p>
                <p className="text-xs text-purple-300/70">#a855f7</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-pink-400 border border-pink-400/30" />
                <p className="text-sm text-purple-200 font-mono">Pastel Pink</p>
                <p className="text-xs text-purple-300/70">#f472b6</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-purple-100 border border-purple-400/30" />
                <p className="text-sm text-purple-200 font-mono">Silver White</p>
                <p className="text-xs text-purple-300/70">#f3e8ff</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-100 mb-4">Accent Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-emerald-500 border border-emerald-400/30" />
                <p className="text-sm text-purple-200 font-mono">Success Green</p>
                <p className="text-xs text-purple-300/70">#10b981</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-amber-500 border border-amber-400/30" />
                <p className="text-sm text-purple-200 font-mono">Warning Amber</p>
                <p className="text-xs text-purple-300/70">#f59e0b</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-red-500 border border-red-400/30" />
                <p className="text-sm text-purple-200 font-mono">Denied Red</p>
                <p className="text-xs text-purple-300/70">#ef4444</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-blue-500 border border-blue-400/30" />
                <p className="text-sm text-purple-200 font-mono">Info Blue</p>
                <p className="text-xs text-purple-300/70">#3b82f6</p>
              </div>
            </div>
          </div>
        </div>
      </TerminalFrame>

      {/* Typography */}
      <TerminalFrame title="Typography" subtitle="Font hierarchy and styles">
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold text-purple-100 tracking-wider uppercase">
              Heading 1 - Terminal Title
            </h1>
            <h2 className="text-3xl font-bold text-pink-300 tracking-wider uppercase">
              Heading 2 - Section Title
            </h2>
            <h3 className="text-xl font-semibold text-purple-100 uppercase tracking-wide">
              Heading 3 - Subsection
            </h3>
            <p className="text-base text-purple-200">
              Body text - Regular paragraph content for descriptions and instructions
            </p>
            <p className="text-sm text-purple-300/70">
              Small text - Secondary information and helper text
            </p>
            <p className="text-xs text-purple-300/60 uppercase tracking-wider">
              Caption - Labels and metadata
            </p>
            <p className="font-mono text-purple-100">
              Monospace - Document numbers and codes
            </p>
          </div>
        </div>
      </TerminalFrame>

      {/* UI Components */}
      <TerminalFrame title="Status Badges" subtitle="Authorization and document indicators">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-purple-100 mb-4 uppercase tracking-wide">
              Status Indicators
            </h3>
            <div className="flex flex-wrap gap-4">
              <StatusBadge status="authorized" size="md" />
              <StatusBadge status="denied" size="md" />
              <StatusBadge status="pending" size="md" />
              <StatusBadge status="visitor" size="md" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-purple-100 mb-4 uppercase tracking-wide">
              Document Types
            </h3>
            <div className="flex flex-wrap gap-4">
              <DocumentBadge documentType="citizen-passport" />
              <DocumentBadge documentType="border-passport" />
              <DocumentBadge documentType="visitor-passcard" />
              <DocumentBadge documentType="photo-permit" />
            </div>
          </div>
        </div>
      </TerminalFrame>

      {/* Celestial Elements */}
      <TerminalFrame title="Celestial Elements" subtitle="Sparkles and cosmic accents">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-purple-100 mb-4 uppercase tracking-wide">
              Sparkle Effects
            </h3>
            <div className="flex gap-8 items-center p-6 rounded-lg bg-slate-950/50">
              <SparkleEffect variant="sparkles" size="sm" />
              <SparkleEffect variant="sparkles" size="md" />
              <SparkleEffect variant="sparkles" size="lg" />
              <SparkleEffect variant="stars" size="md" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-purple-100 mb-4 uppercase tracking-wide">
              Star Field Background
            </h3>
            <div className="relative h-48 rounded-lg bg-slate-950 overflow-hidden">
              <StarField density="medium" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-purple-100 font-semibold">Cosmic Background Layer</p>
              </div>
            </div>
          </div>
        </div>
      </TerminalFrame>

      {/* Terminal Frames */}
      <TerminalFrame title="Terminal Frames" subtitle="Panel containers and borders">
        <div className="grid grid-cols-2 gap-6">
          <TerminalFrame title="Default" subtitle="Standard panel" variant="default">
            <p className="text-purple-100 text-sm">Default terminal frame with corner brackets</p>
          </TerminalFrame>
          <TerminalFrame title="Accent" subtitle="Highlighted panel" variant="accent" glowEffect>
            <p className="text-purple-100 text-sm">Accent variant with glow effect</p>
          </TerminalFrame>
          <TerminalFrame title="Success" subtitle="Approved state" variant="success" glowEffect>
            <p className="text-emerald-100 text-sm">Success variant for approvals</p>
          </TerminalFrame>
          <TerminalFrame title="Warning" subtitle="Alert state" variant="warning" glowEffect>
            <p className="text-amber-100 text-sm">Warning variant for alerts</p>
          </TerminalFrame>
        </div>
      </TerminalFrame>

      {/* Scanning Interface */}
      <TerminalFrame title="Scanning Interface" subtitle="QR code verification">
        <div className="flex justify-center">
          <ScanFrame size="md" isScanning={true} />
        </div>
      </TerminalFrame>

      {/* Document Cards */}
      <TerminalFrame title="Document Cards" subtitle="Travel document previews">
        <div className="grid grid-cols-2 gap-8">
          <DocumentCard
            documentType="citizen-passport"
            travelerName="Alex Starfield"
            size="md"
          />
          <DocumentCard
            documentType="visitor-passcard"
            travelerName="Sam Nebula"
            size="md"
          />
        </div>
      </TerminalFrame>

      {/* Statistics Tiles */}
      <TerminalFrame title="Statistics Tiles" subtitle="Dashboard metrics">
        <div className="grid grid-cols-2 gap-6">
          <StatTile
            label="Citizens Admitted"
            value={42}
            icon={UsersIcon}
            variant="default"
            showSparkle
          />
          <StatTile
            label="Visitor Passcards"
            value={27}
            icon={SparklesIcon}
            variant="accent"
            showSparkle
          />
        </div>
      </TerminalFrame>

      {/* Form Elements */}
      <TerminalFrame title="Form Elements" subtitle="Input components">
        <div className="space-y-6">
          <FormField label="Traveler Name" required>
            <TerminalInput placeholder="Enter full name..." />
          </FormField>

          <FormField label="Purpose of Visit" required>
            <TerminalRadioGroup
              options={[
                { value: "cake", label: "Cake", icon: "🎂" },
                { value: "birthday", label: "Birthday Diplomacy", icon: "🎉" },
              ]}
              value="cake"
            />
          </FormField>
        </div>
      </TerminalFrame>

      {/* Animation Guidelines */}
      <TerminalFrame title="Animation Guidelines" subtitle="Motion and transitions">
        <div className="space-y-4 text-purple-200">
          <div className="p-4 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <h4 className="font-semibold mb-2">Scanning Beam</h4>
            <p className="text-sm text-purple-300/70">
              Vertical scanning line with gradient glow, moving from top to bottom
            </p>
          </div>
          <div className="p-4 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <h4 className="font-semibold mb-2">Blinking Cursor</h4>
            <p className="text-sm text-purple-300/70">
              Pulse animation for status indicators and active states
            </p>
          </div>
          <div className="p-4 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <h4 className="font-semibold mb-2">Twinkling Stars</h4>
            <p className="text-sm text-purple-300/70">
              Subtle opacity animation for background star elements
            </p>
          </div>
          <div className="p-4 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <h4 className="font-semibold mb-2">Authorized Glow</h4>
            <p className="text-sm text-purple-300/70">
              Box shadow pulse effect for success states and approvals
            </p>
          </div>
          <div className="p-4 rounded-lg bg-slate-950/50 border border-purple-400/20">
            <h4 className="font-semibold mb-2">Sparkle Particles</h4>
            <p className="text-sm text-purple-300/70">
              Animated sparkle icons appearing on approval and success states
            </p>
          </div>
        </div>
      </TerminalFrame>

      {/* Design Principles */}
      <TerminalFrame title="Design Principles" subtitle="Core visual guidelines">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-purple-100 uppercase tracking-wide">
              Official & Institutional
            </h4>
            <p className="text-sm text-purple-300/70">
              Clean government-style UI patterns with terminal aesthetics, corner brackets,
              and structured layouts reminiscent of airport immigration systems.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-purple-100 uppercase tracking-wide">
              Sci-Fi Spaceport
            </h4>
            <p className="text-sm text-purple-300/70">
              Futuristic control terminal design with glowing accents, scan brackets,
              and holographic-style visual effects.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-purple-100 uppercase tracking-wide">
              Minimal & Elegant
            </h4>
            <p className="text-sm text-purple-300/70">
              Clean interfaces with purposeful use of space, clear hierarchy,
              and refined typography for professional appearance.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-purple-100 uppercase tracking-wide">
              Playfully Cosmic
            </h4>
            <p className="text-sm text-purple-300/70">
              Subtle celestial elements including stars, sparkles, and cosmic accents
              that add whimsy without compromising credibility.
            </p>
          </div>
        </div>
      </TerminalFrame>
    </div>
  )
}