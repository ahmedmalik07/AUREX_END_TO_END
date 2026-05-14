import "./globals.css"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import Navbar from "@/components/Navbar"
import { PitchModeProvider } from "@/components/PitchModeToggle"
import { LanguageProvider } from "@/components/LanguageContext"
import { LiteModeProvider } from "@/components/LiteModeContext"
import PWARegister from "@/components/PWARegister"
import dynamic from "next/dynamic"

const AtomChatbot = dynamic(() => import("@/components/AtomChatbot"), { ssr: false })

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" })

export const metadata = {
  title: "AtomCamp Smart LMS",
  description: "AI-powered adaptive learning platform for Pakistan's tech education — personalized for how you learn best.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AtomCamp",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
}

export const viewport = {
  themeColor: "#00ED64",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="AtomCamp" />
        <meta name="application-name" content="AtomCamp" />
        <meta name="msapplication-TileColor" content="#020c1b" />
      </head>
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans bg-ink-950 text-ink-300 min-h-screen relative`}>
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-ink-900/40 rounded-full blur-[120px]" />
        </div>
        <LanguageProvider>
          <LiteModeProvider>
            <PitchModeProvider>
              <div className="relative z-10">
                <Navbar />
                <main>{children}</main>
                <AtomChatbot />
                <PWARegister />
              </div>
            </PitchModeProvider>
          </LiteModeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
