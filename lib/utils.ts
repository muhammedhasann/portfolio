import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function asset(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}
