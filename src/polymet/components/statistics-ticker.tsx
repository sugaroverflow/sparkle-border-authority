import { useEffect, useState } from "react"
import { SparkleEffect } from "@/polymet/components/sparkle-effect"
import { getRuntimeStatistics } from "@/polymet/data/immigration-data"

interface StatItem {
  label: string
  value: string | number
}

export function StatisticsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [statsSnapshot, setStatsSnapshot] = useState(getRuntimeStatistics())

  const stats: StatItem[] = [
    { label: "Visas Issued Tonight", value: statsSnapshot.visasIssuedTonight },
    { label: "Visitors Under Review", value: statsSnapshot.visitorsUnderReview },
    { label: "Sparkle Compliance Rate", value: `${statsSnapshot.sparkleComplianceRate}%` },
    { label: "Border Mood Index", value: statsSnapshot.borderMoodIndex },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stats.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [stats.length])

  useEffect(() => {
    const interval = setInterval(() => setStatsSnapshot(getRuntimeStatistics()), 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div className="flex items-center justify-center gap-3 py-3 px-6 bg-purple-950/30 border border-purple-400/20 rounded-lg">
        <SparkleEffect variant="sparkles" size="sm" />
        <div className="text-center min-w-[300px]">
          <div
            key={currentIndex}
            className="animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            <p className="text-xs text-purple-300/70 uppercase tracking-wider font-mono">
              {stats[currentIndex].label}
            </p>
            <p className="text-2xl font-bold text-purple-100 font-mono">
              {stats[currentIndex].value}
            </p>
          </div>
        </div>
        <SparkleEffect variant="sparkles" size="sm" />
      </div>
    </div>
  )
}

export function StatisticsBar() {
  const stats = getRuntimeStatistics()

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="text-center p-3 bg-purple-950/20 border border-purple-400/10 rounded">
        <p className="text-xs text-purple-300/70 uppercase tracking-wider font-mono mb-1">
          Visas Issued
        </p>
        <p className="text-xl font-bold text-purple-100 font-mono">
          {stats.visasIssuedTonight}
        </p>
      </div>
      <div className="text-center p-3 bg-purple-950/20 border border-purple-400/10 rounded">
        <p className="text-xs text-purple-300/70 uppercase tracking-wider font-mono mb-1">
          Under Review
        </p>
        <p className="text-xl font-bold text-purple-100 font-mono">
          {stats.visitorsUnderReview}
        </p>
      </div>
      <div className="text-center p-3 bg-purple-950/20 border border-purple-400/10 rounded">
        <p className="text-xs text-purple-300/70 uppercase tracking-wider font-mono mb-1">
          Compliance
        </p>
        <p className="text-xl font-bold text-purple-100 font-mono">
          {stats.sparkleComplianceRate}%
        </p>
      </div>
      <div className="text-center p-3 bg-purple-950/20 border border-purple-400/10 rounded">
        <p className="text-xs text-purple-300/70 uppercase tracking-wider font-mono mb-1">
          Mood Index
        </p>
        <p className="text-xl font-bold text-purple-100 font-mono">
          {stats.borderMoodIndex}
        </p>
      </div>
    </div>
  )
}