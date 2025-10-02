import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { domain: string } }) {
  const domain = params.domain

  try {
    console.log("[v0] Fetching analysis for domain:", domain)

    const response = await fetch(`http://68.233.112.221:8080/api/analyze/${domain}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log("[v0] Backend response status:", response.status)
    console.log("[v0] Backend response headers:", Object.fromEntries(response.headers.entries()))

    const rawText = await response.text()
    console.log("[v0] Raw response (first 500 chars):", rawText.substring(0, 500))

    if (!response.ok) {
      console.error("[v0] Backend returned error status:", response.status, rawText)
      return NextResponse.json({ error: "failed to analyze domain" }, { status: response.status })
    }

    let data
    try {
      data = JSON.parse(rawText)
      console.log("[v0] Successfully parsed JSON data")
      console.log("[v0] Data structure keys:", Object.keys(data))

      // Log the structure of important nested objects
      if (data.keywords) {
        console.log("[v0] Keywords structure:", {
          hasTopKeywords: !!data.keywords.topKeywords,
          topKeywordsLength: data.keywords.topKeywords?.length,
          hasRelatedKeywords: !!data.keywords.relatedKeywords,
          relatedKeywordsStructure: data.keywords.relatedKeywords ? Object.keys(data.keywords.relatedKeywords) : null,
        })
      }

      if (data.metrics) {
        console.log("[v0] Metrics structure:", {
          hasOrganic: !!data.metrics.organic,
          organicKeys: data.metrics.organic ? Object.keys(data.metrics.organic) : null,
          hasPaid: !!data.metrics.paid,
          paidKeys: data.metrics.paid ? Object.keys(data.metrics.paid) : null,
        })
      }
    } catch (parseError) {
      console.error("[v0] JSON parse error:", parseError)
      console.error("[v0] Failed to parse response:", rawText)
      return NextResponse.json(
        {
          error: "invalid response from backend",
          details: rawText.substring(0, 200),
        },
        { status: 500 },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] API Error:", error)
    return NextResponse.json({ error: "failed to fetch domain analysis" }, { status: 500 })
  }
}
