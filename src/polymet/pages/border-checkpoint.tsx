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
              Please go get assistance from border staff.
            </p>
            <p className="text-xl font-semibold text-amber-200/90">
              Ok bye.
            </p>
            <Button
              onClick={() => navigate("/")}
              size="lg"
              variant="outline"
              className="border-amber-400/40 text-amber-200 hover:bg-amber-950/40"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Back to start
            </Button>
          </div>
        </TerminalFrame>
      </div>
    </div>
  )
}
