"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DomainInputProps {
  onSubmit: (domain: string) => void
  isLoading: boolean
}

export function DomainInput({ onSubmit, isLoading }: DomainInputProps) {
  const [domain, setDomain] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (domain.trim()) {
      onSubmit(domain.trim())
    }
  }

  return (
    <div className="flex-1 flex flex-col p-4">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">enter domain name</p>
            <p className="text-xs text-muted-foreground">(e.g., v0.com or google.com)</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="domain.com"
              disabled={isLoading}
              className="font-mono lowercase border-2 border-foreground rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-foreground bg-background"
            />
            <Button
              type="submit"
              disabled={isLoading || !domain.trim()}
              className="w-full rounded-none border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors font-mono lowercase"
            >
              {isLoading ? "analyzing..." : "analyze"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
