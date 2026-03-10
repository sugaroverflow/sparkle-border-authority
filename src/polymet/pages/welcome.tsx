import { Link } from "react-router-dom"
import { SparkleEffect } from "@/polymet/components/sparkle-effect"
import { StatisticsDashboard } from "@/polymet/pages/statistics-dashboard"
import { SparklesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Welcome() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-3xl space-y-8">
        {/* Title Section */}
        <div className="text-center space-y-4 relative">
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

        <StatisticsDashboard />
      </div>
    </div>
  )
}