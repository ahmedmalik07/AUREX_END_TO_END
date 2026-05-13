import "./globals.css"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import Navbar from "@/components/Navbar"
import { PitchModeProvider } from "@/components/PitchModeToggle"
import dynamic from "next/dynamic"

const AtomChatbot = dynamic(() => import("@/components/AtomChatbot"), { ssr: false })

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" })

export const metadata = {
  title: "AtomCamp Smart LMS",
  description: "Adaptive learning intelligence for atomcamp",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans bg-ink-950 text-ink-300 min-h-screen relative`}>
        {/* Deep, layered radial gradients for glow effect */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-ink-900/40 rounded-full blur-[120px]" />
        </div>
        <PitchModeProvider>
          <div className="relative z-10">
            <Navbar />
            <main>{children}</main>
            <AtomChatbot />
          </div>
        </PitchModeProvider>
      </body>
    </html>
  )
}

