import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const apiBaseUrl = process.env.API_BASE_URL

  if (!apiBaseUrl) {
    console.error("NEXT_PUBLIC_API_BASE_URL is not defined")
    return NextResponse.json({ error: "server configuration error" }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { sessionId, message } = body

    const response = await fetch(`${apiBaseUrl}/api/chat/${sessionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })

    if (!response.ok) {
      return NextResponse.json({ error: "failed to send message" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Chat API Error:", error)
    return NextResponse.json({ error: "failed to send message" }, { status: 500 })
  }
}