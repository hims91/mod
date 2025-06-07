"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Phone, Mail } from "lucide-react"

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const whatsappNumber = "+919876543210" // Replace with actual number
  const message = "Hi! I'm interested in your digital services. Can you help me?"

  useEffect(() => {
    // Show WhatsApp button after loading animation (3 seconds)
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  const handleCallClick = () => {
    window.open(`tel:${whatsappNumber}`, "_self")
  }

  const handleEmailClick = () => {
    window.open("mailto:hello@moderixsolutions.com", "_self")
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mb-4 space-y-3"
          >
            {/* WhatsApp Option */}
            <motion.button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-3 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 group"
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={20} />
              <span className="text-sm font-medium whitespace-nowrap">WhatsApp Chat</span>
            </motion.button>

            {/* Call Option */}
            <motion.button
              onClick={handleCallClick}
              className="flex items-center gap-3 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 group"
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={20} />
              <span className="text-sm font-medium whitespace-nowrap">Call Now</span>
            </motion.button>

            {/* Email Option */}
            <motion.button
              onClick={handleEmailClick}
              className="flex items-center gap-3 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg transition-all duration-300 group"
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} />
              <span className="text-sm font-medium whitespace-nowrap">Email Us</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 relative overflow-hidden group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(34, 197, 94, 0.4)",
            "0 0 0 10px rgba(34, 197, 94, 0)",
            "0 0 0 0 rgba(34, 197, 94, 0)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Icon */}
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }} className="relative z-10">
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </motion.div>

        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none"
          >
            Need Help? Contact Us!
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
