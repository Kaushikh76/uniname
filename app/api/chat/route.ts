import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, message } = body

    const response = await fetch(`http://68.233.112.221:8080/api/chat/${sessionId}`, {
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
