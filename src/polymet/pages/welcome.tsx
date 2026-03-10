import { Link } from "react-router-dom"
import { SparkleEffect } from "@/polymet/components/sparkle-effect"
import { StatisticsDashboard } from "@/polymet/pages/statistics-dashboard"
import { ArrowDownIcon, SparklesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Welcome() {
  return (
    <div className="w-full min-h-[calc(100vh-200px)] py-8">
      <div className="w-full max-w-6xl mx-auto space-y-10">
        {/* Title Section */}
        <div className="text-center space-y-4 relative max-w-3xl mx-auto">
          <SparkleEffect 
            variant="sparkles" 
            size="lg" 
            className="absolute -top-4 left-1/4"
          />
          <SparkleEffect 
            variant="sparkles" 
            size="lg" 
            className="absolute -top-4 right-1/4"
          />
          
          <h1 className="text-5xl font-bold text-purple-100 tracking-wider uppercase">
            Ration Club
          </h1>
          <h2 className="text-3xl font-bold text-pink-300 tracking-wider uppercase">
            Border Authority
          </h2>
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-400/50" />
            <SparklesIcon className="w-5 h-5 text-purple-300" />
            <p className="text-xl text-purple-300/90 uppercase tracking-widest">
              Immigration Terminal
            </p>
            <SparklesIcon className="w-5 h-5 text-purple-300" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-400/50" />
          </div>
        </div>

        {/* Start Button */}
        <div className="flex justify-center pt-8">
          <Link to="/code-entry">
            <Button
              size="lg"
              className="text-xl px-12 py-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold uppercase tracking-wider shadow-lg shadow-purple-500/50 border-2 border-purple-400/30"
            >
              Start Immigration
            </Button>
          </Link>
        </div>

        <div className="text-center space-y-2 pt-2">
          <div className="flex items-center justify-center gap-2 text-purple-200/90">
            <SparkleEffect variant="stars" size="sm" />
            <p className="text-sm uppercase tracking-[0.2em]">
              Scroll to see Immigration Stats
            </p>
            <SparkleEffect variant="stars" size="sm" />
          </div>
          <div className="flex justify-center">
            <ArrowDownIcon className="w-5 h-5 text-pink-300 animate-bounce" />
          </div>
        </div>

        <div className="pt-4">
          <StatisticsDashboard />
        </div>
      </div>
    </div>
  )
}