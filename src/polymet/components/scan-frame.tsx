import { cn } from "@/lib/utils"
import { QrCodeIcon, ScanLineIcon } from "lucide-react"
import { useState, useEffect } from "react"

interface ScanFrameProps {
  size?: "sm" | "md" | "lg"
  isScanning?: boolean
  onScan?: () => void
  className?: string
}

export function ScanFrame({ 
  size = "md", 
  isScanning = false,
  className 
}: ScanFrameProps) {
  const [scanLinePosition, setScanLinePosition] = useState(0)

  useEffect(() => {
    if (!isScanning) return

    const interval = setInterval(() => {
      setScanLinePosition((prev) => (prev >= 100 ? 0 : prev + 2))
    }, 30)

    return () => clearInterval(interval)
  }, [isScanning])

  const sizeStyles = {
    sm: "w-48 h-48",
    md: "w-64 h-64",
    lg: "w-80 h-80",
  }

  return (
    <div className={cn("relative", sizeStyles[size], className)}>
      {/* Main Frame */}
      <div className="w-full h-full border-4 border-purple-400/40 rounded-2xl bg-slate-900/30 backdrop-blur-sm relative overflow-hidden">
        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-pink-400" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-pink-400" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-pink-400" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-pink-400" />

        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <QrCodeIcon 
            className={cn(
              "w-24 h-24 text-purple-300/30",
              isScanning && "animate-pulse"
            )} 
          />
        </div>

        {/* Scanning Line */}
        {isScanning && (
          <>
            <div
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent shadow-[0_0_10px_rgba(244,114,182,0.8)]"
              style={{ top: `${scanLinePosition}%` }}
            />
            <div
              className="absolute left-0 right-0 h-8 bg-gradient-to-b from-pink-400/20 to-transparent"
              style={{ top: `${scanLinePosition}%` }}
            />
          </>
        )}

        {/* Glow Effect */}
        {isScanning && (
          <div className="absolute inset-0 border-4 border-pink-400/50 rounded-2xl animate-pulse" />
        )}
      </div>

      {/* Status Indicator */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div className={cn(
          "w-2 h-2 rounded-full",
          isScanning ? "bg-pink-400 animate-pulse" : "bg-purple-400/50"
        )} />
        <span className="text-sm text-purple-300 font-medium">
          {isScanning ? "Scanning..." : "Ready to Scan"}
        </span>
      </div>
    </div>
  )
}

interface ScanButtonProps {
  onClick?: () => void
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

export function ScanButton({ onClick, disabled, className, children }: ScanButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold text-white uppercase tracking-wider",
        "border-2 border-purple-300/50",
        "shadow-[0_0_20px_rgba(192,132,252,0.4)]",
        "hover:shadow-[0_0_30px_rgba(192,132,252,0.6)]",
        "active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <ScanLineIcon className="w-5 h-5 group-hover:animate-pulse" />
        <span>{children ?? "Scan Document"}</span>
      </div>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/0 via-pink-400/20 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  )
}