"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Globe, ShoppingCart, Search, TrendingUp, Bot, ArrowRight, CheckCircle, BarChart } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { Float, OrbitControls, Text3D } from "@react-three/drei"
import { Suspense } from "react"

const services = [
  {
    icon: Globe,
    title: "Web Design & Development",
    subtitle: "Modern, Fast & Mobile-Friendly",
    description:
      "Custom websites that load fast and look stunning on every device. No templates, just pure custom design.",
    features: [
      "Custom design (no templates)",
      "Mobile responsive & lightweight",
      "Contact forms, WhatsApp button",
      "Google Indexing + Basic SEO",
      "Optimized for conversions",
    ],
    price: "Starting at ₹3,999",
    color: "from-blue-500/20 to-blue-600/20",
    size: "large",
    clickable: true,
    chatMessage:
      "I'm interested in web design and development services. Can you tell me more about your website packages?",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Development",
    subtitle: "Sell Online, Grow Fast",
    description: "Launch your online store with secure payment gateways, product management, and order tracking.",
    features: [
      "Product catalog & filters",
      "Secure checkout (UPI, Razorpay, Paytm)",
      "Coupon codes, shipping rules",
      "Admin dashboard",
      "WhatsApp order system",
    ],
    price: "Custom Quote",
    color: "from-green-500/20 to-green-600/20",
    size: "medium",
    clickable: true,
    chatMessage: "I want to create an e-commerce website. What features do you offer for online stores?",
  },
  {
    icon: Search,
    title: "Search Engine Optimization",
    subtitle: "Rank Higher. Get Organic Traffic",
    description: "Optimize your website to rank higher on Google and get more organic traffic that converts.",
    features: [
      "Keyword research + competitor analysis",
      "On-page SEO optimization",
      "Technical SEO fixes",
      "Backlink building",
      "Monthly performance reports",
    ],
    price: "Result-oriented packages",
    color: "from-purple-500/20 to-purple-600/20",
    size: "medium",
    clickable: true,
    chatMessage: "I need SEO services to improve my website ranking. What SEO packages do you offer?",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    subtitle: "Promote Your Brand Like a Pro",
    description: "Manage paid ad campaigns, social media, and email marketing to get real leads and engagement.",
    features: [
      "Google Ads (Search & Display)",
      "Meta Ads (Facebook & Instagram)",
      "Social Media Content Planning",
      "Email Marketing",
      "Analytics & ROI reporting",
    ],
    price: "Ad spend optimized",
    color: "from-orange-500/20 to-orange-600/20",
    size: "small",
    clickable: true,
    chatMessage: "I'm looking for digital marketing services. How can you help me promote my brand online?",
  },
  {
    icon: Bot,
    title: "AI Chatbots & Automation",
    subtitle: "24x7 Smart Support",
    description: "Engage visitors, answer FAQs, and convert leads automatically using intelligent AI chatbots.",
    features: [
      "WhatsApp chatbots",
      "Website chatbots for leads",
      "Booking system integrations",
      "E-commerce AI helpers",
      "CRM & automation tools",
    ],
    price: "No-code or custom",
    color: "from-cyan-500/20 to-cyan-600/20",
    size: "medium",
    clickable: true,
    chatMessage: "I want to implement AI chatbots for my business. What automation solutions do you provide?",
  },
  {
    icon: BarChart,
    title: "Analytics & Reporting",
    subtitle: "Data-Driven Decisions",
    description: "Know what's working and where to improve with detailed performance analytics and reports.",
    features: [
      "Website traffic analysis",
      "Conversion tracking",
      "User behavior insights",
      "Competitor benchmarking",
      "Monthly performance reports",
    ],
    price: "Included with services",
    color: "from-amber-500/20 to-amber-600/20",
    size: "small",
    clickable: true,
    chatMessage: "I'm interested in analytics and reporting services. What kind of insights do you provide?",
  },
]

function ServiceIcon3D() {
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
            SERVICES
            <meshStandardMaterial color="#3b82f6" />
          </Text3D>
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Suspense>
    </Canvas>
  )
}

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const handleServiceClick = (service: any) => {
    if (service.clickable) {
      // Scroll to contact section
      const contactSection = document.getElementById("contact")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" })

        // Wait for scroll to complete, then trigger chat message
        setTimeout(() => {
          // Dispatch custom event to trigger chat message
          window.dispatchEvent(
            new CustomEvent("triggerChatMessage", {
              detail: { message: service.chatMessage },
            }),
          )
        }, 1000)
      }
    }
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
    hidden: { y: 60, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const getCardSize = (size: string) => {
    const desktopClasses = {
      large: "lg:col-span-2 lg:row-span-2 lg:h-80",
      medium: "lg:col-span-1 lg:row-span-2 lg:h-80",
      small: "lg:col-span-1 lg:row-span-1 lg:h-36",
    }

    const mobileClasses = "col-span-1 h-48"
    return `${mobileClasses} ${desktopClasses[size as keyof typeof desktopClasses] || desktopClasses.small}`
  }

  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden">
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
            <ServiceIcon3D />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-heading font-bold mb-6">
            Complete <span className="text-gradient italic">Digital Solutions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            From stunning websites to powerful SEO and AI tools, we offer everything your business needs to grow online
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-4 gap-4 md:gap-6 max-w-6xl mx-auto"
        >
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`${getCardSize(service.size)} group relative cursor-pointer`}
                onClick={() => handleServiceClick(service)}
              >
                <div className="glass rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border border-white/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20 transition-all duration-500 relative overflow-hidden h-full flex flex-col justify-between">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                  ></div>

                  {/* Price Badge */}
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-primary/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-primary border border-primary/30">
                    {service.price}
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <div className="mb-3 md:mb-4">
                      <div
                        className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${service.color.replace(
                          "/20",
                          "/30",
                        )} p-3 md:p-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-white/10`}
                      >
                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base mb-2">{service.subtitle}</p>
                      <p className="text-xs md:text-sm text-gray-300 mb-3 line-clamp-2">{service.description}</p>

                      {/* Features - Show only for larger cards */}
                      {service.size !== "small" && (
                        <ul className="space-y-1 mb-3">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="text-xs text-gray-400 flex items-center gap-1">
                              <div className="w-1 h-1 bg-primary rounded-full"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Arrow Icon */}
                    <div className="mt-3 md:mt-4 self-end">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Pricing Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 max-w-4xl mx-auto"
          id="pricing"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Our <span className="text-gradient">₹3,999</span> Website Plan
            </h3>
            <p className="text-gray-300">For Startups, Shops, & Creators</p>
          </div>

          <div className="glass rounded-2xl p-6 md:p-8 border border-white/10">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={20} />
                  What's Included
                </h4>
                <ul className="space-y-3">
                  {[
                    "5-Page Responsive Website",
                    "Contact Form Integration",
                    "Speed Optimization",
                    "WhatsApp Chat Button",
                    "Basic SEO Setup",
                    "Free Hosting Setup Help",
                    "Delivery in 5–7 Days",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="text-green-500 shrink-0" size={16} />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold mb-4">Perfect For</h4>
                  <p className="text-gray-300 mb-4">
                    Local businesses, freelancers, homepreneurs, & small startups looking for a professional online
                    presence without breaking the bank.
                  </p>
                </div>

                <motion.a
                  href="#contact"
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full font-medium text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 mt-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book My Website Now
                  <ArrowRight size={18} />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-medium text-white hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 text-sm md:text-base"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start Your Project Today</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
