import { WorkId } from "./work.type"

export type ErrorLog = {
  date: number
  id: WorkId | null
  action: string
  message?: string
}

export function logError(id: WorkId | null, action: string, message?: string): ErrorLog {
  return ({ id, action, message, date: Date.now() })
} 