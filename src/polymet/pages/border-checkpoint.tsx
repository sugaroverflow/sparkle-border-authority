import { useNavigate } from "react-router-dom"
import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { SparkleEffect } from "@/polymet/components/sparkle-effect"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function BorderCheckpoint() {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-2xl">
        <TerminalFrame
          title="Border assistance"
          subtitle="No verification at this terminal"
          variant="warning"
          glowEffect
        >
          <div className="space-y-8 text-center">
            <SparkleEffect variant="stars" size="md" className="mx-auto" />
            <p className="text-lg text-purple-200">
              It is suspected that you are not who you say you are. <br />
              Please proceed to the border to get assistance from border staff.
            </p>
            <p className="text-xl font-semibold text-amber-200/90">
              Ok byeeeeee!
            </p>
            <Button
              onClick={() => navigate("/")}
              size="lg"
              variant="outline"
              className="border-amber-400/50 bg-transparent text-amber-100 hover:bg-amber-950/50 hover:text-white"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Reset System
            </Button>
          </div>
        </TerminalFrame>
      </div>
    </div>
  )
}
