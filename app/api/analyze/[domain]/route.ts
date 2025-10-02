import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { domain: string } }) {
  const domain = params.domain
  const apiBaseUrl = process.env.API_BASE_URL

  if (!apiBaseUrl) {
    console.error("API_BASE_URL is not defined")
    return NextResponse.json({ error: "server configuration error" }, { status: 500 })
  }

  try {
    const response = await fetch(`${apiBaseUrl}/api/analyze/${domain}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: "failed to analyze domain" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] API Error:", error)
    return NextResponse.json({ error: "failed to fetch domain analysis" }, { status: 500 })
  }
}