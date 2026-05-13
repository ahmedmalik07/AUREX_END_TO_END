import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  variant?: "default" | "success" | "danger"
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, variant = "default", ...props }, ref) => {
    const pct = Math.min(100, Math.max(0, (value / max) * 100))
    const barColor =
      variant === "success" ? "bg-accent-400" : variant === "danger" ? "bg-rose-500" : "bg-brand-500"
    return (
      <div ref={ref} className={cn("h-2 w-full overflow-hidden rounded-full bg-white/10", className)} {...props}>
        <div className={cn("h-full transition-all duration-500", barColor)} style={{ width: `${pct}%` }} />
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }
