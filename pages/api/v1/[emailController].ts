import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import supabase from '@/utils/supabase'
import NextCors from 'nextjs-cors'

const RATE_LIMIT_DURATION = 60000
const MAX_REQUESTS_PER_USER = 2

const userRequestCounts = new Map<
  string,
  { count: number; lastRequestTime: number }
>()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
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

  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  NextResponse.json({ message: 'Hello world!' })
  NextResponse.json({ message: 'Hello world!' })

  const { emailController } = req.query
  const props = JSON.parse(req.body)
  const { email, projectKey } = props

  if (!email || !projectKey) {
    res.status(400).json({ error: 'Email and projectKey are required' })
    return
  }

  const {
    data: existingRowData,
    error: existingRowError,
  } = await supabase
    .from('emailList')
    .select('*')
    .eq('email', email)
    .eq('projectKey', projectKey)

  if (existingRowError) {
    res.status(400).json({
      error: `Something went wrong while connecting to Supabase | Error 400`,
    })
    return
  }

  if (existingRowData.length > 0) {
    res.status(400).json({
      error:
        'A row with the same email and projectKey combination already exists',
    })
    return
  }

  const { data: newRowData, error: newRowError } = await supabase
    .from('emailList')
    .insert([
      {
        email: email,
        projectKey: projectKey,
        cretorEmailKey: emailController,
      },
    ])

  if (newRowError) {
    res.status(400).json({
      error: `Failed to add the row to the database`,
    })
    return
  }

  return res.status(200).json({ message: `Success : Email successfully added` })
}
