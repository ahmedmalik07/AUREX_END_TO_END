import { useState, useCallback } from "react"
import { API_BASE } from "@/lib/config"

export function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const post = useCallback(async (endpoint: string, body: any) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      return data
    } catch (err: any) {
      setError(err.message || "Request failed")
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const upload = useCallback(async (endpoint: string, file: File) => {
    setLoading(true)
    setError(null)
    const form = new FormData()
    form.append("file", file)
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, { method: "POST", body: form })
      if (!res.ok) throw new Error(await res.text())
      return await res.json()
    } catch (err: any) {
      setError(err.message || "Upload failed")
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { loading, error, post, upload }
}
