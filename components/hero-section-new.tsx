"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { ArrowRight, CheckCircle, Star } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { Float, OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei"
import { Suspense } from "react"

function FloatingElements() {
  return (
    <Canvas className="absolute inset-0 z-0">
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[1, 100, 200]} position={[-2, 0, 0]} scale={1.5}>
            <MeshDistortMaterial color="#3b82f6" attach="material" distort={0.4} speed={4} roughness={0.5} />
          </Sphere>
        </Float>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere args={[1, 100, 200]} position={[2, -1, -2]} scale={0.8}>
            <MeshDistortMaterial color="#06b6d4" attach="material" distort={0.3} speed={3} roughness={0.4} />
          </Sphere>
        </Float>
        <Float speed={3} rotationIntensity={0.7} floatIntensity={1.5}>
          <Sphere args={[1, 100, 200]} position={[3, 2, -4]} scale={1.2}>
            <MeshDistortMaterial color="#8b5cf6" attach="material" distort={0.5} speed={2} roughness={0.3} />
          </Sphere>
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Suspense>
    </Canvas>
  )
}

export default function HeroSectionNew() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <FloatingElements />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px] z-0"></div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="text-center md:text-left"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="text-xs font-medium text-primary">India's Most Affordable Web Agency</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-primary text-primary" />
                ))}
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight"
            >
              Grow Online.{" "}
              <span className="text-gradient bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Stay Ahead.
              </span>{" "}
              Be Seen.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto md:mx-0"
            >
              India's Most Affordable & Creative Web Design, SEO & AI Solutions Agency – Starting at just ₹3,999!
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <motion.a
                href="#pricing"
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full font-medium text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get a Website for ₹3,999
                <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="#contact"
                className="px-6 py-3 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full font-medium text-white flex items-center justify-center gap-2 hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Talk to Our Team
              </motion.a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={itemVariants} className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto md:mx-0">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  300+
                </div>
                <div className="text-xs md:text-sm text-gray-400">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  99%
                </div>
                <div className="text-xs md:text-sm text-gray-400">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  5+
                </div>
                <div className="text-xs md:text-sm text-gray-400">Years Experience</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - 3D Device Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md">
              {/* Laptop Mockup */}
              <div className="relative perspective-1000">
                <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-t-xl p-2 backdrop-blur-sm border border-white/10">
                  <div className="bg-gray-900 rounded-lg p-2">
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg aspect-video overflow-hidden">
                      {/* Website Preview */}
                      <div className="w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xl font-bold text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Moderix Solutions
                          </div>
                          <div className="text-xs text-gray-400">Digital Agency</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 h-3 rounded-b-xl border-t border-gray-700"></div>
                <div className="bg-gray-900 h-1 w-24 mx-auto rounded-b-xl"></div>
              </div>

              {/* Mobile Mockup - Positioned to the right */}
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-1/3">
                <div className="bg-gray-800 rounded-2xl p-1 border border-gray-700">
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl aspect-[9/16] overflow-hidden">
                    {/* Mobile Preview */}
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-8 h-1 bg-gray-700 rounded-full absolute top-1"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tablet Mockup - Positioned to the left */}
              <div className="absolute -left-8 bottom-0 w-1/3">
                <div className="bg-gray-800 rounded-xl p-1 border border-gray-700 rotate-12">
                  <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg aspect-[4/3] overflow-hidden">
                    {/* Tablet Preview */}
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-gray-700 rounded-full absolute bottom-1"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
                className="absolute -top-6 -right-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg shadow-green-500/20 border-2 border-white/20"
              >
                <div className="text-xs">Starting at</div>
                <div className="text-xl font-bold">₹3,999</div>
                <div className="text-xs">only</div>
              </motion.div>

              {/* Floating Features */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute -left-16 top-1/4"
              >
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border border-white/10 flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-xs">Mobile Responsive</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="absolute -right-20 top-2/3"
              >
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border border-white/10 flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-xs">SEO Optimized</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className="absolute bottom-0 left-1/3"
              >
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border border-white/10 flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-xs">Fast Loading</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
