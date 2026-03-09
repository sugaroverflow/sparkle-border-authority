import { BrowserRouter } from "react-router-dom"
import { 
  FormField, 
  TerminalInput, 
  TerminalTextarea, 
  TerminalRadioGroup 
} from "@/polymet/components/form-field"
import { useState } from "react"

export default function FormFieldRender() {
  const [name, setName] = useState("")
  const [purpose, setPurpose] = useState("")
  const [declaration, setDeclaration] = useState("")
  const [notes, setNotes] = useState("")

  const purposeOptions = [
    { value: "cake", label: "Cake", icon: "🎂" },
    { value: "birthday-diplomacy", label: "Birthday Diplomacy", icon: "🎉" },
    { value: "curiosity", label: "Curiosity", icon: "✨" },
    { value: "celebration", label: "Celebration", icon: "🎊" },
  ]

  const declarationOptions = [
    { value: "cake", label: "Cake", icon: "🍰" },
    { value: "birthday-card", label: "A Birthday Card", icon: "💌" },
    { value: "good-vibes", label: "Good Vibes", icon: "✨" },
    { value: "nothing", label: "Nothing to Declare", icon: "⭐" },
  ]

  return (
    <BrowserRouter>
      <div className="p-8 space-y-8 bg-slate-950 min-h-screen max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Terminal Form Components</h2>

        <FormField label="Traveler Name" required>
          <TerminalInput
            placeholder="Enter full name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormField>

        <FormField label="Purpose of Visit" required>
          <TerminalRadioGroup
            options={purposeOptions}
            value={purpose}
            onValueChange={setPurpose}
          />
        </FormField>

        <FormField label="Anything to Declare?" required>
          <TerminalRadioGroup
            options={declarationOptions}
            value={declaration}
            onValueChange={setDeclaration}
          />
        </FormField>

        <FormField label="Additional Notes">
          <TerminalTextarea
            placeholder="Enter any additional information..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </FormField>

        <div className="pt-6 border-t border-purple-400/20">
          <p className="text-sm text-purple-300/70">
            Selected Purpose: <span className="text-purple-100 font-semibold">{purpose || "None"}</span>
          </p>
          <p className="text-sm text-purple-300/70">
            Selected Declaration: <span className="text-purple-100 font-semibold">{declaration || "None"}</span>
          </p>
        </div>
      </div>
    </BrowserRouter>
  )
}