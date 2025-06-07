"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Send, Phone, Mail, MapPin, CheckCircle, ArrowRight, MessageCircle } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { Float, Text3D, OrbitControls } from "@react-three/drei"
import { Suspense } from "react"
import { AnimatePresence } from "framer-motion"

function Contact3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <Text3D
            font="/fonts/Inter_Bold.json"
            size={1.5}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            position={[-2.5, 0, 0]}
          >
            CONTACT
            <meshStandardMaterial color="#3b82f6" />
          </Text3D>
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Suspense>
    </Canvas>
  )
}

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const controls = useAnimation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        budget: "",
        message: "",
      })
    }, 3000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: "+91-9876543210",
      subtitle: "Mon-Sat, 9 AM - 7 PM IST",
      action: "tel:+919876543210",
      color: "from-green-500/20 to-green-600/20",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: "+91-9876543210",
      subtitle: "Quick responses guaranteed",
      action: "https://wa.me/919876543210",
      color: "from-green-500/20 to-green-600/20",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@moderixsolutions.com",
      subtitle: "We reply within 2 hours",
      action: "mailto:hello@moderixsolutions.com",
      color: "from-blue-500/20 to-blue-600/20",
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Mumbai, India",
      subtitle: "Serving clients globally",
      action: "#",
      color: "from-purple-500/20 to-purple-600/20",
    },
  ]

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-32 mb-8 relative">
            <Contact3D />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-heading font-bold mb-6">
            Let's Build Something <span className="text-gradient">Amazing</span> Together
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            Whether you're starting or scaling—Moderix is your digital partner
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Get In Touch</h3>
              <p className="text-gray-300 mb-8">
                Ready to transform your digital presence? Our team is here to help you every step of the way.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <motion.a
                    key={index}
                    href={info.action}
                    target={info.action.startsWith("http") ? "_blank" : "_self"}
                    rel={info.action.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="glass rounded-2xl p-6 border border-white/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20 transition-all duration-500 group block"
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative overflow-hidden">
                      {/* Background Gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                      ></div>

                      <div className="relative z-10">
                        {/* Icon */}
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color.replace(
                            "/20",
                            "/30",
                          )} p-3 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-white/10 mb-4`}
                        >
                          <Icon className="w-6 h-6 text-primary" />
                        </div>

                        {/* Content */}
                        <h4 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors duration-300">
                          {info.title}
                        </h4>
                        <p className="text-gray-300 font-medium mb-1">{info.details}</p>
                        <p className="text-sm text-gray-400">{info.subtitle}</p>

                        {/* Arrow */}
                        <div className="mt-4 flex justify-end">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                )
              })}
            </div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-xl font-bold">Quick Actions</h4>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="https://wa.me/919876543210?text=Hi! I'm interested in your ₹3,999 website package. Can you tell me more?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full font-medium text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle size={18} />
                  WhatsApp Us Now
                </motion.a>
                <motion.a
                  href="#pricing"
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full font-medium text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start With ₹3,999 Website
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 relative overflow-hidden">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6">Request a Quote</h3>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <CheckCircle size={32} className="text-white" />
                      </motion.div>
                      <h4 className="text-xl font-bold text-green-500 mb-2">Message Sent!</h4>
                      <p className="text-gray-300">
                        Thank you for your interest. Our team will contact you within 2 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-primary transition-colors"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-primary transition-colors"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-primary transition-colors"
                            placeholder="+91 9876543210"
                          />
                        </div>
                        <div>
                          <label htmlFor="service" className="block text-sm font-medium mb-2">
                            Service Needed *
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-primary transition-colors"
                          >
                            <option value="">Select a service</option>
                            <option value="website">Website Development</option>
                            <option value="ecommerce">E-Commerce Store</option>
                            <option value="seo">SEO & Digital Marketing</option>
                            <option value="ai">AI Chatbots & Automation</option>
                            <option value="maintenance">Website Maintenance</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium mb-2">
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-primary transition-colors"
                        >
                          <option value="">Select budget range</option>
                          <option value="3999">₹3,999 - Basic Website</option>
                          <option value="10000">₹10,000 - ₹25,000</option>
                          <option value="25000">₹25,000 - ₹50,000</option>
                          <option value="50000">₹50,000 - ₹1,00,000</option>
                          <option value="100000">₹1,00,000+</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Project Details *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-primary transition-colors resize-none"
                          placeholder="Tell us about your project requirements..."
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl font-medium text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* FAQ Preview */}
        <motion.div
          className="mt-24 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h3>
            <p className="text-gray-300">Quick answers to common questions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "What's included in ₹3,999?",
                answer:
                  "5-page responsive website, contact forms, WhatsApp integration, basic SEO, and hosting setup help.",
              },
              {
                question: "How long will it take?",
                answer:
                  "Basic websites are delivered in 5-7 days. Complex projects may take 2-4 weeks depending on requirements.",
              },
              {
                question: "Can I get custom design?",
                answer: "Yes! All our websites are custom-designed from scratch. No templates or copy-paste themes.",
              },
              {
                question: "Will it rank on Google?",
                answer:
                  "We include basic SEO setup with every website. For advanced SEO, we offer dedicated SEO packages.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="glass rounded-xl p-6 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <h4 className="font-bold mb-2 text-primary">{faq.question}</h4>
                <p className="text-gray-300 text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
