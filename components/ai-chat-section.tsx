"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, MessageCircle, X, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

const botResponses = {
  greeting: [
    "Hello! I'm Moderix AI, your digital solutions assistant. How can I help you today?",
    "Hi there! Welcome to Moderix Solutions. I'm here to help you with all your digital needs!",
    "Greetings! I'm your AI assistant from Moderix. What can I help you with today?",
  ],
  services: [
    "We offer comprehensive digital solutions including:\n\n• Web Design & Development (starting at ₹3,999)\n• E-Commerce Development\n• SEO & Digital Marketing\n• AI Chatbots & Automation\n• Website Maintenance\n• Analytics & Reporting\n\nWhich service interests you most?",
    "Our main services include custom website development, e-commerce solutions, SEO optimization, digital marketing, and AI automation. We specialize in affordable, high-quality solutions starting from just ₹3,999. What specific service would you like to know more about?",
  ],
  pricing: [
    "Our pricing is transparent and affordable:\n\n🌟 Starter Website: ₹3,999\n• 5-page responsive website\n• Contact forms & WhatsApp integration\n• Basic SEO setup\n• Mobile optimization\n• 5-7 days delivery\n\nFor custom projects, we provide detailed quotes based on your requirements. Would you like a free consultation?",
    "We believe in affordable digital solutions! Our basic website package starts at just ₹3,999 and includes everything you need to get online. For e-commerce, SEO, and custom development, we provide personalized quotes. Shall I connect you with our team for a detailed discussion?",
  ],
  portfolio: [
    "We've successfully delivered 300+ projects including:\n\n• Lynklet.com - Link-in-bio platform\n• 24SevenNews.com - News portal\n• WildSlate.com - Conservation CMS\n• Various e-commerce stores\n• Business websites across industries\n\nWould you like to see more examples or discuss your project?",
    "Our portfolio showcases diverse projects from simple business websites to complex e-commerce platforms. We've worked with startups, local businesses, and established companies. Each project is custom-built to meet specific requirements. What type of website are you looking for?",
  ],
  contact: [
    "Great! Here are the ways to reach us:\n\n📱 WhatsApp: +91-9876543210\n📧 Email: hello@moderixsolutions.com\n🌐 Website: moderixsolutions.com\n\nOur team typically responds within 2 hours during business hours. Would you like me to connect you directly with our project manager?",
    "You can reach our team through multiple channels. The fastest way is WhatsApp at +91-9876543210. You can also email us at hello@moderixsolutions.com. We're available Monday to Saturday, 9 AM to 7 PM IST. How would you like to continue this conversation?",
  ],
  timeline: [
    "Our typical project timelines:\n\n⚡ Basic Website (₹3,999): 5-7 days\n🛒 E-commerce Store: 2-3 weeks\n🎨 Custom Design: 1-2 weeks\n📈 SEO Setup: 1 week\n🤖 AI Integration: 1-2 weeks\n\nTimelines may vary based on complexity and requirements. What's your target launch date?",
    "We pride ourselves on fast delivery! Most basic websites are completed within a week, while complex projects may take 2-4 weeks depending on features. We always provide realistic timelines upfront and keep you updated throughout the process. When do you need your project completed?",
  ],
  technology: [
    "We use modern, reliable technologies:\n\n🚀 Frontend: React, Next.js, Vue.js\n⚙️ Backend: Node.js, Python, PHP\n💾 Databases: MongoDB, PostgreSQL, MySQL\n☁️ Hosting: Vercel, AWS, DigitalOcean\n🎨 Design: Figma, Adobe Creative Suite\n\nAll our solutions are mobile-responsive and SEO-optimized. Any specific technology requirements?",
    "Our tech stack is chosen for performance, scalability, and maintainability. We specialize in modern frameworks like React and Next.js for fast, responsive websites. For e-commerce, we use proven platforms like Shopify or custom solutions. What type of functionality do you need?",
  ],
  default: [
    "I understand you're interested in our digital solutions. Could you please be more specific about what you're looking for? I can help with information about our services, pricing, portfolio, or connect you with our team.",
    "I'm here to help! You can ask me about our web development services, pricing, previous work, or how to get started with your project. What would you like to know more about?",
    "Thanks for your question! I can provide information about Moderix Solutions' services, pricing, timeline, or help you get in touch with our team. How can I assist you today?",
  ],
}

export default function AIChatSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Listen for custom events to trigger chat messages
    const handleTriggerMessage = (event: any) => {
      if (event.detail?.message) {
        setIsOpen(true)
        setIsMinimized(false)
        handleSendMessage(event.detail.message)
      }
    }

    window.addEventListener("triggerChatMessage", handleTriggerMessage)
    return () => window.removeEventListener("triggerChatMessage", handleTriggerMessage)
  }, [])

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)]
    }

    if (message.includes("service") || message.includes("what do you do") || message.includes("offer")) {
      return botResponses.services[Math.floor(Math.random() * botResponses.services.length)]
    }

    if (message.includes("price") || message.includes("cost") || message.includes("₹") || message.includes("3999")) {
      return botResponses.pricing[Math.floor(Math.random() * botResponses.pricing.length)]
    }

    if (
      message.includes("portfolio") ||
      message.includes("work") ||
      message.includes("example") ||
      message.includes("lynklet") ||
      message.includes("24seven") ||
      message.includes("wildslate")
    ) {
      return botResponses.portfolio[Math.floor(Math.random() * botResponses.portfolio.length)]
    }

    if (
      message.includes("contact") ||
      message.includes("reach") ||
      message.includes("phone") ||
      message.includes("email") ||
      message.includes("whatsapp")
    ) {
      return botResponses.contact[Math.floor(Math.random() * botResponses.contact.length)]
    }

    if (
      message.includes("time") ||
      message.includes("deadline") ||
      message.includes("delivery") ||
      message.includes("how long")
    ) {
      return botResponses.timeline[Math.floor(Math.random() * botResponses.timeline.length)]
    }

    if (
      message.includes("technology") ||
      message.includes("tech") ||
      message.includes("framework") ||
      message.includes("react") ||
      message.includes("next")
    ) {
      return botResponses.technology[Math.floor(Math.random() * botResponses.technology.length)]
    }

    if (message.includes("web") || message.includes("website") || message.includes("development")) {
      return "I'd be happy to help with website development! We create custom, responsive websites starting at just ₹3,999. Our websites include modern design, mobile optimization, contact forms, and basic SEO. What type of website are you looking to build?"
    }

    if (
      message.includes("ecommerce") ||
      message.includes("e-commerce") ||
      message.includes("online store") ||
      message.includes("shop")
    ) {
      return "Our e-commerce solutions are perfect for businesses wanting to sell online! We build custom online stores with secure payment gateways, inventory management, order tracking, and mobile optimization. Would you like to know more about our e-commerce packages?"
    }

    if (message.includes("seo") || message.includes("ranking") || message.includes("google")) {
      return "Our SEO services help your website rank higher on Google and get more organic traffic. We offer keyword research, on-page optimization, technical SEO, and monthly reporting. SEO is a long-term investment that brings consistent results. Interested in learning more?"
    }

    if (message.includes("ai") || message.includes("chatbot") || message.includes("automation")) {
      return "We specialize in AI chatbots and automation solutions! Our AI systems can handle customer inquiries 24/7, qualify leads, book appointments, and integrate with your existing systems. Perfect for improving customer service and reducing workload. What kind of automation are you looking for?"
    }

    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)]
  }

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim()
    if (!text) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(
      () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getBotResponse(text),
          isBot: true,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const openChat = () => {
    setIsOpen(true)
    setIsMinimized(false)
    if (messages.length === 0) {
      // Add welcome message
      const welcomeMessage: Message = {
        id: "welcome",
        text: "Hello! I'm Moderix AI, your digital solutions assistant. I can help you with information about our services, pricing, portfolio, and more. How can I assist you today?",
        isBot: true,
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }

  return (
    <>
      {/* Chat Section in Main Content */}
      <section id="chat" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>

        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-heading font-bold mb-6">
              Chat with Our <span className="text-gradient">AI Assistant</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Get instant answers about our services, pricing, and how we can help your business grow online
            </p>

            <motion.button
              onClick={openChat}
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-medium text-white flex items-center gap-3 mx-auto hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bot size={20} />
              Start Conversation
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={openChat}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(59, 130, 246, 0.4)",
                "0 0 0 10px rgba(59, 130, 246, 0)",
                "0 0 0 0 rgba(59, 130, 246, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
              opacity: 1,
              scale: isMinimized ? 0.3 : 1,
              y: isMinimized ? 300 : 0,
              height: isMinimized ? "60px" : "500px",
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 w-80 md:w-96 bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 z-50 overflow-hidden"
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Moderix AI</h3>
                  <p className="text-xs text-gray-400">Digital Solutions Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </motion.button>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={16} />
                </motion.button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          message.isBot
                            ? "bg-white/10 text-gray-100"
                            : "bg-gradient-to-r from-primary to-secondary text-white"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.isBot && <Bot size={16} className="text-primary mt-0.5 shrink-0" />}
                          <div>
                            <p className="text-sm whitespace-pre-line">{message.text}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                          {!message.isBot && <User size={16} className="text-white mt-0.5 shrink-0" />}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/10 p-3 rounded-2xl">
                        <div className="flex items-center gap-2">
                          <Bot size={16} className="text-primary" />
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-full text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                    <motion.button
                      onClick={() => handleSendMessage()}
                      disabled={!inputValue.trim() || isTyping}
                      className="p-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Send size={16} />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
