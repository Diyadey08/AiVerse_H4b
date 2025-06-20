"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Bot,
  Zap,
  Brain,
  Puzzle,
  Package,
  Cloud,
  Terminal,
  ImageIcon,
  FolderOpen,
  Music,
  Mail,
  MailOpen,
  Globe,
  Search,
  Plane,
  Youtube,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
  Sparkles,
  Rocket,
  Shield,
  Coins,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"

const tools = [
  { id: "getWeather", name: "Weather", icon: Cloud, description: "Fetches current weather data" },
  { id: "executeShell", name: "Shell", icon: Terminal, description: "Runs terminal commands" },
  { id: "generateImage", name: "Image Gen", icon: ImageIcon, description: "AI-powered image generation" },
  { id: "analyzeSrcStructure", name: "Code Analysis", icon: FolderOpen, description: "Analyzes project structure" },
  { id: "musicMood", name: "Music Mood", icon: Music, description: "Detects mood from music" },
  { id: "sendEmail", name: "Send Email", icon: Mail, description: "Sends Gmail messages" },
  { id: "readEmail", name: "Read Email", icon: MailOpen, description: "Reads from Gmail inbox" },
  { id: "webSearch", name: "Web Search", icon: Globe, description: "Real-time search" },
  { id: "scrapeDocsTool", name: "Web Scraper", icon: Search, description: "Scrapes websites for content" },
  { id: "fetchFlightDetails", name: "Flight Info", icon: Plane, description: "Live flight information" },
  { id: "fetchYouTubeVideo", name: "YouTube", icon: Youtube, description: "YouTube content interaction" },
]

const features = [
  {
    icon: Zap,
    title: "Dynamic Tool Execution",
    description: "Let your agent run real-time tasks like web searches, shell commands, sending emails, and more.",
  },
  {
    icon: Brain,
    title: "Prompt Playground",
    description: "Test and iterate prompts with live AI feedback in an intuitive interface.",
  },
  {
    icon: Puzzle,
    title: "Selective Tool Use",
    description: "Only enable what each agent needs with granular tool selection.",
  },
  {
    icon: Package,
    title: "Fully Modular",
    description: "Add new tools via clean APIs and extend functionality seamlessly.",
  },
]

const roadmapItems = [
  { icon: Puzzle, title: "Multi-tool support", status: "completed" },
  { icon: Brain, title: "Vector-based memory system", status: "in-progress" },
  { icon: Shield, title: "OAuth user accounts", status: "planned" },
  { icon: Zap, title: "Toolchain builder", status: "planned" },
  { icon: Coins, title: "NFT-powered assets", status: "planned" },
]

function GlowingOrb({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-xl opacity-20 ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        delay,
      }}
    />
  )
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

export default function AiVerseLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black dark:from-black dark:via-purple-950/20 dark:to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <GlowingOrb className="w-96 h-96 bg-purple-600 top-1/4 left-1/4" delay={0} />
        <GlowingOrb className="w-64 h-64 bg-blue-600 top-3/4 right-1/4" delay={1} />
        <GlowingOrb className="w-48 h-48 bg-purple-400 top-1/2 right-1/3" delay={2} />
        <FloatingParticles />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">AiVerse</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#tools" className="text-gray-300 hover:text-white transition-colors">
              Tools
            </a>
            <a href="#roadmap" className="text-gray-300 hover:text-white transition-colors">
              Roadmap
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-gray-300 hover:text-white"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-purple-500/20 p-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#tools" className="text-gray-300 hover:text-white transition-colors">
                Tools
              </a>
              <a href="#roadmap" className="text-gray-300 hover:text-white transition-colors">
                Roadmap
              </a>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white w-full">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm">The Future of AI Agents</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              AiVerse
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                The AI Marketplace Where Agents Go Onchain
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Build AI agents with real-world powers. An extensible framework that blends LLM reasoning with actionable
              tools, right from your browser.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Launch Agent
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-3"
            >
              View Demo
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="relative bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tools.slice(0, 8).map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="bg-black/40 border border-purple-500/20 rounded-lg p-4 text-center hover:border-purple-400/40 transition-colors"
                  >
                    <tool.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <span className="text-white text-sm">{tool.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Features at a Glance</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to build, test, and deploy intelligent AI agents
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-black/40 border-purple-500/20 hover:border-purple-400/40 transition-colors h-full">
                  <CardContent className="p-6">
                    <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Built-in Toolbelt</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powerful tools that extend your AI agents' capabilities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/40 transition-all cursor-pointer"
              >
                <tool.icon className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">{tool.name}</h3>
                <p className="text-gray-300 text-sm">{tool.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Roadmap</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Our journey to revolutionize AI agent development</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4 mb-8"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    item.status === "completed"
                      ? "bg-green-500/20 border-green-500"
                      : item.status === "in-progress"
                        ? "bg-purple-500/20 border-purple-500"
                        : "bg-gray-500/20 border-gray-500"
                  } border-2`}
                >
                  <item.icon
                    className={`w-6 h-6 ${
                      item.status === "completed"
                        ? "text-green-400"
                        : item.status === "in-progress"
                          ? "text-purple-400"
                          : "text-gray-400"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <span
                    className={`text-sm ${
                      item.status === "completed"
                        ? "text-green-400"
                        : item.status === "in-progress"
                          ? "text-purple-400"
                          : "text-gray-400"
                    }`}
                  >
                    {item.status === "completed"
                      ? "✅ Completed"
                      : item.status === "in-progress"
                        ? "🚧 In Progress"
                        : "📋 Planned"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Build the Future?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the revolution and start building AI agents that can actually do things.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Building
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-3"
              >
                View Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AiVerse</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>© 2024 AiVerse. Building the future of AI agents.</p>
              <p className="text-sm mt-1">Because building smart agents should be as flexible as your ideas. 🔥</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
