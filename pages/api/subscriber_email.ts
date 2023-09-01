import supabase from '@/utils/supabase'
import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

const RATE_LIMIT_DURATION = 60000
const MAX_REQUESTS_PER_USER = 2

const userRequestCounts = new Map<string,{ count: number; lastRequestTime: number }>()

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
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

  const data = JSON.parse(req.body)
  const { email, userID } = data

  if (!email || !userID) {
    res.status(400).json({ error: 'Email and userID are required' })
    return
  }

  const { data: isHaveEmail, error: isHaventEmail } = await supabase
    .from('user_email_data')
    .select('*')
    .eq('email', email)

    if (isHaventEmail) {
      res.status(400).json({ error: `Something went wrong while connecting to Supabase : ${isHaventEmail}` })
      return
    }

  if (!isHaveEmail.length || isHaveEmail.length <= 0) {
    await supabase
      .from('user_email_data')
      .insert({ email: email, user_id: userID })
  } else {
    const data = isHaveEmail?.find((item) => item.user_id === userID)
    data
      ? ''
      : await supabase
          .from('user_email_data')
          .insert({ email: email, user_id: userID })
  }

  res.send({ email: email, email_key: userID })
}

export default handle
