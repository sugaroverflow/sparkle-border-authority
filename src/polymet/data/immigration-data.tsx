export type GuestStatus = "Visitor" | "Diplomat" | "VIP" | "Special Envoy" | "Citizen"
export type PassportType = "visitor" | "fancy"
export type VisaClass =
  | "Citizen Entry Visa"
  | "Diplomatic Entry Visa"
  | "Special Envoy Visa"
  | "Visitor Admission Permit"
  | "Sparkle Transit Waiver"
  | "Temporary Celebration Authorization"

export interface GuestRecord {
  code: string
  name: string
  agentCode: string
  status: GuestStatus
  photo?: string
  passportType: PassportType
  visaClass: VisaClass
  validityMinutes: number
  basePrivileges: string[]
  printed: boolean
  arrived: boolean
  /** When true, guest is always approved regardless of purposes/declarations. */
  diplomaticImmunity?: boolean
  /** Optional custom alert shown on identity confirmation (e.g. celebratory or warning). Message can use "(name)" for guest name. */
  customAlert?: { variant: "celebratory" | "warning" | "cute"; message: string }
}

export interface ApplicationSubmission {
  guestCode: string
  purposeOfVisit: string[]
  declarations: string[]
  secondaryScreening: boolean
  secondaryAnswer?: string
  decision: "approved" | "rejected" | "pending"
  rejectionReason?: string
  retryCaption?: string
  assignedPrivileges?: string[]
  visaNumber?: string
  issueTimestamp?: string
}

export interface Statistics {
  visasIssuedTonight: number
  visitorsUnderReview: number
  sparkleComplianceRate: number
  borderMoodIndex: string
  totalEntries: number
  rejections: number
  citizensAdmitted: number
  borderPassports: number
  visitorPasscards: number
  photoPermits: number
  declarationsReceived: number
}

interface PersistedGuestFlags {
  printed: boolean
  arrived: boolean
}

type PersistedGuestMap = Record<string, PersistedGuestFlags>

export interface FormOption {
  value: string
  label: string
  icon: string
}

export type DocumentType =
  | "citizen-passport"
  | "border-passport"
  | "visitor-passcard"
  | "photo-permit"

export interface ValidationResult {
  valid: boolean
  reason?: string
  retryCaption?: string
}

type GuestRegistryRecord = Partial<GuestRecord> & { code?: string; name?: string }

export const purposeOptions: FormOption[] = [
  { value: "cake-acquisition", label: "Cake Acquisition", icon: "🎂" },
  { value: "diplomacy", label: "Diplomacy", icon: "🤝" },
  { value: "bringing-sparkles", label: "Bringing Sparkles", icon: "✨" },
  { value: "dancefloor-transit", label: "Dancefloor Transit", icon: "💃" },
  { value: "polaroid-documentation", label: "Polaroid Documentation", icon: "📸" },
  { value: "bureaucratic-chaos", label: "Bureaucratic Chaos", icon: "📋" },
  { value: "birthday-shenanigans", label: "Birthday Shenanigans", icon: "🎉" },
  { value: "glitter-trade", label: "Glitter Trade Negotiations", icon: "💎" },
]

export const declarationOptions: FormOption[] = [
  { value: "sparkles", label: "Sparkles", icon: "✨" },
  { value: "snacks", label: "Snacks", icon: "🍿" },
  { value: "diplomatic-intent", label: "Diplomatic Intent", icon: "🤝" },
  { value: "glitter-residue", label: "Glitter Residue", icon: "💫" },
  { value: "emotional-support", label: "Emotional Support", icon: "💝" },
  { value: "excellent-vibes", label: "Excellent Vibes", icon: "🌟" },
  { value: "nothing", label: "Nothing to Declare", icon: "⭕" },
]

export const randomPrivilegePool = [
  "Glitter Transit Waiver",
  "Galactic Trade Authorization",
]

export const allPrivileges = [
  "Standard Sparkle Protocol",
  "Lounge Access",
  ...randomPrivilegePool,
]

export const mockGuests: GuestRecord[] = [
  {
    code: "A7K2",
    name: "Edward",
    agentCode: "Galaxy",
    status: "VIP",
    photo: "https://github.com/yusufhilmi.png",
    passportType: "fancy",
    visaClass: "Citizen Entry Visa",
    validityMinutes: 240,
    basePrivileges: ["Standard Sparkle Protocol", "Lounge Access"],
    printed: false,
    arrived: false,
  },
  {
    code: "B3M9",
    name: "Jordan",
    agentCode: "Comet",
    status: "Diplomat",
    photo: "https://github.com/kdrnp.png",
    passportType: "fancy",
    visaClass: "Diplomatic Entry Visa",
    validityMinutes: 300,
    basePrivileges: ["Lounge Access"],
    printed: false,
    arrived: false,
    diplomaticImmunity: true,
  },
  {
    code: "C5T1",
    name: "Sam",
    agentCode: "Nebula",
    status: "Visitor",
    photo: "https://github.com/yahyabedirhan.png",
    passportType: "visitor",
    visaClass: "Visitor Admission Permit",
    validityMinutes: 180,
    basePrivileges: ["Standard Sparkle Protocol"],
    printed: false,
    arrived: false,
  },
  {
    code: "D8P4",
    name: "Riley",
    agentCode: "Starfield",
    status: "Special Envoy",
    photo: "https://github.com/denizbuyuktas.png",
    passportType: "fancy",
    visaClass: "Citizen Entry Visa",
    validityMinutes: 360,
    basePrivileges: ["Lounge Access", "Standard Sparkle Protocol"],
    printed: false,
    arrived: false,
  },
]

export const mockStatistics: Statistics = {
  visasIssuedTonight: 42,
  visitorsUnderReview: 3,
  sparkleComplianceRate: 98.7,
  borderMoodIndex: "Celebratory",
  totalEntries: 87,
  rejections: 5,
  citizensAdmitted: 28,
  borderPassports: 12,
  visitorPasscards: 18,
  photoPermits: 9,
  declarationsReceived: 74,
}

export const secondaryScreeningQuestions = [
  {
    question: "How much cake do you intend to acquire?",
    options: ["A modest slice", "A generous portion", "All of it", "Just a taste"],
  },
  {
    question: "What is the nature of your sparkle cargo?",
    options: ["Decorative", "Functional", "Classified", "Emotional"],
  },
  {
    question: "Are you currently carrying diplomatic glitter?",
    options: ["Yes, properly sealed", "No", "It's complicated", "I plead the fifth"],
  },
]

function rejection(reason: string, retryCaption: string): ValidationResult {
  return { valid: false, reason, retryCaption }
}

export function validateApplication(purposes: string[], declarations: string[]): ValidationResult {
  if (purposes.length === 0) {
    return rejection("Application Incomplete", "Select 1-2 purposes of visit to continue.")
  }

  if (purposes.length > 2) {
    return rejection("Application Incomplete", "Choose no more than two purposes.")
  }

  if (declarations.length === 0) {
    return rejection("Insufficient Declaration", "Select at least one item to declare.")
  }

  if (declarations.includes("nothing")) {
    return rejection(
      "Border Authority Not Yet Convinced",
      'Sparkle Beauocracy is not convinced that you have Nothing to Declare'
    )
  }

  if (purposes.includes("diplomacy") && !declarations.includes("diplomatic-intent")) {
    return rejection(
      "Diplomatic Credentials Unverified",
      'Select "Diplomatic Intent" when visiting for diplomacy.'
    )
  }

  if (
    purposes.includes("bringing-sparkles") &&
    !declarations.includes("sparkles") &&
    !declarations.includes("glitter-residue")
  ) {
    return rejection(
      "Sparkle Mismatch Detected",
      'Declare "Sparkles" or "Glitter Residue" when bringing sparkles.'
    )
  }

  return { valid: true }
}

export function shouldTriggerSecondaryScreening(): boolean {
  return Math.random() < 0.075
}

export function assignPrivileges(guest: GuestRecord): string[] {
  const privileges = [...guest.basePrivileges]
  const available = randomPrivilegePool.filter((p) => !privileges.includes(p))

  if (available.length > 0) {
    const randomPrivilege = available[Math.floor(Math.random() * available.length)]
    privileges.push(randomPrivilege)
  }

  return privileges
}

export function generateVisaNumber(): string {
  const year = new Date().getFullYear()
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let suffix = ""
  for (let i = 0; i < 4; i++) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return `RC-${year}-${suffix}`
}

export const visaCopyMessages = [
  "Authorized for celebratory presence.",
  "Admitted under sparkle regulations.",
  "Subject to cake availability.",
  "Border Authority welcomes compliant guests.",
]

export const agentCodePool = [
  "Galaxy",
  "Comet",
  "Starfield",
  "Nebula",
  "Glitter",
  "Stardust",
  "Aurora",
  "Cosmos",
  "Supernova",
]

let guestRegistry: GuestRecord[] = [...mockGuests]
let runtimeVisaCopyMessages: string[] = [...visaCopyMessages]
let runtimeAgentCodePool: string[] = [...agentCodePool]
let initializationPromise: Promise<void> | null = null
const GUEST_STATE_KEY = "sparkle_border_guest_state_v1"
const STATS_KEY = "sparkle_border_stats_v1"

let runtimeStats: Statistics = { ...mockStatistics }

function hasBrowserStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined"
}

function loadPersistedGuestMap(): PersistedGuestMap {
  if (!hasBrowserStorage()) return {}
  try {
    const raw = window.localStorage.getItem(GUEST_STATE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as PersistedGuestMap
  } catch {
    return {}
  }
}

function savePersistedGuestMap(map: PersistedGuestMap): void {
  if (!hasBrowserStorage()) return
  window.localStorage.setItem(GUEST_STATE_KEY, JSON.stringify(map))
}

function applyPersistedGuestFlags(): void {
  const persisted = loadPersistedGuestMap()
  guestRegistry = guestRegistry.map((guest) => {
    const flags = persisted[guest.code]
    if (!flags) return guest
    return {
      ...guest,
      printed: Boolean(flags.printed),
      arrived: Boolean(flags.arrived),
    }
  })
}

function loadRuntimeStats(): void {
  if (!hasBrowserStorage()) {
    runtimeStats = { ...mockStatistics }
    return
  }

  try {
    const raw = window.localStorage.getItem(STATS_KEY)
    if (!raw) {
      runtimeStats = { ...mockStatistics }
      return
    }

    const parsed = JSON.parse(raw) as Partial<Statistics>
    runtimeStats = {
      ...mockStatistics,
      ...parsed,
    }
  } catch {
    runtimeStats = { ...mockStatistics }
  }
}

function saveRuntimeStats(): void {
  if (!hasBrowserStorage()) return
  window.localStorage.setItem(STATS_KEY, JSON.stringify(runtimeStats))
}

function updateDerivedStats(): void {
  const total = Math.max(runtimeStats.totalEntries, 1)
  runtimeStats.sparkleComplianceRate = Number(((runtimeStats.visasIssuedTonight / total) * 100).toFixed(1))
  runtimeStats.visitorsUnderReview = runtimeStats.rejections
  runtimeStats.declarationsReceived = runtimeStats.totalEntries
  runtimeStats.borderMoodIndex =
    runtimeStats.sparkleComplianceRate >= 95
      ? "Celebratory"
      : runtimeStats.sparkleComplianceRate >= 85
      ? "Watchful"
      : "Skeptical"
}

function normalizeStatus(status: string | undefined): GuestStatus {
  const value = status ?? "Visitor"
  if (value === "Visitor" || value === "Diplomat" || value === "VIP" || value === "Special Envoy") {
    return value
  }
  if (value === "Citizen") {
    return "Citizen"
  }
  return "Visitor"
}

function normalizePassportType(passportType: string | undefined): PassportType {
  if (passportType === "fancy") return "fancy"
  return "visitor"
}

function normalizeVisaClass(visaClass: string | undefined): VisaClass {
  if (
    visaClass === "Citizen Entry Visa" ||
    visaClass === "Diplomatic Entry Visa" ||
    visaClass === "Special Envoy Visa" ||
    visaClass === "Visitor Admission Permit" ||
    visaClass === "Sparkle Transit Waiver" ||
    visaClass === "Temporary Celebration Authorization"
  ) {
    return visaClass
  }
  return "Visitor Admission Permit"
}

function normalizeGuest(guest: GuestRegistryRecord): GuestRecord | null {
  if (!guest.code || !guest.name) {
    return null
  }

  const isEdward = guest.name.toLowerCase().includes("edward")
  return {
    code: guest.code.toUpperCase(),
    name: isEdward ? "Edward" : guest.name,
    agentCode: isEdward ? "Galaxy" : guest.agentCode ?? runtimeAgentCodePool[0] ?? "Galaxy",
    status: normalizeStatus(guest.status as string | undefined),
    photo: guest.photo,
    passportType: normalizePassportType(guest.passportType as string | undefined),
    visaClass: normalizeVisaClass(guest.visaClass as string | undefined),
    validityMinutes: Number(guest.validityMinutes ?? 180),
    basePrivileges: Array.isArray(guest.basePrivileges) ? guest.basePrivileges : ["Standard Sparkle Protocol"],
    printed: Boolean(guest.printed),
    arrived: Boolean(guest.arrived),
    diplomaticImmunity: Boolean(guest.diplomaticImmunity),
    customAlert: guest.customAlert,
  }
}

export async function initializeImmigrationData(): Promise<void> {
  if (initializationPromise) return initializationPromise

  initializationPromise = (async () => {
    try {
      const [guestsRes, taglinesRes, agentCodesRes] = await Promise.all([
        fetch("/guests.json"),
        fetch("/visa-taglines.json"),
        fetch("/agent-codes.json"),
      ])

      if (agentCodesRes.ok) {
        const loadedCodes = (await agentCodesRes.json()) as string[]
        if (Array.isArray(loadedCodes) && loadedCodes.length > 0) {
          runtimeAgentCodePool = loadedCodes
        }
      }

      if (taglinesRes.ok) {
        const loadedTaglines = (await taglinesRes.json()) as string[]
        if (Array.isArray(loadedTaglines) && loadedTaglines.length > 0) {
          runtimeVisaCopyMessages = loadedTaglines
        }
      }

      if (guestsRes.ok) {
        const loadedGuests = (await guestsRes.json()) as GuestRegistryRecord[]
        const normalized = loadedGuests
          .map((guest) => normalizeGuest(guest))
          .filter((guest): guest is GuestRecord => guest !== null)
        if (normalized.length > 0) {
          guestRegistry = normalized
        }
      }
    } catch {
      // Fallback to in-memory defaults when static JSON cannot be loaded.
    }

    applyPersistedGuestFlags()
    loadRuntimeStats()
    updateDerivedStats()
    saveRuntimeStats()
  })()

  await initializationPromise
}

export function getAllGuests(): GuestRecord[] {
  return guestRegistry
}

export function findGuestByCode(code: string): GuestRecord | undefined {
  return guestRegistry.find((guest) => guest.code.toLowerCase() === code.toLowerCase())
}

export function getRandomVisaCopyMessage(): string {
  const messages = runtimeVisaCopyMessages.length > 0 ? runtimeVisaCopyMessages : visaCopyMessages
  return messages[Math.floor(Math.random() * messages.length)]
}

export function markGuestPrinted(code: string): void {
  const normalizedCode = code.toUpperCase()
  guestRegistry = guestRegistry.map((guest) =>
    guest.code === normalizedCode ? { ...guest, printed: true } : guest
  )

  const persisted = loadPersistedGuestMap()
  persisted[normalizedCode] = {
    printed: true,
    arrived: persisted[normalizedCode]?.arrived ?? false,
  }
  savePersistedGuestMap(persisted)
}

export function markGuestArrived(code: string): void {
  const normalizedCode = code.toUpperCase()
  guestRegistry = guestRegistry.map((guest) =>
    guest.code === normalizedCode ? { ...guest, arrived: true } : guest
  )

  const persisted = loadPersistedGuestMap()
  persisted[normalizedCode] = {
    printed: persisted[normalizedCode]?.printed ?? false,
    arrived: true,
  }
  savePersistedGuestMap(persisted)
}

export function recordDecision(decision: "approved" | "rejected", status?: GuestStatus): void {
  runtimeStats.totalEntries += 1
  if (decision === "approved") {
    runtimeStats.visasIssuedTonight += 1
    if (status === "Citizen") runtimeStats.citizensAdmitted += 1
    if (status === "Visitor") runtimeStats.visitorPasscards += 1
    if (status === "Diplomat" || status === "Special Envoy" || status === "VIP") {
      runtimeStats.borderPassports += 1
    }
  } else {
    runtimeStats.rejections += 1
  }

  updateDerivedStats()
  saveRuntimeStats()
}

export function getRuntimeStatistics(): Statistics {
  return { ...runtimeStats }
}

export function createManualGuest(name: string, agentCode: string): GuestRecord {
  const safeCode = `MAN-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
  return {
    code: safeCode,
    name,
    agentCode,
    status: "Visitor",
    passportType: "visitor",
    visaClass: "Temporary Celebration Authorization",
    validityMinutes: 120,
    basePrivileges: ["Standard Sparkle Protocol"],
    printed: false,
    arrived: false,
    diplomaticImmunity: false,
  }
}

/** Register a visitor (no immigration code). Adds them to the registry and returns the guest. */
export function registerVisitorGuest(name: string, agentCode: string = "Visitor"): GuestRecord {
  const guest = createManualGuest(name.trim(), agentCode.trim() || "Visitor")
  guestRegistry = [...guestRegistry, guest]
  return guest
}
