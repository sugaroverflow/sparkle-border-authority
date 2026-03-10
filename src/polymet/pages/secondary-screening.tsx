import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { FlowActionRow, primaryActionButtonClass } from "@/polymet/components/flow-action-row"
import { FlowErrorState } from "@/polymet/components/flow-error-state"
import { OptionCard } from "@/polymet/components/form-field"
import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { Button } from "@/components/ui/button"
import { 
  findGuestByCode, 
  secondaryScreeningQuestions,
  assignPrivileges,
  generateVisaNumber,
  recordDecisionOnce,
} from "@/polymet/data/immigration-data"
import { createApplicationId, parseCsvParam, toApprovedDecisionRoute } from "@/polymet/flow-routes"
import { AlertCircleIcon } from "lucide-react"

export function SecondaryScreening() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const code = searchParams.get("code") || ""
  const purposes = parseCsvParam(searchParams.get("purposes"))
  const declarations = parseCsvParam(searchParams.get("declarations"))
  const applicationId = searchParams.get("applicationId") || createApplicationId()

  const guest = findGuestByCode(code)
  
  // Select a random question
  const [question] = useState(() => {
    const randomIndex = Math.floor(Math.random() * secondaryScreeningQuestions.length)
    return secondaryScreeningQuestions[randomIndex]
  })

  const [selectedAnswer, setSelectedAnswer] = useState("")

  if (!guest) {
    return <FlowErrorState message="Guest not found. Please start over." onButtonClick={() => navigate("/")} />
  }

  const handleSubmit = () => {
    if (!selectedAnswer) return

    // Secondary screening always results in approval with message
    const privileges = assignPrivileges(guest)
    const visaNumber = generateVisaNumber()
    const timestamp = new Date().toISOString()
    recordDecisionOnce(applicationId, "approved", guest.status)

    navigate(
      toApprovedDecisionRoute({
        code,
        purposes,
        declarations,
        privileges,
        visaNumber,
        timestamp,
        secondary: true,
        applicationId,
      })
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-3xl">
        <TerminalFrame
          title="Secondary Screening Required"
          subtitle="Additional security verification"
          variant="warning"
          glowEffect
        >
          <div className="space-y-8">
            {/* Alert */}
            <div className="flex items-center justify-center gap-3 p-4 bg-amber-950/30 border border-amber-400/30 rounded-lg">
              <AlertCircleIcon className="w-6 h-6 text-amber-400" />
              <p className="text-amber-200 font-semibold">
                Additional security verification required
              </p>
            </div>

            {/* Guest Info */}
            <div className="text-center">
              <p className="text-lg text-purple-200 mb-1">
                {guest.name}
              </p>
              <p className="text-sm text-purple-300/70">
                Code: {guest.code}
              </p>
            </div>

            {/* Question */}
            <div className="p-6 bg-purple-950/30 border border-purple-400/20 rounded-lg">
              <p className="text-lg text-purple-100 font-semibold mb-6 text-center">
                {question.question}
              </p>

              <div className="space-y-3">
                {question.options.map((option) => (
                  <OptionCard
                    key={option}
                    onClick={() => setSelectedAnswer(option)}
                    selected={selectedAnswer === option}
                    label={option}
                    className="w-full"
                  />
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="text-center text-sm text-purple-300/70">
              <p>This is a routine security check</p>
              <p className="text-xs mt-1">All answers are acceptable</p>
            </div>

            {/* Action Buttons */}
            <FlowActionRow>
              <Button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className={`${primaryActionButtonClass} px-12 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Submit Answer
              </Button>
            </FlowActionRow>
          </div>
        </TerminalFrame>
      </div>
    </div>
  )
}