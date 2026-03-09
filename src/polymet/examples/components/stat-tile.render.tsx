import { BrowserRouter } from "react-router-dom"
import { StatTile, CompactStat } from "@/polymet/components/stat-tile"
import { 
  UsersIcon, 
  ShieldCheckIcon, 
  CreditCardIcon, 
  CameraIcon,
  FileTextIcon,
  TrendingUpIcon 
} from "lucide-react"

export default function StatTileRender() {
  return (
    <BrowserRouter>
      <div className="p-8 space-y-12 bg-slate-950 min-h-screen">
        <div>
          <h2 className="text-xl font-bold mb-6 text-white">Stat Tiles - Variants</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatTile
              label="Citizens Admitted"
              value={42}
              icon={UsersIcon}
              variant="default"
            />
            <StatTile
              label="Border Passports"
              value={18}
              icon={ShieldCheckIcon}
              variant="accent"
            />
            <StatTile
              label="Visitor Passcards"
              value={27}
              icon={CreditCardIcon}
              variant="success"
            />
            <StatTile
              label="Photo Permits"
              value={15}
              icon={CameraIcon}
              variant="warning"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6 text-white">With Sparkles</h2>
          <div className="grid grid-cols-2 gap-6">
            <StatTile
              label="Total Entries"
              value={87}
              icon={TrendingUpIcon}
              variant="accent"
              showSparkle
            />
            <StatTile
              label="Declarations"
              value={102}
              icon={FileTextIcon}
              variant="success"
              showSparkle
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6 text-white">Compact Stats</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <CompactStat label="Citizens" value={42} icon={UsersIcon} />
            <CompactStat label="Passports" value={18} icon={ShieldCheckIcon} />
            <CompactStat label="Passcards" value={27} icon={CreditCardIcon} />
            <CompactStat label="Permits" value={15} icon={CameraIcon} />
            <CompactStat label="Declarations" value={102} icon={FileTextIcon} />
            <CompactStat label="Total" value={87} icon={TrendingUpIcon} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}