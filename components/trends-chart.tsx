"use client"

import { useState } from "react"

interface TrendsChartProps {
  trends: any
}

export function TrendsChart({ trends }: TrendsChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  if (!trends?.trends?.[0]?.data) return null

  const data = trends.trends[0].data
  const maxValue = Math.max(...data.flatMap((d: any) => d.values))

  return (
    <div className="border-4 border-foreground p-6 space-y-4">
      <h3 className="text-xl font-bold border-b-2 border-foreground pb-2">google trends</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            {trends.dateRange?.from} - {trends.dateRange?.to}
          </span>
          <span>keywords: {trends.keywords?.join(", ")}</span>
        </div>

        <div className="h-8 flex items-center justify-center border-2 border-foreground bg-background">
          {hoveredIndex !== null ? (
            <div className="text-sm font-mono">
              <span className="font-bold">{data[hoveredIndex].date}</span>
              {" → "}
              <span className="font-bold">{data[hoveredIndex].values[0]}</span>
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">hover over bars to see values</span>
          )}
        </div>

        <div className="h-64 flex items-end gap-1 relative">
          {data.map((point: any, index: number) => {
            const height = (point.values[0] / maxValue) * 100
            const isHovered = hoveredIndex === index
            return (
              <div
                key={index}
                className={`flex-1 bg-foreground dithered transition-all cursor-pointer relative ${
                  isHovered ? "opacity-100 ring-2 ring-foreground ring-offset-2" : "opacity-70 hover:opacity-90"
                }`}
                style={{ height: `${height}%` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {isHovered && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background px-2 py-1 text-xs font-bold whitespace-nowrap z-10">
                    {point.values[0]}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span>{maxValue}</span>
        </div>
      </div>
    </div>
  )
}
