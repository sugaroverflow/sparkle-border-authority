import { useState } from "react"
import { Link } from "react-router-dom"
import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { FormField, TerminalInput, TerminalRadioGroup } from "@/polymet/components/form-field"
import { purposeOptions, declarationOptions } from "@/polymet/data/immigration-data"
import { Button } from "@/components/ui/button"
import { CheckCircle2Icon, FileTextIcon } from "lucide-react"
import { SparkleEffect } from "@/polymet/components/sparkle-effect"

export function DeclarationForm() {
  const [formData, setFormData] = useState({
    name: "",
    lumaVerified: true,
    purposeOfVisit: "",
    declaration: "",
    sponsor: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the form and navigate
    console.log("Form submitted:", formData)
  }

  const isFormValid = formData.name && formData.purposeOfVisit && formData.declaration

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-3 relative">
          <SparkleEffect variant="sparkles" size="md" className="absolute -top-2 left-1/4" />
          <SparkleEffect variant="sparkles" size="md" className="absolute -top-2 right-1/4" />
          
          <div className="flex items-center justify-center gap-3">
            <FileTextIcon className="w-8 h-8 text-purple-300" />
            <h1 className="text-3xl font-bold text-purple-100 tracking-wider uppercase">
              Declaration Form
            </h1>
          </div>
          <p className="text-purple-300/70">
            Please complete the following immigration questionnaire
          </p>
        </div>

        {/* Form */}
        <TerminalFrame
          title="Immigration Questionnaire"
          subtitle="All fields marked with * are required"
          variant="accent"
          glowEffect
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <FormField label="Traveler Name" required>
              <TerminalInput
                placeholder="Enter your full name..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </FormField>

            {/* Luma Verification Status */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-400/30">
              <CheckCircle2Icon className="w-6 h-6 text-emerald-300" />
              <div>
                <p className="text-sm font-semibold text-emerald-200 uppercase tracking-wide">
                  Luma Check-in Verified
                </p>
                <p className="text-xs text-emerald-300/70 mt-1">
                  Your ticket has been validated
                </p>
              </div>
            </div>

            {/* Purpose of Visit */}
            <FormField label="Purpose of Visit" required>
              <TerminalRadioGroup
                options={purposeOptions}
                value={formData.purposeOfVisit}
                onValueChange={(value) => setFormData({ ...formData, purposeOfVisit: value })}
              />
            </FormField>

            {/* Declaration */}
            <FormField label="Anything to Declare?" required>
              <TerminalRadioGroup
                options={declarationOptions}
                value={formData.declaration}
                onValueChange={(value) => setFormData({ ...formData, declaration: value })}
              />
            </FormField>

            {/* Sponsor (Optional) */}
            <FormField label="Sponsor (Optional)">
              <TerminalInput
                placeholder="Enter sponsor name if applicable..."
                value={formData.sponsor}
                onChange={(e) => setFormData({ ...formData, sponsor: e.target.value })}
              />
              <p className="text-xs text-purple-300/60 mt-2">
                If you were invited by a citizen, please provide their name
              </p>
            </FormField>

            {/* Submit Button */}
            <div className="pt-6 flex gap-4 justify-end">
              <Link to="/traveler-result">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="border-purple-400/50 text-purple-200 hover:bg-purple-500/10"
                >
                  Back
                </Button>
              </Link>
              <Link to="/document-issuance">
                <Button
                  type="submit"
                  size="lg"
                  disabled={!isFormValid}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(192,132,252,0.4)] hover:shadow-[0_0_30px_rgba(192,132,252,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Declaration
                </Button>
              </Link>
            </div>
          </form>
        </TerminalFrame>

        {/* Info Box */}
        <div className="p-4 rounded-lg bg-slate-900/30 border border-purple-400/20">
          <p className="text-sm text-purple-300/70 text-center">
            Your declaration will be processed and your travel document will be issued upon approval
          </p>
        </div>
      </div>
    </div>
  )
}