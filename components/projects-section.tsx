"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useAnimation, type PanInfo } from "framer-motion"
import { ExternalLink, Github, ChevronLeft, ChevronRight, Globe, Target, Newspaper, Code } from "lucide-react"
import Image from "next/image"
import { Canvas } from "@react-three/fiber"
import { Float, Text3D, OrbitControls } from "@react-three/drei"
import { Suspense } from "react"

const projects = [
  {
    title: "Lynklet.com",
    description:
      "A modern link-in-bio platform for creators and businesses to showcase all their important links in one place.",
    longDescription:
      "Lynklet is a powerful link-in-bio platform designed for creators, influencers, and businesses. It offers customizable profiles, analytics tracking, and integration with major social platforms to help users maximize their online presence.",
    tags: ["Next.js", "Tailwind CSS", "MongoDB", "Analytics"],
    image: "/images/portfolio/lynklet.png",
    links: {
      demo: "https://lynklet.com",
      github: "#",
    },
    features: ["Custom Profiles", "Analytics Dashboard", "Social Media Integration", "Mobile Optimization"],
    color: "from-blue-500/20 to-purple-500/20",
    icon: Globe,
  },
  {
    title: "24SevenNews.com",
    description:
      "A comprehensive news portal delivering real-time updates across various categories with personalized content recommendations.",
    longDescription:
      "24SevenNews is a modern news platform that delivers breaking news, in-depth analysis, and feature stories across multiple categories. The site includes advanced search functionality, personalized content recommendations, and a responsive design for optimal viewing on any device.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    image: "/images/portfolio/24sevennews.png",
    links: {
      demo: "https://24sevennews.com",
      github: "#",
    },
    features: ["Real-time Updates", "Category Filtering", "User Accounts", "Responsive Design"],
    color: "from-red-500/20 to-orange-500/20",
    icon: Newspaper,
  },
  {
    title: "WildSlate.com",
    description:
      "An innovative content management system designed specifically for wildlife conservation organizations and researchers.",
    longDescription:
      "WildSlate is a specialized CMS built for wildlife conservation organizations. It features custom data visualization tools, research publication management, and interactive maps to help organizations showcase their conservation efforts and research findings effectively.",
    tags: ["Vue.js", "Firebase", "GIS Mapping", "Data Visualization"],
    image: "/images/portfolio/wildslate.png",
    links: {
      demo: "https://wildslate.com",
      github: "#",
    },
    features: ["Interactive Maps", "Research Database", "Donation System", "Media Gallery"],
    color: "from-green-500/20 to-emerald-500/20",
    icon: Target,
  },
  {
    title: "Custom E-Commerce Platform",
    description:
      "A fully-featured e-commerce solution with inventory management, payment processing, and customer relationship tools.",
    longDescription:
      "This custom e-commerce platform provides businesses with everything they need to sell online. It includes inventory management, multiple payment gateways, customer accounts, order tracking, and detailed analytics to help optimize sales and marketing strategies.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
    image: "/placeholder.svg?height=600&width=800",
    links: {
      demo: "#",
      github: "#",
    },
    features: ["Product Management", "Payment Processing", "Order Tracking", "Customer Accounts"],
    color: "from-purple-500/20 to-pink-500/20",
    icon: Code,
  },
]

function Portfolio3D() {
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
            position={[-3.5, 0, 0]}
          >
            PORTFOLIO
            <meshStandardMaterial color="#3b82f6" />
          </Text3D>
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Suspense>
    </Canvas>
  )
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1, fallback: true })
  const controls = useAnimation()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const projectsRef = useRef<HTMLDivElement>(null)
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 })

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.1,
        },
      },
    },
    cardVariants = {
      hidden: { y: 30, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      },
    },
    itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    }

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x > threshold) {
      prevProject()
    } else if (info.offset.x < -threshold) {
      nextProject()
    }
  }

  const getProjectIcon = (index: number) => {
    const Icon = projects[index].icon || Globe
    return <Icon className="w-5 h-5 text-white" />
  }

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(var(--primary),0.1),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
          style={{ opacity: 1 }}
        >
          <div className="h-32 mb-8 relative">
            <Portfolio3D />
          </div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Work That <span className="text-gradient">Speaks</span> For Itself
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-300 max-w-2xl mx-auto">
            Explore our portfolio of successful projects delivered with excellence and precision
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4"
          ></motion.div>
        </motion.div>

        <div className="relative" ref={projectsRef}>
          {/* Desktop Navigation Arrows */}
          <div className="hidden lg:flex absolute top-1/2 -left-12 transform -translate-y-1/2 z-20">
            <motion.button
              onClick={prevProject}
              className="p-3 rounded-full glass hover:bg-card/50 transition-colors"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </motion.button>
          </div>

          <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
            <motion.button
              onClick={nextProject}
              className="p-3 rounded-full glass hover:bg-card/50 transition-colors"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Project Content with Swipe Support */}
          <div className="overflow-hidden">
            <motion.div
              key={activeIndex}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="grid md:grid-cols-2 gap-8 items-center project-card"
              drag="x"
              dragConstraints={{ left: -100, right: 100 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            >
              {/* Project Image */}
              <motion.div
                className="relative group order-2 md:order-1"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-white/10">
                    <Image
                      src={projects[activeIndex].image || "/placeholder.svg"}
                      alt={projects[activeIndex].title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Floating Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.a
                      href={projects[activeIndex].links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16} />
                    </motion.a>
                    <motion.a
                      href={projects[activeIndex].links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              {/* Project Details */}
              <motion.div className="space-y-6 order-1 md:order-2" variants={itemVariants}>
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br ${projects[activeIndex].color} border border-white/10`}
                  >
                    {getProjectIcon(activeIndex)}
                  </div>
                  <span className="text-sm text-gray-400">
                    Project {activeIndex + 1} of {projects.length}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold">{projects[activeIndex].title}</h3>

                <p className="text-gray-300 leading-relaxed">
                  {isExpanded ? projects[activeIndex].longDescription : projects[activeIndex].description}
                </p>

                <motion.button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-primary hover:text-secondary transition-colors text-sm font-medium"
                  whileHover={{ x: 5 }}
                >
                  {isExpanded ? "Show Less" : "Read More"}
                </motion.button>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold">Key Features</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {projects[activeIndex].features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {projects[activeIndex].tags.map((tag, idx) => (
                      <motion.span
                        key={idx}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm border border-white/20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <motion.a
                    href={projects[activeIndex].links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full font-medium text-white flex items-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={16} />
                    View Live
                  </motion.a>
                  <motion.a
                    href={projects[activeIndex].links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white/10 border border-white/20 rounded-full font-medium text-white flex items-center gap-2 hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={16} />
                    Source Code
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Project Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "bg-primary scale-125" : "bg-white/30 hover:bg-white/50"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`View project ${idx + 1}`}
              />
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex lg:hidden justify-center gap-4 mt-8">
            <motion.button
              onClick={prevProject}
              className="p-3 rounded-full glass hover:bg-card/50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous project"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              onClick={nextProject}
              className="p-3 rounded-full glass hover:bg-card/50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next project"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-medium text-white hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start Your Project</span>
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
