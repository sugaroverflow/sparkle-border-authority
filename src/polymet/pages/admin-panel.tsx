import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TerminalFrame } from "@/polymet/components/terminal-frame"
import { StatTile } from "@/polymet/components/stat-tile"
import { TerminalInput } from "@/polymet/components/form-field"
import { Button } from "@/components/ui/button"
import { getGuestInitials } from "@/lib/utils"
import { 
  getAllGuests,
  getRuntimeStatistics,
  findGuestByCode,
  generateVisaNumber,
  assignPrivileges,
  markGuestArrived,
  recordDecisionOnce,
  type GuestRecord 
} from "@/polymet/data/immigration-data"
import {
  createApplicationId,
  toApprovedDecisionRoute,
  toPrintPreviewRoute,
} from "@/polymet/flow-routes"
import { 
  UsersIcon, 
  ShieldCheckIcon, 
  CreditCardIcon, 
  XCircleIcon,
  SearchIcon,
  PrinterIcon,
  CheckCircleIcon,
} from "lucide-react"

export function AdminPanel() {
  const [refreshKey, setRefreshKey] = useState(0)
  const guests = getAllGuests()
  const stats = getRuntimeStatistics()
  const navigate = useNavigate()
  const [pin, setPin] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchCode, setSearchCode] = useState("")
  const [foundGuest, setFoundGuest] = useState<GuestRecord | null>(null)
  const [manualVisaName, setManualVisaName] = useState("")
  const [manualVisaAgentCode, setManualVisaAgentCode] = useState("")

  const handleLogin = () => {
    // Simple PIN check (in real app, this would be more secure)
    if (pin === "1234") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid PIN")
    }
  }

  const handleSearch = () => {
    const guest = findGuestByCode(searchCode)
    if (guest) {
      setFoundGuest(guest)
    } else {
      setFoundGuest(null)
      alert("Guest not found")
    }
  }

  const handlePrinterTest = () => {
    alert("Printer test initiated. Check printer output.")
  }

  const handleMarkArrived = (code: string) => {
    markGuestArrived(code)
    setRefreshKey((value) => value + 1)
  }

  const handleReprintVisa = (code: string) => {
    const guest = findGuestByCode(code)
    if (!guest) {
      alert("Guest not found for reprint.")
      return
    }

    const visaNumber = generateVisaNumber()
    const timestamp = new Date().toISOString()
    const defaultPurposes = "bureaucratic-chaos"
    const defaultDeclarations = "excellent-vibes"
    const applicationId = createApplicationId()

    navigate(
      toPrintPreviewRoute({
        code: guest.code,
        visaNumber,
        purposes: [defaultPurposes],
        declarations: [defaultDeclarations],
        privileges: guest.basePrivileges,
        timestamp,
        reprint: true,
        applicationId,
      })
    )
  }

  const handleOverrideRejection = (code: string) => {
    const guest = findGuestByCode(code)
    if (!guest) {
      alert("Guest not found for override.")
      return
    }
    const visaNumber = generateVisaNumber()
    const timestamp = new Date().toISOString()
    const purposes = ["bureaucratic-chaos"]
    const declarations = ["excellent-vibes"]
    const privileges = assignPrivileges(guest)
    const applicationId = createApplicationId()
    recordDecisionOnce(applicationId, "approved", guest.status)

    navigate(
      toApprovedDecisionRoute({
        code: guest.code,
        purposes,
        declarations,
        privileges,
        visaNumber,
        timestamp,
        override: true,
        applicationId,
      })
    )
  }

  const handleManualVisaPrint = () => {
    if (!manualVisaName || !manualVisaAgentCode) {
      alert("Enter a name and agent code for manual visa printing.")
      return
    }

    const visaNumber = generateVisaNumber()
    const timestamp = new Date().toISOString()
    const applicationId = createApplicationId()
    navigate(
      toPrintPreviewRoute({
        manual: true,
        manualName: manualVisaName,
        manualAgentCode: manualVisaAgentCode,
        visaNumber,
        purposes: ["bureaucratic-chaos"],
        declarations: ["excellent-vibes"],
        privileges: ["Standard Sparkle Protocol"],
        timestamp,
        applicationId,
      })
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-md">
          <TerminalFrame
            title="Admin Panel"
            subtitle="Staff access only"
            variant="warning"
          >
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-purple-200 mb-2">
                  Enter staff PIN to access admin panel
                </p>
                <p className="text-xs text-purple-300/70">
                  (Demo PIN: 1234)
                </p>
              </div>

              <TerminalInput
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN..."
                className="text-center text-2xl font-mono tracking-widest"
                maxLength={4}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin()
                }}
              />

              <div className="flex justify-center">
                <Button
                  onClick={handleLogin}
                  disabled={pin.length !== 4}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-12"
                >
                  Login
                </Button>
              </div>
            </div>
          </TerminalFrame>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 py-8">
      <TerminalFrame
        title="Admin Panel"
        subtitle="Staff controls and monitoring"
        variant="accent"
        glowEffect
      >
        <div className="space-y-8">
          {/* Statistics */}
          <div>
            <h3 className="text-lg font-semibold text-purple-100 mb-4">
              Event Statistics
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatTile
                label="Visas Issued"
                value={stats.visasIssuedTonight}
                icon={ShieldCheckIcon}
                variant="success"
              />
              <StatTile
                label="Under Review"
                value={stats.visitorsUnderReview}
                icon={UsersIcon}
                variant="warning"
              />
              <StatTile
                label="Rejections"
                value={stats.rejections}
                icon={XCircleIcon}
                variant="default"
              />
              <StatTile
                label="Total Entries"
                value={stats.totalEntries}
                icon={CreditCardIcon}
                variant="accent"
              />
            </div>
          </div>

          {/* Guest Lookup */}
          <div>
            <h3 className="text-lg font-semibold text-purple-100 mb-4">
              Guest Lookup
            </h3>
            <div className="flex gap-3">
              <TerminalInput
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                placeholder="Enter guest code..."
                maxLength={4}
                className="flex-1 uppercase font-mono"
              />
              <Button
                onClick={handleSearch}
                disabled={searchCode.length !== 4}
                className="bg-purple-600 hover:bg-purple-500"
              >
                <SearchIcon className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            {foundGuest && (
              <div className="mt-4 p-4 bg-purple-950/30 border border-purple-400/20 rounded-lg">
                <div className="flex items-start gap-4">
                  {foundGuest.photo ? (
                    <div className="galactic-photo-frame">
                      <img
                        src={foundGuest.photo}
                        alt={foundGuest.name}
                        className="galactic-photo w-16 h-16"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded border-2 border-purple-400/30 bg-purple-950/50 flex items-center justify-center text-xl font-bold text-purple-400/80">
                      {getGuestInitials(foundGuest.name)}
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-lg font-bold text-purple-100">
                      {foundGuest.name}
                    </p>
                    <p className="text-sm text-purple-300/70">
                      Code: {foundGuest.code} | Status: {foundGuest.status}
                    </p>
                    <p className="text-sm text-purple-300/70">
                      Agent Code: {foundGuest.agentCode}
                    </p>
                    <p className="text-sm text-purple-300/70">
                      Visa Class: {foundGuest.visaClass}
                    </p>
                    <p className="text-sm text-purple-300/70">
                      Printed: {foundGuest.printed ? "Yes" : "No"} | Arrived: {foundGuest.arrived ? "Yes" : "No"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReprintVisa(foundGuest.code)}
                      className="border-purple-400/50 bg-transparent text-purple-100 hover:bg-purple-950/50 hover:text-white"
                    >
                      <PrinterIcon className="w-4 h-4 mr-1" />
                      Reprint
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOverrideRejection(foundGuest.code)}
                      className="border-amber-400/50 bg-transparent text-amber-100 hover:bg-amber-950/50 hover:text-white"
                    >
                      Override + Print
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleMarkArrived(foundGuest.code)}
                      className="bg-emerald-600 hover:bg-emerald-500"
                    >
                      <CheckCircleIcon className="w-4 h-4 mr-1" />
                      Mark Arrived
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* All Guests */}
          <div>
            <h3 className="text-lg font-semibold text-purple-100 mb-4">
              All Guests ({guests.length})
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {guests.map((guest) => (
                <div
                  key={guest.code}
                  className="p-3 bg-slate-900/30 border border-purple-400/10 rounded flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {guest.photo ? (
                      <div className="galactic-photo-frame">
                        <img
                          src={guest.photo}
                          alt={guest.name}
                          className="galactic-photo w-10 h-10"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded border border-purple-400/30 bg-purple-950/50 flex items-center justify-center text-sm font-bold text-purple-400/80 shrink-0">
                        {getGuestInitials(guest.name)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-purple-100">
                        {guest.name}
                      </p>
                      <p className="text-xs text-purple-300/70">
                        {guest.code} | {guest.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {guest.printed && (
                      <span className="text-xs px-2 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded text-emerald-100">
                        Printed
                      </span>
                    )}
                    {guest.arrived && (
                      <span className="text-xs px-2 py-1 bg-purple-500/20 border border-purple-400/30 rounded text-purple-100">
                        Arrived
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Controls */}
          <div>
            <h3 className="text-lg font-semibold text-purple-100 mb-4">
              System Controls
            </h3>
            <div className="flex gap-3">
              <Button
                onClick={handlePrinterTest}
                variant="outline"
                className="border-purple-400/50 bg-transparent text-purple-100 hover:bg-purple-950/50 hover:text-white"
              >
                <PrinterIcon className="w-4 h-4 mr-2" />
                Run Printer Test
              </Button>
              <Button
                onClick={() => setIsAuthenticated(false)}
                variant="outline"
                className="border-red-400/50 bg-transparent text-red-100 hover:bg-red-950/50 hover:text-white"
              >
                Logout
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-100 mb-4">
              Print Manual Visa
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <TerminalInput
                value={manualVisaName}
                onChange={(e) => setManualVisaName(e.target.value)}
                placeholder="Guest name..."
              />
              <TerminalInput
                value={manualVisaAgentCode}
                onChange={(e) => setManualVisaAgentCode(e.target.value.toUpperCase())}
                placeholder="Agent code..."
              />
              <Button
                onClick={handleManualVisaPrint}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white"
              >
                <PrinterIcon className="w-4 h-4 mr-2" />
                Print manual visa
              </Button>
            </div>
          </div>
        </div>
      </TerminalFrame>
    </div>
  )
}