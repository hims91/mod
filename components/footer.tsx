"use client"

import { motion } from "framer-motion"
import { ArrowUp, Heart, Globe, Shield, Award, Users } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
    { name: "Chat with AI", href: "#chat" },
  ]

  const services = [
    { name: "Web Development", href: "#services" },
    { name: "E-Commerce", href: "#services" },
    { name: "SEO Services", href: "#services" },
    { name: "Digital Marketing", href: "#services" },
    { name: "AI Chatbots", href: "#services" },
    { name: "Website Maintenance", href: "#services" },
  ]

  const trustBadges = [
    { icon: Shield, text: "100% Satisfaction" },
    { icon: Award, text: "Made in India" },
    { icon: Users, text: "300+ Happy Clients" },
    { icon: Globe, text: "Global Quality" },
  ]

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-white/10">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-primary/30">
                    <Image
                      src="/images/moderix-logo.png"
                      alt="Moderix Solutions"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl blur opacity-50"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Moderix Solutions
                  </h3>
                  <p className="text-sm text-gray-400">Digital Agency</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                India's most affordable & creative web design, SEO & AI solutions agency. We help businesses grow online
                with custom websites starting at just ₹3,999.
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3">
                {trustBadges.map((badge, index) => {
                  const Icon = badge.icon
                  return (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Icon size={16} className="text-primary" />
                      <span className="text-xs text-gray-300">{badge.text}</span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <div className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold mb-6 text-white">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a
                      href={service.href}
                      className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <div className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {service.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold mb-6 text-white">Get In Touch</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Phone</p>
                  <a
                    href="tel:+919876543210"
                    className="text-gray-300 hover:text-primary transition-colors duration-300"
                  >
                    +91-9876543210
                  </a>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Email</p>
                  <a
                    href="mailto:hello@moderixsolutions.com"
                    className="text-gray-300 hover:text-primary transition-colors duration-300"
                  >
                    hello@moderixsolutions.com
                  </a>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Location</p>
                  <p className="text-gray-300">Mumbai, India</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Business Hours</p>
                  <p className="text-gray-300">Mon-Sat, 9 AM - 7 PM IST</p>
                </div>
              </div>

              {/* CTA Button */}
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full font-medium text-white mt-6 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
                <ArrowUp size={16} className="rotate-45" />
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              className="text-gray-400 text-sm flex items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              © 2025 Moderix Solutions. All Rights Reserved. Made with{" "}
              <Heart size={14} className="text-red-500 fill-current" /> in India
            </motion.p>

            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Terms of Service
              </a>
              <motion.button
                onClick={scrollToTop}
                className="p-2 bg-white/10 hover:bg-primary/20 rounded-full transition-colors duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Scroll to top"
              >
                <ArrowUp size={16} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + i,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </footer>
  )
}
