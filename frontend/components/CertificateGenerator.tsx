"use client"

import { useRef } from "react"
import { Award } from "lucide-react"

interface Props {
  studentName: string
  courseName: string
  learningStyle: string
  completionDate?: string
}

export default function CertificateGenerator({ studentName, courseName, learningStyle, completionDate }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generate = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 1200
    canvas.height = 850

    // Background
    const bg = ctx.createLinearGradient(0, 0, 1200, 850)
    bg.addColorStop(0, "#020c1b")
    bg.addColorStop(0.5, "#040f22")
    bg.addColorStop(1, "#020c1b")
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, 1200, 850)

    // Outer border
    ctx.strokeStyle = "#00ED64"
    ctx.lineWidth = 3
    ctx.strokeRect(30, 30, 1140, 790)

    // Inner border
    ctx.strokeStyle = "rgba(0,237,100,0.3)"
    ctx.lineWidth = 1
    ctx.strokeRect(44, 44, 1112, 762)

    // Corner accents
    const corners = [[30,30],[1170,30],[30,820],[1170,820]]
    corners.forEach(([x,y]) => {
      ctx.fillStyle = "#00ED64"
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fill()
    })

    // Top decorative dots pattern
    ctx.fillStyle = "rgba(0,237,100,0.08)"
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 12; j++) {
        ctx.beginPath()
        ctx.arc(60 + i * 55, 60 + j * 65, 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Glow circle background
    const glow = ctx.createRadialGradient(600, 425, 0, 600, 425, 350)
    glow.addColorStop(0, "rgba(0,237,100,0.06)")
    glow.addColorStop(1, "transparent")
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, 1200, 850)

    // AtomCamp logo area
    ctx.fillStyle = "#00ED64"
    ctx.font = "bold 16px 'Arial', sans-serif"
    ctx.textAlign = "center"
    ctx.letterSpacing = "4px"
    ctx.fillText("A T O M C A M P", 600, 110)

    ctx.fillStyle = "rgba(255,255,255,0.4)"
    ctx.font = "12px Arial"
    ctx.fillText("SMART LEARNING MANAGEMENT SYSTEM", 600, 132)

    // Divider line
    ctx.strokeStyle = "rgba(0,237,100,0.4)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(200, 155)
    ctx.lineTo(1000, 155)
    ctx.stroke()

    // Certificate heading
    ctx.fillStyle = "rgba(255,255,255,0.5)"
    ctx.font = "14px Arial"
    ctx.letterSpacing = "6px"
    ctx.fillText("C E R T I F I C A T E", 600, 200)

    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 42px Georgia, serif"
    ctx.letterSpacing = "2px"
    ctx.fillText("of Completion", 600, 252)

    // "This is to certify" text
    ctx.fillStyle = "rgba(255,255,255,0.5)"
    ctx.font = "18px Arial"
    ctx.letterSpacing = "0px"
    ctx.fillText("This is to certify that", 600, 318)

    // Student name
    const nameGrad = ctx.createLinearGradient(400, 340, 800, 395)
    nameGrad.addColorStop(0, "#00ED64")
    nameGrad.addColorStop(1, "#4dffa8")
    ctx.fillStyle = nameGrad
    ctx.font = "bold 56px Georgia, serif"
    ctx.letterSpacing = "1px"
    ctx.fillText(studentName || "Student", 600, 390)

    // Underline for name
    const nameWidth = ctx.measureText(studentName || "Student").width
    ctx.strokeStyle = "rgba(0,237,100,0.5)"
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(600 - nameWidth / 2, 402)
    ctx.lineTo(600 + nameWidth / 2, 402)
    ctx.stroke()

    // "has successfully completed" text
    ctx.fillStyle = "rgba(255,255,255,0.5)"
    ctx.font = "18px Arial"
    ctx.letterSpacing = "0px"
    ctx.fillText("has successfully completed", 600, 448)

    // Course name
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 30px Georgia, serif"
    ctx.fillText(courseName, 600, 498)

    // Learning style badge
    const badgeWidth = 320
    const badgeX = 600 - badgeWidth / 2
    ctx.strokeStyle = "rgba(0,237,100,0.4)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ;(ctx as any).roundRect ? (ctx as any).roundRect(badgeX, 524, badgeWidth, 36, 18) : ctx.rect(badgeX, 524, badgeWidth, 36)
    ctx.stroke()
    ctx.fillStyle = "rgba(0,237,100,0.08)"
    ctx.fill()

    const styleName = learningStyle.charAt(0).toUpperCase() + learningStyle.slice(1)
    ctx.fillStyle = "#00ED64"
    ctx.font = "13px Arial"
    ctx.letterSpacing = "1px"
    ctx.fillText(`VARK CERTIFIED · ${styleName.toUpperCase()} LEARNER`, 600, 547)

    // Divider
    ctx.strokeStyle = "rgba(255,255,255,0.1)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(200, 592)
    ctx.lineTo(1000, 592)
    ctx.stroke()

    // Date and ID row
    const date = completionDate || new Date().toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })

    ctx.fillStyle = "rgba(255,255,255,0.35)"
    ctx.font = "13px Arial"
    ctx.letterSpacing = "0px"
    ctx.textAlign = "left"
    ctx.fillText("Date of Completion", 220, 630)
    ctx.fillStyle = "rgba(255,255,255,0.7)"
    ctx.font = "bold 15px Arial"
    ctx.fillText(date, 220, 652)

    ctx.textAlign = "right"
    ctx.fillStyle = "rgba(255,255,255,0.35)"
    ctx.font = "13px Arial"
    ctx.fillText("Certificate ID", 980, 630)
    ctx.fillStyle = "rgba(255,255,255,0.7)"
    ctx.font = "bold 13px 'Courier New'"
    const certId = `AC-${Date.now().toString(36).toUpperCase()}`
    ctx.fillText(certId, 980, 652)

    // Signature lines
    ctx.textAlign = "center"
    ctx.strokeStyle = "rgba(255,255,255,0.2)"
    ctx.lineWidth = 1

    // Left signature
    ctx.beginPath(); ctx.moveTo(280, 730); ctx.lineTo(480, 730); ctx.stroke()
    ctx.fillStyle = "rgba(255,255,255,0.6)"
    ctx.font = "bold 14px Arial"
    ctx.fillText("Instructor", 380, 752)
    ctx.fillStyle = "rgba(255,255,255,0.35)"
    ctx.font = "12px Arial"
    ctx.fillText("AtomCamp Faculty", 380, 768)

    // Right signature
    ctx.beginPath(); ctx.moveTo(720, 730); ctx.lineTo(920, 730); ctx.stroke()
    ctx.fillStyle = "rgba(255,255,255,0.6)"
    ctx.font = "bold 14px Arial"
    ctx.fillText("Program Director", 820, 752)
    ctx.fillStyle = "rgba(255,255,255,0.35)"
    ctx.font = "12px Arial"
    ctx.fillText("AtomCamp Institute", 820, 768)

    // Seal circle
    ctx.strokeStyle = "#00ED64"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(600, 720, 42, 0, Math.PI * 2)
    ctx.stroke()
    ctx.strokeStyle = "rgba(0,237,100,0.3)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(600, 720, 36, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fillStyle = "rgba(0,237,100,0.08)"
    ctx.beginPath()
    ctx.arc(600, 720, 42, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#00ED64"
    ctx.font = "bold 22px Georgia"
    ctx.fillText("AC", 600, 726)

    // Bottom tagline
    ctx.fillStyle = "rgba(255,255,255,0.2)"
    ctx.font = "11px Arial"
    ctx.letterSpacing = "2px"
    ctx.fillText("LEARNING THAT ADAPTS TO EVERY MIND · ATOMCAMP.COM", 600, 808)

    // Download
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `atomcamp-certificate-${(studentName || "student").toLowerCase().replace(/\s+/g, "-")}.png`
      a.click()
      URL.revokeObjectURL(url)
    }, "image/png")
  }

  return (
    <>
      <canvas ref={canvasRef} className="hidden" />
      <button
        onClick={generate}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00ED64] hover:bg-[#00c853] text-black font-semibold text-sm transition-colors shadow-[0_0_20px_rgba(0,237,100,0.3)]"
      >
        <Award size={16} /> Download Certificate
      </button>
    </>
  )
}
