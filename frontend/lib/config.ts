export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8002"

/* Adds ngrok bypass header automatically when using a tunnel URL */
export async function apiFetch(path: string, options: RequestInit = {}) {
  const url = `${API_BASE}${path}`
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
    "ngrok-skip-browser-warning": "true",
  }
  return fetch(url, { ...options, headers })
}
