"use client"

import { useEffect, useState } from "react"

export default function PWARegister() {
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((reg) => {
        reg.addEventListener("updatefound", () => {
          const worker = reg.installing
          if (!worker) return
          worker.addEventListener("statechange", () => {
            if (worker.state === "installed" && navigator.serviceWorker.controller) {
              setUpdateAvailable(true)
            }
          })
        })
      })
      .catch(() => {})
  }, [])

  if (!updateAvailable) return null

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#00ED64] text-black text-sm font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2">
      <span>Update available</span>
      <button
        onClick={() => window.location.reload()}
        className="underline hover:no-underline"
      >
        Reload
      </button>
    </div>
  )
}
