import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGuestInitials(name: string, maxChars = 2): string {
  const normalized = name.trim();
  if (!normalized) return "?";

  return normalized
    .split(/\s+/)
    .map((word) => word[0] ?? "")
    .join("")
    .slice(0, maxChars)
    .toUpperCase() || "?";
}
