import supabase from '@/utils/supabase'
import { NextApiRequest, NextApiResponse } from 'next'
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

const RATE_LIMIT_DURATION = 60000 // 1 dakika (milisaniye cinsinden)
const MAX_REQUESTS_PER_USER = 10

const userRequestCounts = new Map<
  string,
  { count: number; lastRequestTime: number }
>()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, userID } = req.body
  const userIP = req.socket.remoteAddress as any

  if (!userRequestCounts.has(userIP)) {
    userRequestCounts.set(userIP, {
      count: 1,
      lastRequestTime: Date.now(),
    })
  } else {
    const userRequestInfo = userRequestCounts.get(userIP) as any
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

  const { data, error } = await supabase
    .from('user_email_data')
    .insert({ email: email, user_id: userID })

  return res.status(200).json({ DATA: data, ERROR: error })
}
