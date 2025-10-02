"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { parseMarkdown } from "@/lib/markdown-parser"

interface AgentChatProps {
  sessionId: string | null
  domain: string
}

interface Message {
  role: "user" | "agent"
  content: string
}

export function AgentChat({ sessionId, domain }: AgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      content: `analysis complete for ${domain}. session id: ${sessionId || "none"}. how can i help?`,
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !sessionId) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch(`/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, message: userMessage }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessages((prev) => [...prev, { role: "agent", content: data.response || "no response" }])
      } else {
        setMessages((prev) => [...prev, { role: "agent", content: "error: unable to get response" }])
      }
    } catch (error) {
      console.error("[v0] Chat error:", error)
      setMessages((prev) => [...prev, { role: "agent", content: "error: connection failed" }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((message, index) => (
          <div key={index} className={`space-y-1 ${message.role === "user" ? "text-right" : "text-left"}`}>
            <div className="text-xs text-muted-foreground">{message.role === "user" ? "you" : "agent"}</div>
            <div
              className={`inline-block p-3 border-2 border-foreground ${
                message.role === "user" ? "bg-foreground text-background" : "bg-background text-foreground"
              }`}
            >
              {message.role === "agent" ? (
                <div className="text-sm space-y-2">{parseMarkdown(message.content)}</div>
              ) : (
                <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left space-y-1">
            <div className="text-xs text-muted-foreground">agent</div>
            <div className="inline-block p-3 border-2 border-foreground bg-background">
              <p className="text-sm">thinking...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t-4 border-foreground p-4 flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ask about the domain..."
            disabled={isLoading || !sessionId}
            className="flex-1 font-mono lowercase border-2 border-foreground rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-foreground bg-background"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim() || !sessionId}
            className="rounded-none border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors font-mono lowercase px-6"
          >
            send
          </Button>
        </form>
      </div>
    </div>
  )
}
