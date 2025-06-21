"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  RocketIcon,
  Cloud,
  ImageIcon,
  RefreshCw,
  Mail,
  Globe,
  Plane,
  Youtube,
  Search,
  Music,
  Wand2,
  Calendar,
  Heart,
  Hotel,
  DollarSign,
  Wallet,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { generateText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { JSX } from "react"

const google = createGoogleGenerativeAI({
  apiKey: "AIzaSyAVQpop5MJZpJg2x3DhEfWs4nCFmOQ-Op0",
})

interface ChatSidebarProps {
  systemPrompt: string
  onSystemPromptChange: (prompt: string) => void
  selectedTools: string[]
  onToolsChange: (tools: string[]) => void
  onApplyConfig: () => void
  handleOpenDeployModal: () => void
  temperature: number
  onTemperatureChange: (temperature: number) => void
  topK: number
  onTopKChange: (topK: number) => void
  selectedModel: string
  onSelectedModelChange: (model: string) => void
  isCollapsed: boolean
  onToggleCollapse: () => void
}

interface Tool {
  id: string
  name: string
  icon: JSX.Element
  description: string
}

interface ToolCategory {
  name: string
  tools: Tool[]
}

export default function ChatSidebar({
  systemPrompt,
  onSystemPromptChange,
  selectedTools,
  onToolsChange,
  onApplyConfig,
  handleOpenDeployModal,
  temperature,
  onTemperatureChange,
  topK,
  onTopKChange,
  selectedModel,
  onSelectedModelChange,
  isCollapsed,
  onToggleCollapse,
}: ChatSidebarProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("communication")

  const handleAiGenerate = async () => {
    setIsGenerating(true)
    try {
      const { text } = await generateText({
        model: google(selectedModel || "gemini-2.0-flash"),
        temperature: temperature || 0.5,
        topK: topK || 40,
        prompt: `generate a system prompt for an AI that can use the following tools: ${selectedTools.join(", ")}. The system prompt should enhance the AI's ability to use the tools effectively. Keep the system prompt medium and descriptive. Use the following system prompt as a base: ${systemPrompt}. Remove markdown formatting and return only the system prompt.`,
      })
      onSystemPromptChange(text)
    } catch (error) {
      console.error("Error generating prompt:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const toolCategories: ToolCategory[] = [
    {
      name: "communication",
      tools: [
        {
          id: "sendEmail",
          name: "Send Email",
          icon: <Mail className="h-4 w-4" />,
          description: "Send emails to contacts",
        },
        {
          id: "readEmail",
          name: "Read Email",
          icon: <Mail className="h-4 w-4" />,
          description: "Read emails from inbox",
        },
      ],
    },
    {
      name: "web",
      tools: [
        { id: "webSearch", name: "Browser", icon: <Globe className="h-4 w-4" />, description: "Search the web" },
        {
          id: "scrapeDocsTool",
          name: "Web Scraper",
          icon: <Search className="h-4 w-4" />,
          description: "Extract data from websites",
        },
        {
          id: "fetchYouTubeVideo",
          name: "YouTube",
          icon: <Youtube className="h-4 w-4" />,
          description: "Search and fetch YouTube videos",
        },
      ],
    },
    {
      name: "utilities",
      tools: [
        {
          id: "getWeather",
          name: "Weather",
          icon: <Cloud className="h-4 w-4" />,
          description: "Get weather forecasts",
        },
        {
          id: "generateImage",
          name: "Image Generation",
          icon: <ImageIcon className="h-4 w-4" />,
          description: "Generate images from text",
        },
        {
          id: "musicMood",
          name: "Music Mood",
          icon: <Music className="h-4 w-4" />,
          description: "Generate music based on mood",
        },
      ],
    },
    {
      name: "travel",
      tools: [
        {
          id: "fetchFlightDetails",
          name: "Flight",
          icon: <Plane className="h-4 w-4" />,
          description: "Search for flight information",
        },
        {
          id: "fetchHotelDetails",
          name: "Hotel",
          icon: <Hotel className="h-4 w-4" />,
          description: "Find hotel accommodations",
        },
      ],
    },
    {
      name: "finance",
      tools: [
        {
          id: "nftTool",
          name: "NFT",
          icon: <Wallet className="h-4 w-4" />,
          description: "Manage NFT transactions",
        },
        {
          id: "MoneySendTool",
          name: "Send Money",
          icon: <DollarSign className="h-4 w-4" />,
          description: "Send money to contacts",
        },
        {
          id: "distributePaymentTool",
          name: "Distribute Money",
          icon: <Users className="h-4 w-4" />,
          description: "Split payments among multiple recipients",
        },
      ],
    },
    {
      name: "personal",
      tools: [
        {
          id: "googleCalendarManager",
          name: "Calendar",
          icon: <Calendar className="h-4 w-4" />,
          description: "Manage calendar events",
        },
        {
          id: "fetchDoctors",
          name: "Find Doctors",
          icon: <Heart className="h-4 w-4" />,
          description: "Find healthcare providers",
        },
      ],
    },
  ]

  const handleToolToggle = (toolId: string) => {
    if (selectedTools.includes(toolId)) {
      onToolsChange(selectedTools.filter((id) => id !== toolId))
    } else {
      onToolsChange([...selectedTools, toolId])
    }
  }

  const googleModels = [
    { value: "gemini-2.0-flash", label: "Gemini 2.0 Flash" },
    { value: "gemini-2.5-flash", label: "Gemini 2.5 Flash" },
    { value: "gemini-2.5-pro", label: "Gemini 2.5 Pro" },
    { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
    { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
  ]

  if (isCollapsed) {
    return (
      <div className="w-16 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 border-r border-purple-500/20 flex flex-col items-center py-4">
        <Button
          onClick={onToggleCollapse}
          variant="ghost"
          size="icon"
          className="text-purple-200 hover:bg-purple-500/20 mb-4"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
        <div className="flex flex-col gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <Wand2 className="h-4 w-4 text-white" />
          </div>
          <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <span className="text-xs text-purple-200">{selectedTools.length}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[30rem] bg-transparent flex flex-col">
      <div className="p-4 border-b border-purple-500/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            AI Configuration
          </h2>
          <Button
            onClick={onToggleCollapse}
            variant="ghost"
            size="icon"
            className="text-purple-200 hover:bg-purple-500/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="model-selector" className="text-purple-200 text-sm font-medium">
              Model
            </Label>
            <Select value={selectedModel} onValueChange={onSelectedModelChange}>
              <SelectTrigger className="w-full mt-1 bg-slate-700/50 border-purple-500/30 text-white text-sm">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-purple-500/30">
                {googleModels.map((model) => (
                  <SelectItem key={model.value} value={model.value} className="text-white hover:bg-purple-600/20">
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-purple-200 text-xs font-medium">Temp: {temperature.toFixed(2)}</Label>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[temperature]}
                onValueChange={(value) => onTemperatureChange(value[0])}
                className="mt-1 [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-purple-500 [&_[role=slider]]:to-blue-500"
              />
            </div>
            <div>
              <Label className="text-purple-200 text-xs font-medium">Top K: {topK}</Label>
              <Slider
                min={1}
                max={100}
                step={1}
                value={[topK]}
                onValueChange={(value) => onTopKChange(value[0])}
                className="mt-1 [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-purple-500 [&_[role=slider]]:to-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        <div>
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm"
            disabled={isGenerating}
            onClick={handleAiGenerate}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Prompt
              </>
            )}
          </Button>

          <Label className="text-purple-200 text-sm font-medium mt-3 block">System Prompt</Label>
          <Textarea
            placeholder="Enter system instructions..."
            className="mt-1 h-24 bg-slate-700/50 border-purple-500/30 text-white text-sm placeholder:text-purple-200/50 resize-none"
            value={systemPrompt}
            onChange={(e) => onSystemPromptChange(e.target.value)}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <Label className="text-purple-200 text-sm font-medium">Tools</Label>
            <span className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full">
              {selectedTools.length}
            </span>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-3 bg-slate-700/50 h-8">
              <TabsTrigger
                value="communication"
                className="text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 text-purple-200"
              >
                Comm
              </TabsTrigger>
              <TabsTrigger
                value="web"
                className="text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 text-purple-200"
              >
                Web
              </TabsTrigger>
            </TabsList>
            <TabsList className="grid grid-cols-2 mb-3 bg-slate-700/50 h-8">
              <TabsTrigger
                value="utilities"
                className="text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 text-purple-200"
              >
                Utils
              </TabsTrigger>
              <TabsTrigger
                value="travel"
                className="text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 text-purple-200"
              >
                Travel
              </TabsTrigger>
            </TabsList>
            <TabsList className="grid grid-cols-2 mb-3 bg-slate-700/50 h-8">
              <TabsTrigger
                value="finance"
                className="text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 text-purple-200"
              >
                Finance
              </TabsTrigger>
              <TabsTrigger
                value="personal"
                className="text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 text-purple-200"
              >
                Personal
              </TabsTrigger>
            </TabsList>

            {toolCategories.map((category) => (
              <TabsContent key={category.name} value={category.name} className="mt-0">
                <div className="space-y-2 max-h-48 overflow-y-auto bg-slate-700/30 rounded-lg p-2">
                  {category.tools.map((tool) => (
                    <div
                      key={tool.id}
                      className="flex items-start space-x-2 p-2 hover:bg-purple-500/10 rounded-md transition-colors"
                    >
                      <Checkbox
                        id={tool.id}
                        checked={selectedTools.includes(tool.id)}
                        onCheckedChange={() => handleToolToggle(tool.id)}
                        className="mt-0.5 border-purple-400 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
                      />
                      <div className="flex-1 min-w-0">
                        <Label
                          htmlFor={tool.id}
                          className="flex items-center cursor-pointer text-white text-sm font-medium"
                        >
                          {tool.icon}
                          <span className="ml-2 truncate">{tool.name}</span>
                        </Label>
                        <p className="text-xs text-purple-300/80 mt-0.5 line-clamp-2">{tool.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      <div className="p-4 border-t border-purple-500/20 space-y-2">
        <Button
          onClick={onApplyConfig}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Apply Config
        </Button>
        <Button
          onClick={handleOpenDeployModal}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm"
        >
          <RocketIcon className="h-4 w-4 mr-2" />
          Deploy Agent
        </Button>
      </div>
    </div>
  )
}
