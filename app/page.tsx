"use client"

import { useEffect, useState } from "react"
import LoadingScreen from "@/components/loading-screen"
import Navbar from "@/components/navbar"
import HeroSectionNew from "@/components/hero-section-new"
import ServicesSection from "@/components/services-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import AIChatSection from "@/components/ai-chat-section"
import GlobalBackground from "@/components/global-background"
import SectionIndicators from "@/components/section-indicators"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GlobalBackground />
      <Navbar />
      <main>
        <HeroSectionNew />
        <ServicesSection />
        <ProjectsSection />
        <AIChatSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <SectionIndicators />
    </div>
  )
}
