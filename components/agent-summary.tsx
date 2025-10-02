import { parseMarkdown } from "@/lib/markdown-parser"

interface AgentSummaryProps {
  summary: string | undefined
}

export function AgentSummary({ summary }: AgentSummaryProps) {
  console.log("[v0] Agent summary received:", summary ? "yes" : "no")
  console.log("[v0] Summary length:", summary?.length || 0)

  if (!summary) {
    console.log("[v0] No summary to display")
    return null
  }

  const parsedContent = parseMarkdown(summary)

  console.log("[v0] Parsed elements count:", parsedContent.length)

  return (
    <div className="border-4 border-foreground p-6 space-y-4 bg-background">
      <h3 className="text-xl font-bold border-b-4 border-foreground pb-2">agent analysis</h3>
      <div className="space-y-2">{parsedContent}</div>
    </div>
  )
}
