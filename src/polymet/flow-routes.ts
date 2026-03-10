const toCsv = (values: string[]): string =>
  values
    .map((value) => value.trim())
    .filter(Boolean)
    .join(",")

export const parseCsvParam = (value: string | null): string[] =>
  (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)

export const parseBooleanParam = (value: string | null): boolean =>
  value === "true" || value === "1"

const withQuery = (path: string, params: Record<string, string | undefined>): string => {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (!value) continue
    query.set(key, value)
  }
  const serialized = query.toString()
  return serialized ? `${path}?${serialized}` : path
}

export const createApplicationId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  return `app-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export const toIdentityConfirmationRoute = (code: string): string =>
  withQuery("/identity-confirmation", { code })

export const toPurposeOfVisitRoute = (code: string): string =>
  withQuery("/purpose-of-visit", { code })

export const toDeclarationsRoute = (code: string, purposes: string[]): string =>
  withQuery("/declarations", { code, purposes: toCsv(purposes) })

export const toProcessingRoute = (code: string, purposes: string[], declarations: string[]): string =>
  withQuery("/processing", {
    code,
    purposes: toCsv(purposes),
    declarations: toCsv(declarations),
  })

export const toSecondaryScreeningRoute = (
  code: string,
  purposes: string[],
  declarations: string[],
  applicationId: string
): string =>
  withQuery("/secondary-screening", {
    code,
    purposes: toCsv(purposes),
    declarations: toCsv(declarations),
    applicationId,
  })

export interface ApprovedDecisionRouteParams {
  code: string
  purposes: string[]
  declarations: string[]
  privileges: string[]
  visaNumber: string
  timestamp: string
  applicationId: string
  secondary?: boolean
  override?: boolean
}

export const toApprovedDecisionRoute = (params: ApprovedDecisionRouteParams): string =>
  withQuery("/decision", {
    code: params.code,
    decision: "approved",
    purposes: toCsv(params.purposes),
    declarations: toCsv(params.declarations),
    privileges: toCsv(params.privileges),
    visaNumber: params.visaNumber,
    timestamp: params.timestamp,
    secondary: params.secondary ? "true" : undefined,
    override: params.override ? "1" : undefined,
    applicationId: params.applicationId,
  })

export interface RejectedDecisionRouteParams {
  code: string
  reason: string
  retryCaption: string
  applicationId: string
}

export const toRejectedDecisionRoute = (params: RejectedDecisionRouteParams): string =>
  withQuery("/decision", {
    code: params.code,
    decision: "rejected",
    reason: params.reason,
    retryCaption: params.retryCaption,
    applicationId: params.applicationId,
  })

export interface PrintPreviewRouteParams {
  code?: string
  visaNumber: string
  purposes: string[]
  declarations: string[]
  privileges: string[]
  timestamp: string
  secondary?: boolean
  reprint?: boolean
  manual?: boolean
  manualName?: string
  manualAgentCode?: string
  applicationId?: string
}

export const toPrintPreviewRoute = (params: PrintPreviewRouteParams): string =>
  withQuery("/print-preview", {
    code: params.code,
    visaNumber: params.visaNumber,
    purposes: toCsv(params.purposes),
    declarations: toCsv(params.declarations),
    privileges: toCsv(params.privileges),
    timestamp: params.timestamp,
    secondary: params.secondary ? "true" : undefined,
    reprint: params.reprint ? "true" : undefined,
    manual: params.manual ? "1" : undefined,
    manualName: params.manualName,
    manualAgentCode: params.manualAgentCode,
    applicationId: params.applicationId,
  })

export const toPrintSuccessRoute = (params: {
  code?: string
  secondary?: boolean
  manual?: boolean
  manualName?: string
  manualAgentCode?: string
  manualValidity?: number
  applicationId?: string
  printedConfirmed?: boolean
  printProofToken?: string
}): string =>
  withQuery("/print-success", {
    code: params.code,
    secondary: params.secondary ? "true" : undefined,
    manual: params.manual ? "1" : undefined,
    manualName: params.manualName,
    manualAgentCode: params.manualAgentCode,
    manualValidity: params.manualValidity ? String(params.manualValidity) : undefined,
    applicationId: params.applicationId,
    printedConfirmed: params.printedConfirmed ? "1" : undefined,
    printProofToken: params.printProofToken,
  })
