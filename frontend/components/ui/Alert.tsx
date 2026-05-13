import * as React from "react"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle, Info } from "lucide-react"

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "error"
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const icon =
      variant === "success" ? <CheckCircle size={18} /> : variant === "error" ? <AlertCircle size={18} /> : <Info size={18} />
    const colors =
      variant === "success"
        ? "border-accent-500/20 text-accent-400 bg-accent-500/10"
        : variant === "error"
        ? "border-rose-500/20 text-rose-400 bg-rose-500/10"
        : "border-brand-500/20 text-brand-400 bg-brand-500/10"

    return (
      <div ref={ref} className={cn("flex items-start gap-3 rounded-lg border p-4", colors, className)} {...props}>
        <div className="mt-0.5 shrink-0">{icon}</div>
        <div className="text-sm">{children}</div>
      </div>
    )
  }
)
Alert.displayName = "Alert"

export { Alert }
