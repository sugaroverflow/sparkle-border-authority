import { cn } from "@/lib/utils"

interface FlowActionRowProps {
  children: React.ReactNode
  className?: string
}

export function FlowActionRow({ children, className }: FlowActionRowProps) {
  return <div className={cn("flex justify-center gap-4 pt-4", className)}>{children}</div>
}

export const primaryActionButtonClass =
  "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold"

export const secondaryActionButtonClass =
  "border-purple-400/50 bg-transparent text-purple-100 hover:bg-purple-950/50 hover:text-white"

export const visitorPrimaryActionButtonClass =
  "bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold"

export const visitorSecondaryActionButtonClass =
  "border-teal-400/50 bg-transparent text-teal-100 hover:bg-teal-950/50 hover:text-white"
