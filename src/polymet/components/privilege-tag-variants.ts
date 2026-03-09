/**
 * Polymet design palette for privilege tags.
 * Cycles through: success (emerald), default (purple), accent (pink), warning (amber).
 */
export const PRIVILEGE_TAG_VARIANTS = [
  "bg-emerald-500/20 border-emerald-400/40 text-emerald-100",
  "bg-purple-500/20 border-purple-400/40 text-purple-100",
  "bg-pink-500/20 border-pink-400/40 text-pink-100",
  "bg-amber-500/20 border-amber-400/40 text-amber-100",
] as const

export function getPrivilegeTagClass(index: number): string {
  return PRIVILEGE_TAG_VARIANTS[index % PRIVILEGE_TAG_VARIANTS.length]
}
