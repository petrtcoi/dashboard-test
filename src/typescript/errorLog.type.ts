export type ErrorLog = {
  date: number
  id: string | null
  action: string
  message?: string
}

export function logError(id: string | null, action: string, message?: string): ErrorLog {
  return ({ id, action, message, date: Date.now() })
} 