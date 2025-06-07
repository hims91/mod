"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Text3D, Environment } from "@react-three/drei"
import { Suspense } from "react"

function Logo3D() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={1.5}
        height={0.3}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[-2, 0, 0]}
      >
        MODERIX
        <meshStandardMaterial color="#3b82f6" />
      </Text3D>
    </Float>
  )
}

function ParticleField() {
  const particles = Array.from({ length: 50 }, (_, i) => (
    <Float key={i} speed={1 + Math.random()} rotationIntensity={1} floatIntensity={2}>
      <mesh position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color={Math.random() > 0.5 ? "#3b82f6" : "#06b6d4"} />
      </mesh>
    </Float>
  ))

  return <>{particles}</>
}

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.5, rotateY: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  }

  const progressVariants = {
    hidden: { width: "0%" },
    visible: {
      width: `${progress}%`,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* 3D Background */}
          <div className="absolute inset-0 opacity-30">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
              <Suspense fallback={null}>
                <Environment preset="night" />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <ParticleField />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
              </Suspense>
            </Canvas>
          </div>

          {/* Animated Grid Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
          </div>

          {/* Floating Geometric Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, 100, -100, 0],
                  y: [0, -100, 100, 0],
                  rotate: [0, 180, 360],
                  scale: [1, 1.5, 0.5, 1],
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <div
                  className={`w-4 h-4 ${
                    i % 3 === 0 ? "bg-primary/30" : i % 3 === 1 ? "bg-secondary/30" : "bg-accent/30"
                  } ${i % 2 === 0 ? "rounded-full" : "rounded-none rotate-45"}`}
                />
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center z-10 relative">
            {/* Logo */}
            <motion.div className="mb-8" variants={logoVariants}>
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-2xl blur-xl scale-110 animate-pulse" />

                {/* Logo Container */}
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-primary/50 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm flex items-center justify-center">
                  <Image
                    src="/images/moderix-logo.png"
                    alt="Moderix Solutions"
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain filter brightness-110"
                    priority
                  />

                  {/* Rotating Ring */}
                  <div className="absolute inset-0 border-2 border-transparent border-t-primary rounded-2xl animate-spin" />
                </div>
              </div>
            </motion.div>

            {/* Company Name */}
            <motion.div className="mb-2" variants={itemVariants}>
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-center">
                <span className="text-gradient bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  MODERIX
                </span>
              </h1>
            </motion.div>

            <motion.div className="mb-8" variants={itemVariants}>
              <p className="text-lg md:text-xl text-gray-300 text-center font-medium">Digital Solutions Agency</p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden mb-4 border border-gray-700"
              variants={itemVariants}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full relative"
                variants={progressVariants}
                animate="visible"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full animate-pulse" />
                <div className="absolute right-0 top-0 w-4 h-full bg-white/30 rounded-full blur-sm" />
              </motion.div>
            </motion.div>

            {/* Progress Text */}
            <motion.div className="text-sm text-gray-400 mb-4" variants={itemVariants}>
              Loading {Math.round(progress)}%
            </motion.div>

            {/* Loading Text */}
            <motion.div
              className="text-sm text-gray-500 text-center"
              variants={itemVariants}
              animate={{
                opacity: [0.5, 1, 0.5],
                transition: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            >
              Initializing Digital Solutions...
            </motion.div>

            {/* Floating Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/40 rounded-full"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${30 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, 15, -15, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.5, 0.8],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-3xl animate-pulse" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
