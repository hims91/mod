"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Globe, Users, Award, TrendingUp, Target, Zap } from "lucide-react"

export default function AboutSectionAgency() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1, fallback: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const stats = [
    { icon: Users, value: "500+", label: "Projects Completed", color: "text-primary" },
    { icon: Award, value: "99%", label: "Client Satisfaction", color: "text-secondary" },
    { icon: TrendingUp, value: "5+", label: "Years Experience", color: "text-accent" },
    { icon: Target, value: "24/7", label: "Support Available", color: "text-primary" },
  ]

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(var(--primary),0.1),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto" ref={ref}>
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-heading font-bold mb-4">
              About <span className="text-gradient">Moderix Solutions</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              We are a digital agency dedicated to helping businesses grow online through innovative web solutions,
              strategic marketing, and cutting-edge technology.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"
            ></motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="glass rounded-2xl p-6 text-center border border-white/10 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold mb-2 text-gradient">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Who We Are</h3>
                  <p className="text-primary font-medium">Your Digital Growth Partner</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                Moderix Solutions is a full-service digital agency specializing in web development, SEO, digital
                marketing, and AI automation. We help businesses of all sizes establish a strong online presence and
                achieve sustainable growth.
              </p>

              <p className="text-gray-300 leading-relaxed">
                Our team combines technical expertise with creative innovation to deliver solutions that not only look
                great but also drive real business results. From custom websites to comprehensive digital marketing
                strategies, we're here to help you succeed online.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="glass rounded-xl p-4 border border-white/10">
                  <Zap className="w-6 h-6 text-primary mb-2" />
                  <h4 className="font-semibold mb-1">Fast Delivery</h4>
                  <p className="text-sm text-gray-400">Quick turnaround times without compromising quality</p>
                </div>
                <div className="glass rounded-xl p-4 border border-white/10">
                  <Target className="w-6 h-6 text-secondary mb-2" />
                  <h4 className="font-semibold mb-1">Result-Focused</h4>
                  <p className="text-sm text-gray-400">Every project is designed to achieve your business goals</p>
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="glass rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold mb-6">Why Choose Moderix Solutions?</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">Affordable Pricing</h4>
                      <p className="text-sm text-gray-400">
                        Professional websites starting at just ₹3,999 with no hidden costs
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary mb-1">Complete Solutions</h4>
                      <p className="text-sm text-gray-400">
                        From design to marketing, we handle everything under one roof
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-accent mb-1">Proven Results</h4>
                      <p className="text-sm text-gray-400">
                        500+ successful projects with 99% client satisfaction rate
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">Ongoing Support</h4>
                      <p className="text-sm text-gray-400">
                        24/7 support and maintenance to keep your business running smoothly
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="text-center">
                  <h4 className="text-lg font-bold mb-2">Ready to Grow Your Business?</h4>
                  <p className="text-sm text-gray-400 mb-4">
                    Let's discuss how we can help you achieve your digital goals
                  </p>
                  <motion.a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Free Consultation
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
