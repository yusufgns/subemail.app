import supabase from '@/utils/supabase'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import NextCors from 'nextjs-cors'

const RATE_LIMIT_DURATION = 60000
const MAX_REQUESTS_PER_USER = 2

const userRequestCounts = new Map<
  string,
  { count: number; lastRequestTime: number }
>()

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
        return res
          .status(200)
          .json({ message: 'Email and project key required' })
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
    methods: ['POST', 'GET'],
    origin: '*',
    optionsSuccessStatus: [200, 400],
  })

  const data = JSON.parse(req.body)
  const { email, projectKey } = data
  const { emailController } = req.query

  if (!email || !projectKey) {
    res
      .status(200)
      .json({ status: 400, message: 'Email and project key required' })
    return
  }

  const { data: isHaveEmail, error: isHaveEmailError } = await supabase
    .from('emailList')
    .select('*')
    .eq('email', email)

  const isHaveData = isHaveEmail?.length ?? 0

  if (isHaveData <= 0) {
    await supabase.from('emailList').insert({
      email: email,
      projectKey: projectKey,
      cretorEmailKey: emailController,
    })
  } else {
    const data = isHaveEmail?.find((item) => item.projectKey === projectKey)
    data
      ? res.status(200).json({
          status: 400,
          message: 'Email and project key already exist',
        })
      : await supabase.from('emailList').insert({
          email: email,
          projectKey: projectKey,
          cretorEmailKey: emailController,
        })
  }

  res.status(200).json({ status: 200, message: 'Your data has been sent successfully' })
}

export default handle
