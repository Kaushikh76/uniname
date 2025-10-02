import type React from "react"

export function parseMarkdown(text: string): React.ReactNode[] {
  if (!text) return []

  const lines = text.split("\n")
  const elements: React.ReactNode[] = []
  let key = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Skip empty lines
    if (!line.trim()) {
      continue
    }

    // Handle ### headings (h4)
    if (line.startsWith("###")) {
      const content = line.replace(/^###\s*/, "").trim()
      elements.push(
        <h4 key={key++} className="text-lg font-bold border-b-2 border-foreground pb-2 mt-6 mb-3">
          {content.toLowerCase()}
        </h4>,
      )
      continue
    }

    // Handle ## headings (h3)
    if (line.startsWith("##")) {
      const content = line.replace(/^##\s*/, "").trim()
      elements.push(
        <h3 key={key++} className="text-xl font-bold border-b-2 border-foreground pb-2 mt-6 mb-3">
          {content.toLowerCase()}
        </h3>,
      )
      continue
    }

    // Handle numbered lists (1. 2. 3.)
    const numberedMatch = line.match(/^(\d+)\.\s+(.+)$/)
    if (numberedMatch) {
      const content = parseBoldText(numberedMatch[2])
      elements.push(
        <div key={key++} className="flex gap-3 mb-3">
          <span className="font-bold">{numberedMatch[1]}.</span>
          <div className="flex-1 text-sm leading-relaxed">{content}</div>
        </div>,
      )
      continue
    }

    // Handle bullet points (- or *)
    if (line.match(/^[-*]\s+/)) {
      const content = parseBoldText(line.replace(/^[-*]\s+/, ""))
      elements.push(
        <div key={key++} className="flex gap-3 mb-2">
          <span>•</span>
          <div className="flex-1 text-sm leading-relaxed">{content}</div>
        </div>,
      )
      continue
    }

    // Regular paragraph with bold text support
    const content = parseBoldText(line)
    elements.push(
      <p key={key++} className="text-sm leading-relaxed mb-3">
        {content}
      </p>,
    )
  }

  return elements
}

function parseBoldText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  let key = 0

  // Split by ** for bold text
  const segments = text.split(/(\*\*.*?\*\*)/)

  segments.forEach((segment) => {
    if (segment.startsWith("**") && segment.endsWith("**")) {
      // Bold text
      const boldContent = segment.slice(2, -2)
      parts.push(
        <strong key={key++} className="font-bold">
          {boldContent}
        </strong>,
      )
    } else if (segment) {
      // Regular text
      parts.push(<span key={key++}>{segment}</span>)
    }
  })

  return parts
}
