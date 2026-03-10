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
import { declarationOptions } from "@/polymet/data/immigration-data"
import { parseCsvParam, toProcessingRoute, toPurposeOfVisitRoute } from "@/polymet/flow-routes"
import { AlertCircleIcon } from "lucide-react"

export function Declarations() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const code = searchParams.get("code") || ""
  const purposes = parseCsvParam(searchParams.get("purposes"))

  const [selectedDeclarations, setSelectedDeclarations] = useState<string[]>([])

  const toggleDeclaration = (value: string) => {
    if (selectedDeclarations.includes(value)) {
      setSelectedDeclarations(selectedDeclarations.filter((d) => d !== value))
    } else {
      setSelectedDeclarations([...selectedDeclarations, value])
    }
  }

  const handleContinue = () => {
    navigate(toProcessingRoute(code, purposes, selectedDeclarations))
  }

  const isValid = selectedDeclarations.length >= 1
  const hasNothingToDeclare = selectedDeclarations.includes("nothing")

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-4xl">
        <TerminalFrame
          title="Declaration Form"
          subtitle="What are you bringing to Ration Club?"
          variant="accent"
          glowEffect
        >
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-purple-200 mb-2">
                Please declare all items you are bringing
              </p>
              <p className="text-sm text-purple-300/70">
                Select at least one declaration
              </p>
              <p className="text-xs text-purple-300/50 mt-2">
                Selected: {selectedDeclarations.length}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {declarationOptions.map((option) => {
                const isSelected = selectedDeclarations.includes(option.value)
                const isNothing = option.value === "nothing"

                return (
                  <OptionCard
                    key={option.value}
                    onClick={() => toggleDeclaration(option.value)}
                    selected={isSelected}
                    icon={option.icon}
                    label={option.label}
                    className="p-6 justify-center text-center"
                    selectedClassName={
                      isNothing
                        ? "bg-red-600/30 border-red-400 shadow-lg shadow-red-500/30"
                        : "bg-purple-600/30 border-purple-400 shadow-lg shadow-purple-500/30"
                    }
                    selectedBadgeClassName={isNothing ? "bg-red-500" : "bg-purple-500"}
                    unselectedClassName="bg-slate-900/30 border-purple-400/20 hover:border-purple-400/50 hover:bg-purple-950/30"
                  />
                )
              })}
            </div>

            {hasNothingToDeclare && (
              <div className="flex items-center justify-center gap-2 text-red-400 bg-red-950/30 border border-red-400/30 rounded p-3">
                <AlertCircleIcon className="w-5 h-5" />
                <p className="text-sm">
                  Warning: "Nothing to Declare" will result in automatic rejection
                </p>
              </div>
            )}

            {!isValid && (
              <div className="text-center text-sm text-amber-400 bg-amber-950/30 border border-amber-400/30 rounded p-3">
                At least one declaration is required to proceed
              </div>
            )}

            <FlowActionRow className="pt-6">
              <Button
                variant="outline"
                onClick={() => navigate(toPurposeOfVisitRoute(code))}
                className={secondaryActionButtonClass}
              >
                Back
              </Button>
              <Button
                onClick={handleContinue}
                disabled={!isValid}
                className={`${primaryActionButtonClass} px-12 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Submit Declaration
              </Button>
            </FlowActionRow>
          </div>
        </TerminalFrame>
      </div>
    </div>
  )
}