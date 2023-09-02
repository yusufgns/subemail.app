import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'

const RATE_LIMIT_DURATION = 60 * 1000
const MAX_REQUESTS_PER_USER = 1

const userRequestCounts = new Map<
  string,
  { count: number; lastRequestTime: number }
>()

export function rateLimitMiddleware(req: NextApiRequest, callback: () => void) {
  const res = NextResponse.next() as any
  const userIP = req.socket.remoteAddress as string

  if (!userRequestCounts.has(userIP)) {
    userRequestCounts.set(userIP, {
      count: 1,
      lastRequestTime: Date.now(),
    })
  } else {
    const userRequestInfo = userRequestCounts.get(userIP) as {
      count: number
      lastRequestTime: number
    }
    const currentTime = Date.now()

    if (currentTime - userRequestInfo.lastRequestTime < RATE_LIMIT_DURATION) {
      if (userRequestInfo.count >= MAX_REQUESTS_PER_USER) {
        return res.status(429).json({ error: 'Too many requests' })
      } else {
        userRequestInfo.count++
        userRequestInfo.lastRequestTime = currentTime
      }
    } else {
      userRequestInfo.count = 1
      userRequestInfo.lastRequestTime = currentTime
    }
  }

  return NextResponse.next()
}
