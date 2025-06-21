import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from '@/providers/providers'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AiVerse - The AI Marketplace Where Agents Go Onchain",
  description:
    "Build AI agents with real-world powers. An extensible framework that blends LLM reasoning with actionable tools.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>

        <link rel="icon" href="/favicon.ico" />
        
      </head>
      <body>
        <Providers>
          {/* <Navbar/> */}
          {children}
        </Providers>
        
      </body>
    </html>
  )
}
