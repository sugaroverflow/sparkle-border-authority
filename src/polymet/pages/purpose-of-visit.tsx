import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { Button } from "@/components/ui/button"
import { purposeOptions } from "@/polymet/data/immigration-data"
import { CheckIcon } from "lucide-react"

export function PurposeOfVisit() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const code = searchParams.get("code") || ""
  const isVisitor = code.startsWith("MAN-")

  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([])

  const togglePurpose = (value: string) => {
    if (selectedPurposes.includes(value)) {
      setSelectedPurposes(selectedPurposes.filter((p) => p !== value))
    } else {
      if (selectedPurposes.length < 2) {
        setSelectedPurposes([...selectedPurposes, value])
      }
    }
  }

  const handleContinue = () => {
    const purposesParam = selectedPurposes.join(",")
    navigate(`/declarations?code=${code}&purposes=${purposesParam}`)
  }

  const isValid = selectedPurposes.length >= 1 && selectedPurposes.length <= 2

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-4xl">
        <TerminalFrame
          title="Purpose of Visit"
          subtitle="Select 1-2 purposes for your visit"
          variant="accent"
          glowEffect
        >
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-purple-200 mb-2">
                What brings you to Ration Club tonight?
              </p>
              <p className="text-sm text-purple-300/70">
                Select at least one purpose (maximum two)
              </p>
              <p className="text-xs text-purple-300/50 mt-2">
                Selected: {selectedPurposes.length} / 2
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {purposeOptions.map((option) => {
                const isSelected = selectedPurposes.includes(option.value)
                const isDisabled = !isSelected && selectedPurposes.length >= 2

                return (
                  <button
                    key={option.value}
                    onClick={() => togglePurpose(option.value)}
                    disabled={isDisabled}
                    className={`
                      relative p-6 rounded-lg border-2 transition-all
                      ${
                        isSelected
                          ? "bg-purple-600/30 border-purple-400 shadow-lg shadow-purple-500/30"
                          : isDisabled
                          ? "bg-slate-900/30 border-purple-400/10 opacity-50 cursor-not-allowed"
                          : "bg-slate-900/30 border-purple-400/20 hover:border-purple-400/50 hover:bg-purple-950/30"
                      }
                    `}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <CheckIcon className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="text-4xl mb-3">{option.icon}</div>
                    <p className="text-sm font-semibold text-purple-100 text-center">
                      {option.label}
                    </p>
                  </button>
                )
              })}
            </div>

            {selectedPurposes.length > 2 && (
              <div className="text-center text-sm text-amber-400 bg-amber-950/30 border border-amber-400/30 rounded p-3">
                Maximum two purposes allowed. Please deselect one to continue.
              </div>
            )}

            <div className="flex justify-center gap-4 pt-6">
              <Button
                variant="outline"
                onClick={() => navigate(isVisitor ? "/visitor-signup" : `/identity-confirmation?code=${code}`)}
                className="border-purple-400/50 bg-transparent text-purple-100 hover:bg-purple-950/50 hover:text-white"
              >
                Back
              </Button>
              <Button
                onClick={handleContinue}
                disabled={!isValid}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-12 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </Button>
            </div>
          </div>
        </TerminalFrame>
      </div>
    </div>
  )
}