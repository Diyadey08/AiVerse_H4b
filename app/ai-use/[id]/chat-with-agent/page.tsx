// 'use client';
// import React, { useEffect, useState } from 'react';

// interface Props {
//   params: { id: string };
// }

// export default function Page({ params }: Props) {
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//  const { id } = React.use(params)
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await fetch(`/api/ai-use/${id}`);
//         const json = await res.json();
//         console.log('Fetched data:', json);
//         setData(json);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, [id]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <p>
//       ID: {id} <br />
//       Name: {data?.agentName} <br />
//     </p>
//   );
// }
"use client"

import { useChat } from "@ai-sdk/react"
// import type React from "react"
import React from "react"
import { useEffect, useRef, useState } from "react"
import { Loader2} from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import ChatHeader from "@/components/chat/chat-header"
import ChatInput from "@/components/chat/chat-input"
import ChatMessages from "@/components/chat/chat-messages"
import FilePreviewArea from "@/components/chat/file-preview-area"
import PdfViewer from "@/components/chat/pdf-viewer"
import Navbar from '@/components/navbar'
export default function Chat({ params }: { params: { id: string } }) {
  
  const { id } = params

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: `https://ai-verse-h4b.vercel.app/api/ai-use/${id}`,
    // body: {
    //   ai_agent: selectedAgent
    // }
  })
  const [files, setFiles] = useState<FileList | undefined>(undefined)
  
  const [previews, setPreviews] = useState<string[]>([])
  const [pdfPreviews, setPdfPreviews] = useState<{ name: string; size: number; url: string; type?: string }[]>([])
  const [activePdf, setActivePdf] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Generate image previews when files are selected
  useEffect(() => {
    if (!files) {
      setPreviews([])
      setPdfPreviews([])
      return
    }

    const newPreviews: string[] = []
    const newPdfPreviews: { name: string; size: number; url: string, type?: string }[] = []
    setIsUploading(true)

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setPreviews((prev) => [...prev, e.target!.result as string])
          }
        }
        reader.readAsDataURL(file)
      } else if (file.type.startsWith("application/pdf")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            const url = URL.createObjectURL(file)
            newPdfPreviews.push({ name: file.name, size: file.size, url })
            setPdfPreviews(newPdfPreviews)
          }
        }
        reader.readAsDataURL(file)
      } else if (file.type.startsWith("audio/") || file.type.startsWith("video/")) {
        // Create object URL for audio and video files
        const url = URL.createObjectURL(file)
        // Store in the same array as PDFs for simplicity
        newPdfPreviews.push({
          name: file.name,
          size: file.size,
          url,
          type: file.type.startsWith("audio/") ? "audio" : "video",
        })
        setPdfPreviews(newPdfPreviews)
      }
    })
    setIsUploading(false)
  }, [files])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files)
    }
  }

  const clearFiles = () => {
    setFiles(undefined)
    setPreviews([])
    setPdfPreviews([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!input && (!files || files.length === 0)) return

    handleSubmit(event, {
      experimental_attachments: files,
    })

    clearFiles()
  }

  const handlePdfClick = (url: string) => {
    setActivePdf(url === activePdf ? null : url)
  }

  const handleSuggestedPrompt = (prompt: string) => {
    handleInputChange({ target: { value: prompt } } as any)
    setTimeout(() => formRef.current?.requestSubmit(), 100)
  }

  return (
    <div className="flex flex-col w-full mx-auto h-screen bg-background shadow-lg overflow-hidden">
      
      {/* <div className="flex items-center justify-between px-4 py-2 border-b"> */}
        <Navbar />

      {/* </div> */}

      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
        scrollAreaRef={scrollAreaRef}
        handlePdfClick={handlePdfClick}
        handleSuggestedPrompt={handleSuggestedPrompt}
        formRef={formRef}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
      />

      <AnimatePresence>
        {(previews.length > 0 || pdfPreviews.length > 0) && (
          <FilePreviewArea
            previews={previews}
            pdfPreviews={pdfPreviews}
            clearFiles={clearFiles}
            setPdfPreviews={setPdfPreviews}
          />
        )}
      </AnimatePresence>

      {isUploading && previews.length === 0 && pdfPreviews.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 py-2">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="text-xs text-muted-foreground">Processing files...</span>
        </motion.div>
      )}

      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
        isLoading={isLoading}
        files={files}
        formRef={formRef}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
      />

      {activePdf && <PdfViewer activePdf={activePdf} setActivePdf={setActivePdf} />}
    </div>
  )
}