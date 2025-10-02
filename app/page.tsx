"use client"

import { useState } from "react"
import { DomainInput } from "@/components/domain-input"
import { DataVisualization } from "@/components/data-visualization"
import { AgentChat } from "@/components/agent-chat"
import { LoadingScreen } from "@/components/loading-screen"

export default function Home() {
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleDomainSubmit = async (domain: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/analyze/${domain}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("failed to analyze domain")
      }

      const data = await response.json()
      console.log("[v0] Analysis data received:", data)
      setAnalysisData(data)
      setSessionId(data.agent?.sessionId || null)
    } catch (error) {
      console.error("[v0] Error analyzing domain:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground font-mono lowercase">
      <div className="h-screen flex">
        {/* Left side - Chat */}
        <div className="w-1/3 border-r-4 border-foreground flex flex-col">
          <div className="border-b-4 border-foreground p-4">
            <h1 className="text-2xl font-bold tracking-tight">uniname</h1>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
            {!analysisData ? (
              <DomainInput onSubmit={handleDomainSubmit} isLoading={isLoading} />
            ) : (
              <AgentChat sessionId={sessionId} domain={analysisData.domain} />
            )}
          </div>
        </div>

        {/* Right side - Data Visualization */}
        <div className="flex-1 overflow-auto">
          {isLoading ? (
            <LoadingScreen />
          ) : analysisData ? (
            <DataVisualization data={analysisData} />
          ) : (
            <div className="h-full flex items-center justify-center p-8">
              <div className="text-center space-y-4 max-w-md">
                <div className="text-6xl font-bold dithered">uniname</div>
                <p className="text-muted-foreground">enter a domain name to begin analysis</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
