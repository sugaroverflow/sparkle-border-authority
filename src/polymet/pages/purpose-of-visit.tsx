import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import {
  FlowActionRow,
  primaryActionButtonClass,
  secondaryActionButtonClass,
} from "@/polymet/components/flow-action-row"
import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { OptionCard } from "@/polymet/components/form-field"
import { Button } from "@/components/ui/button"
import { purposeOptions } from "@/polymet/data/immigration-data"
import { toDeclarationsRoute, toIdentityConfirmationRoute } from "@/polymet/flow-routes"

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
    navigate(toDeclarationsRoute(code, selectedPurposes))
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
                  <OptionCard
                    key={option.value}
                    onClick={() => togglePurpose(option.value)}
                    disabled={isDisabled}
                    selected={isSelected}
                    icon={option.icon}
                    label={option.label}
                    className="p-6 justify-center text-center"
                    unselectedClassName={
                      isDisabled
                        ? "bg-slate-900/30 border-purple-400/10 opacity-50 cursor-not-allowed"
                        : "bg-slate-900/30 border-purple-400/20 hover:border-purple-400/50 hover:bg-purple-950/30"
                    }
                    selectedBadgeClassName="bg-purple-500"
                  />
                )
              })}
            </div>

            {selectedPurposes.length > 2 && (
              <div className="text-center text-sm text-amber-400 bg-amber-950/30 border border-amber-400/30 rounded p-3">
                Maximum two purposes allowed. Please deselect one to continue.
              </div>
            )}

            <FlowActionRow className="pt-6">
              <Button
                variant="outline"
                onClick={() => navigate(isVisitor ? "/visitor-signup" : toIdentityConfirmationRoute(code))}
                className={secondaryActionButtonClass}
              >
                Back
              </Button>
              <Button
                onClick={handleContinue}
                disabled={!isValid}
                className={`${primaryActionButtonClass} px-12 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Continue
              </Button>
            </FlowActionRow>
          </div>
        </TerminalFrame>
      </div>
    </div>
  )
}