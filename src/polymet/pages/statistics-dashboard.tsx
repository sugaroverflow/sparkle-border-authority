import { StatTile, CompactStat } from "@/polymet/components/stat-tile"
import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { SparkleEffect } from "@/polymet/components/sparkle-effect"
import { getRuntimeStatistics } from "@/polymet/data/immigration-data"
import {
  UsersIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  CameraIcon,
  FileTextIcon,
  TrendingUpIcon,
  ActivityIcon,
  ClockIcon,
} from "lucide-react"

export function StatisticsDashboard() {
  const stats = getRuntimeStatistics()

  return (
    <div className="space-y-8 py-8">
      {/* Header */}
      <div className="text-center space-y-3 relative">
        <SparkleEffect variant="stars" size="lg" className="absolute -top-4 left-1/4" />
        <SparkleEffect variant="stars" size="lg" className="absolute -top-4 right-1/4" />
        
        <div className="flex items-center justify-center gap-3">
          <ActivityIcon className="w-10 h-10 text-purple-300" />
          <h1 className="text-4xl font-bold text-purple-100 tracking-wider uppercase">
            Immigration Statistics
          </h1>
        </div>
        <p className="text-xl text-purple-300/90 uppercase tracking-widest">
          Live Border Control Metrics
        </p>
      </div>

      {/* Main Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatTile
          label="Citizens Admitted"
          value={stats.citizensAdmitted}
          icon={UsersIcon}
          variant="default"
          showSparkle
        />
        <StatTile
          label="Border Passports"
          value={stats.borderPassports}
          icon={ShieldCheckIcon}
          variant="accent"
          showSparkle
        />
        <StatTile
          label="Visitor Passcards"
          value={stats.visitorPasscards}
          icon={CreditCardIcon}
          variant="success"
          showSparkle
        />
        <StatTile
          label="Photo Permits"
          value={stats.photoPermits}
          icon={CameraIcon}
          variant="warning"
          showSparkle
        />
      </div>

      {/* Secondary Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TerminalFrame
          title="Total Activity"
          subtitle="Overall immigration metrics"
          variant="accent"
          glowEffect
        >
          <div className="space-y-4">
            <StatTile
              label="Total Entries"
              value={stats.totalEntries}
              icon={TrendingUpIcon}
              variant="accent"
              className="w-full"
            />
            <StatTile
              label="Declarations Received"
              value={stats.declarationsReceived}
              icon={FileTextIcon}
              variant="success"
              className="w-full"
            />
          </div>
        </TerminalFrame>

        <TerminalFrame
          title="Quick Stats"
          subtitle="Compact overview"
          variant="default"
          glowEffect
        >
          <div className="space-y-3">
            <CompactStat label="Citizens" value={stats.citizensAdmitted} icon={UsersIcon} />
            <CompactStat label="Border Passports" value={stats.borderPassports} icon={ShieldCheckIcon} />
            <CompactStat label="Visitor Passcards" value={stats.visitorPasscards} icon={CreditCardIcon} />
            <CompactStat label="Photo Permits" value={stats.photoPermits} icon={CameraIcon} />
            <CompactStat label="Declarations" value={stats.declarationsReceived} icon={FileTextIcon} />
            <CompactStat label="Total Entries" value={stats.totalEntries} icon={TrendingUpIcon} />
          </div>
        </TerminalFrame>
      </div>

      {/* Document Distribution */}
      <TerminalFrame
        title="Document Distribution"
        subtitle="Breakdown by document type"
        variant="success"
        glowEffect
      >
        <div className="space-y-4">
          {/* Citizens */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-purple-200 font-semibold flex items-center gap-2">
                <UsersIcon className="w-4 h-4" />
                Citizen Passports
              </span>
              <span className="text-purple-100 font-mono font-bold">
                {stats.citizensAdmitted} ({Math.round((stats.citizensAdmitted / stats.totalEntries) * 100)}%)
              </span>
            </div>
            <div className="h-3 rounded-full bg-slate-950/50 border border-purple-400/30 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                style={{ width: `${(stats.citizensAdmitted / stats.totalEntries) * 100}%` }}
              />
            </div>
          </div>

          {/* Border Passports */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-purple-200 font-semibold flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4" />
                Border-Issued Passports
              </span>
              <span className="text-purple-100 font-mono font-bold">
                {stats.borderPassports} ({Math.round((stats.borderPassports / stats.totalEntries) * 100)}%)
              </span>
            </div>
            <div className="h-3 rounded-full bg-slate-950/50 border border-purple-400/30 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                style={{ width: `${(stats.borderPassports / stats.totalEntries) * 100}%` }}
              />
            </div>
          </div>

          {/* Visitor Passcards */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-purple-200 font-semibold flex items-center gap-2">
                <CreditCardIcon className="w-4 h-4" />
                Visitor Passcards
              </span>
              <span className="text-purple-100 font-mono font-bold">
                {stats.visitorPasscards} ({Math.round((stats.visitorPasscards / stats.totalEntries) * 100)}%)
              </span>
            </div>
            <div className="h-3 rounded-full bg-slate-950/50 border border-purple-400/30 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-pink-600 transition-all duration-500"
                style={{ width: `${(stats.visitorPasscards / stats.totalEntries) * 100}%` }}
              />
            </div>
          </div>

          {/* Photo Permits */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-purple-200 font-semibold flex items-center gap-2">
                <CameraIcon className="w-4 h-4" />
                Photo Booth Permits
              </span>
              <span className="text-purple-100 font-mono font-bold">
                {stats.photoPermits} ({Math.round((stats.photoPermits / stats.totalEntries) * 100)}%)
              </span>
            </div>
            <div className="h-3 rounded-full bg-slate-950/50 border border-purple-400/30 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500"
                style={{ width: `${(stats.photoPermits / stats.totalEntries) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </TerminalFrame>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-slate-900/50 border border-emerald-400/30 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wide">
              System Online
            </p>
          </div>
          <p className="text-xs text-emerald-300/70">All terminals operational</p>
        </div>

        <div className="p-4 rounded-lg bg-slate-900/50 border border-purple-400/30 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ClockIcon className="w-4 h-4 text-purple-300" />
            <p className="text-sm font-semibold text-purple-300 uppercase tracking-wide">
              Last Updated
            </p>
          </div>
          <p className="text-xs text-purple-300/70">Just now</p>
        </div>

        <div className="p-4 rounded-lg bg-slate-900/50 border border-purple-400/30 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ActivityIcon className="w-4 h-4 text-purple-300" />
            <p className="text-sm font-semibold text-purple-300 uppercase tracking-wide">
              Active Sessions
            </p>
          </div>
          <p className="text-xs text-purple-300/70">3 terminals in use</p>
        </div>
      </div>

      {/* Sparkle Decorations */}
      <div className="flex justify-center gap-12 pt-4">
        <SparkleEffect variant="sparkles" size="md" animate />
        <SparkleEffect variant="stars" size="md" animate />
        <SparkleEffect variant="sparkles" size="md" animate />
      </div>
    </div>
  )
}