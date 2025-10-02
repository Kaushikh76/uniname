"use client"

import { useState } from "react"
import { DomainInput } from "@/components/domain-input"
import { DataVisualization } from "@/components/data-visualization"
import { AgentChat } from "@/components/agent-chat"
import { LoadingScreen } from "@/components/loading-screen"
import { ArrowLeft } from "lucide-react"

export default function Home() {
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showExitConfirm, setShowExitConfirm] = useState(false)

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
      console.log("Analysis data received:", data)
      setAnalysisData(data)
      setSessionId(data.agent?.sessionId || null)
    } catch (error) {
      console.error("Error analyzing domain:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExitSession = () => {
    setAnalysisData(null)
    setSessionId(null)
    setShowExitConfirm(false)
  }

  return (
    <main className="min-h-screen bg-background text-foreground font-mono lowercase">
      <div className="h-screen flex">
        {/* Left side - Chat */}
        <div className="w-1/3 border-r-4 border-foreground flex flex-col">
          <div className="border-b-4 border-foreground p-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">uniname</h1>
            {analysisData && (
              <button
                onClick={() => setShowExitConfirm(true)}
                className="p-2 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
                aria-label="exit session"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
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
                <p className="text-muted-foreground">the ultimate domain analyis platform</p>
                
              </div>
            </div>
          )}
        </div>
      </div>

      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border-4 border-foreground p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">exit session?</h2>
            <p className="mb-6 text-muted-foreground">
              leaving this session will erase all analysis data and chat history. this action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 px-4 py-2 border-2 border-foreground hover:bg-muted transition-colors"
              >
                cancel
              </button>
              <button
                onClick={handleExitSession}
                className="flex-1 px-4 py-2 bg-foreground text-background hover:bg-foreground/90 transition-colors"
              >
                exit
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="fixed bottom-4 right-4 flex items-center gap-3">
        <span className="text-sm">powered by doma.xyz</span>
        <a
          href="https://x.com/doma_xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity"
          aria-label="follow us on x"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </div>
    </main>
  )
}
