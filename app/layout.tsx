import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import LoadingScreen from "@/components/loading-screen"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" })

export const metadata: Metadata = {
  title: "Moderix Solutions | Digital Agency - Web Design, SEO & Marketing",
  description:
    "Professional digital agency offering web design, e-commerce development, SEO, digital marketing, and AI automation services. Starting at ₹3,999.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LoadingScreen />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
