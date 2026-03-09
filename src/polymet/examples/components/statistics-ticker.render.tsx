import { BrowserRouter } from "react-router-dom"
import { StatisticsTicker, StatisticsBar } from "@/polymet/components/statistics-ticker"

export default function StatisticsTickerRender() {
  return (
    <BrowserRouter>
      <div className="p-8 space-y-12 bg-slate-950 min-h-screen">
        <div>
          <h2 className="text-xl font-bold mb-6 text-white">Statistics Ticker</h2>
          <p className="text-sm text-gray-400 mb-4">Animated rotating statistics display</p>
          <StatisticsTicker />
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6 text-white">Statistics Bar</h2>
          <p className="text-sm text-gray-400 mb-4">All statistics displayed at once</p>
          <StatisticsBar />
        </div>
      </div>
    </BrowserRouter>
  )
}