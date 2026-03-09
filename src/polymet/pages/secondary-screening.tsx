import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { Button } from "@/components/ui/button"
import { 
  findGuestByCode, 
  secondaryScreeningQuestions,
  assignPrivileges,
  generateVisaNumber,
} from "@/polymet/data/immigration-data"
import { AlertCircleIcon, CheckIcon } from "lucide-react"

export function SecondaryScreening() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const code = searchParams.get("code") || ""
  const purposes = searchParams.get("purposes")?.split(",") || []
  const declarations = searchParams.get("declarations")?.split(",") || []

  const guest = findGuestByCode(code)
  
  // Select a random question
  const [question] = useState(() => {
    const randomIndex = Math.floor(Math.random() * secondaryScreeningQuestions.length)
    return secondaryScreeningQuestions[randomIndex]
  })

  const [selectedAnswer, setSelectedAnswer] = useState("")

  if (!guest) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <TerminalFrame title="Error" variant="warning">
          <p className="text-center text-purple-200">Guest not found. Please start over.</p>
          <div className="flex justify-center mt-6">
            <Button onClick={() => navigate("/")}>
              Return to Start
            </Button>
          </div>
        </TerminalFrame>
      </div>
    )
  }

  const handleSubmit = () => {
    if (!selectedAnswer) return

    // Secondary screening always results in approval with message
    const privileges = assignPrivileges(guest)
    const visaNumber = generateVisaNumber()
    const timestamp = new Date().toISOString()

    navigate(
      `/decision?code=${code}&decision=approved&purposes=${purposes.join(",")}&declarations=${declarations.join(",")}&privileges=${privileges.join(",")}&visaNumber=${visaNumber}&timestamp=${timestamp}&secondary=true`
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
                {question.options.map((option) => {
                  const isSelected = selectedAnswer === option

                  return (
                    <button
                      key={option}
                      onClick={() => setSelectedAnswer(option)}
                      className={`
                        w-full p-4 rounded-lg border-2 transition-all text-left
                        ${
                          isSelected
                            ? "bg-purple-600/30 border-purple-400 shadow-lg shadow-purple-500/30"
                            : "bg-slate-900/30 border-purple-400/20 hover:border-purple-400/50 hover:bg-purple-950/30"
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-purple-100">{option}</span>
                        {isSelected && (
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                            <CheckIcon className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Info */}
            <div className="text-center text-sm text-purple-300/70">
              <p>This is a routine security check</p>
              <p className="text-xs mt-1">All answers are acceptable</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-4">
              <Button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-12 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answer
              </Button>
            </div>
          </div>
        </TerminalFrame>
      </div>
    </div>
  )
}