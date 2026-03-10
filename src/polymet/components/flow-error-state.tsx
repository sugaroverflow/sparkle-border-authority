import { Button } from "@/components/ui/button"
import { TerminalFrame } from "@/polymet/components/terminal-frame"

interface FlowErrorStateProps {
  message: string
  buttonLabel?: string
  onButtonClick: () => void
}

export function FlowErrorState({
  message,
  buttonLabel = "Return to Start",
  onButtonClick,
}: FlowErrorStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <TerminalFrame title="Error" variant="warning">
        <p className="text-center text-purple-200">{message}</p>
        <div className="flex justify-center mt-6">
          <Button onClick={onButtonClick}>{buttonLabel}</Button>
        </div>
      </TerminalFrame>
    </div>
  )
}
