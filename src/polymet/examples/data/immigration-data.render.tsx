import {
  mockGuests,
  mockStatistics,
  purposeOptions,
  declarationOptions,
  allPrivileges,
  type GuestRecord,
  type Statistics,
} from "@/polymet/data/immigration-data"

export default function ImmigrationDataRender() {
  return (
    <div className="p-8 space-y-8 bg-background">
      <div>
        <h2 className="text-2xl font-bold mb-4">Mock Guest Records</h2>
        <div className="space-y-4">
          {mockGuests.map((guest) => (
            <div key={guest.code} className="p-4 border border-border rounded-lg bg-card">
              <div className="flex items-center gap-4 mb-2">
                {guest.photo && (
                  <img src={guest.photo} alt={guest.name} className="w-12 h-12 rounded-full" />
                )}
                <div>
                  <p className="font-semibold">{guest.name}</p>
                  <p className="text-sm text-muted-foreground">Code: {guest.code}</p>
                </div>
              </div>
              <p className="text-sm">Status: {guest.status}</p>
              <p className="text-sm">Visa Class: {guest.visaClass}</p>
              <p className="text-sm">Passport Type: {guest.passportType}</p>
              <p className="text-sm">Base Privileges: {guest.basePrivileges.join(", ") || "None"}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Purpose Options</h2>
        <div className="grid grid-cols-2 gap-3">
          {purposeOptions.map((option) => (
            <div key={option.value} className="p-3 border border-border rounded-lg bg-card">
              <span className="text-2xl mr-2">{option.icon}</span>
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Declaration Options</h2>
        <div className="grid grid-cols-2 gap-3">
          {declarationOptions.map((option) => (
            <div key={option.value} className="p-3 border border-border rounded-lg bg-card">
              <span className="text-2xl mr-2">{option.icon}</span>
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">All Privileges</h2>
        <div className="grid grid-cols-2 gap-2">
          {allPrivileges.map((privilege) => (
            <div key={privilege} className="p-2 border border-border rounded bg-card text-sm">
              {privilege}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Statistics</h2>
        <div className="p-4 border border-border rounded-lg bg-card space-y-2">
          <p>Visas Issued Tonight: {mockStatistics.visasIssuedTonight}</p>
          <p>Visitors Under Review: {mockStatistics.visitorsUnderReview}</p>
          <p>Sparkle Compliance Rate: {mockStatistics.sparkleComplianceRate}%</p>
          <p>Border Mood Index: {mockStatistics.borderMoodIndex}</p>
          <p>Total Entries: {mockStatistics.totalEntries}</p>
          <p>Rejections: {mockStatistics.rejections}</p>
        </div>
      </div>
    </div>
  )
}