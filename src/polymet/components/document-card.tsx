import { cn } from "@/lib/utils"
import { SparklesIcon, ShieldCheckIcon, UserIcon, CalendarIcon } from "lucide-react"
import type { DocumentType } from "@/polymet/data/immigration-data"

interface DocumentCardProps {
  documentType: DocumentType
  travelerName: string
  issueDate?: string
  documentNumber?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function DocumentCard({
  documentType,
  travelerName,
  issueDate = new Date().toLocaleDateString(),
  documentNumber = `RC-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
  size = "md",
  className,
}: DocumentCardProps) {
  const documentConfig = {
    "citizen-passport": {
      title: "CITIZEN PASSPORT",
      subtitle: "Ration Club Authority",
      color: "from-blue-600 to-blue-800",
      accentColor: "text-blue-300",
      borderColor: "border-blue-400/50",
      icon: ShieldCheckIcon,
    },
    "border-passport": {
      title: "BORDER-ISSUED PASSPORT",
      subtitle: "Temporary Authorization",
      color: "from-purple-600 to-purple-800",
      accentColor: "text-purple-300",
      borderColor: "border-purple-400/50",
      icon: ShieldCheckIcon,
    },
    "visitor-passcard": {
      title: "VISITOR PASSCARD",
      subtitle: "Limited Access Permit",
      color: "from-pink-600 to-pink-800",
      accentColor: "text-pink-300",
      borderColor: "border-pink-400/50",
      icon: UserIcon,
    },
    "photo-permit": {
      title: "PHOTO BOOTH PERMIT",
      subtitle: "Photography Authorization",
      color: "from-amber-600 to-amber-800",
      accentColor: "text-amber-300",
      borderColor: "border-amber-400/50",
      icon: SparklesIcon,
    },
  }

  const sizeStyles = {
    sm: {
      container: "w-64 h-40",
      title: "text-xs",
      subtitle: "text-[10px]",
      content: "text-xs",
    },
    md: {
      container: "w-80 h-48",
      title: "text-sm",
      subtitle: "text-xs",
      content: "text-sm",
    },
    lg: {
      container: "w-96 h-56",
      title: "text-base",
      subtitle: "text-sm",
      content: "text-base",
    },
  }

  const config = documentConfig[documentType]
  const Icon = config.icon

  return (
    <div className={cn("relative", sizeStyles[size].container, className)}>
      {/* Corner Decorations */}
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-purple-300/50" />
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-purple-300/50" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-purple-300/50" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-purple-300/50" />

      {/* Main Card */}
      <div
        className={cn(
          "w-full h-full rounded-lg border-2 overflow-hidden",
          "bg-gradient-to-br",
          config.color,
          config.borderColor,
          "shadow-lg"
        )}
      >
        {/* Header */}
        <div className="bg-black/30 px-4 py-2 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className={cn("font-bold tracking-wider text-white", sizeStyles[size].title)}>
                {config.title}
              </h3>
              <p className={cn("text-white/70", sizeStyles[size].subtitle)}>
                {config.subtitle}
              </p>
            </div>
            <Icon className="w-6 h-6 text-white/80" />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-white/60" />
            <div>
              <p className="text-[10px] text-white/60 uppercase tracking-wide">Traveler</p>
              <p className={cn("font-semibold text-white", sizeStyles[size].content)}>
                {travelerName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-white/60" />
            <div>
              <p className="text-[10px] text-white/60 uppercase tracking-wide">Issue Date</p>
              <p className={cn("font-medium text-white", sizeStyles[size].content)}>
                {issueDate}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-white/20">
            <p className="text-[10px] text-white/60 uppercase tracking-wide">Document No.</p>
            <p className={cn("font-mono font-bold text-white", sizeStyles[size].content)}>
              {documentNumber}
            </p>
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute bottom-2 right-2 opacity-10">
          <SparklesIcon className="w-16 h-16 text-white" />
        </div>
      </div>
    </div>
  )
}

interface DocumentStampProps {
  status: "approved" | "issued" | "verified"
  className?: string
}

export function DocumentStamp({ status, className }: DocumentStampProps) {
  const stampConfig = {
    approved: {
      text: "APPROVED",
      color: "text-emerald-500",
      borderColor: "border-emerald-500",
    },
    issued: {
      text: "ISSUED",
      color: "text-purple-500",
      borderColor: "border-purple-500",
    },
    verified: {
      text: "VERIFIED",
      color: "text-blue-500",
      borderColor: "border-blue-500",
    },
  }

  const config = stampConfig[status]

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center w-32 h-32 border-4 rounded-full rotate-12",
        "font-bold text-2xl tracking-wider opacity-60",
        config.color,
        config.borderColor,
        className
      )}
    >
      {config.text}
    </div>
  )
}