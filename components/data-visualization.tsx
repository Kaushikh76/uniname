"use client"

import { TwitterAnalysis } from "@/components/twitter-analysis"
import { DomaMetrics } from "@/components/doma-metrics"
import { SeoMetrics } from "@/components/seo-metrics"
import { TrendsChart } from "@/components/trends-chart"
import { AgentSummary } from "@/components/agent-summary"

interface DataVisualizationProps {
  data: any
}

export function DataVisualization({ data }: DataVisualizationProps) {
  return (
    <div className="p-8 space-y-8">
      <div className="border-4 border-foreground p-6 halftone">
        <h2 className="text-3xl font-bold mb-2">{data.domain}</h2>
        <p className="text-sm text-muted-foreground">analyzed: {new Date(data.timestamp).toLocaleString()}</p>
      </div>

      <TwitterAnalysis analysis={data.data?.xAnalysis} topTweets={data.data?.topTweets} />

      <DomaMetrics domaInfo={data.data?.domaInfo} topTlds={data.data?.topTlds} domain={data.domain} />

      <SeoMetrics seoData={data.data?.seoAnalysis} />

      <TrendsChart trends={data.data?.seoAnalysis?.trends} />

      <AgentSummary summary={data.agent?.initialAnalysis} />
    </div>
  )
}
