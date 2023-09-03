import supabase from '@/utils/supabase'
import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
import { rateLimitMiddleware } from '@/middleware/rateLimit'
import { withController } from '@/middleware/withController'

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  await rateLimitMiddleware(req, res)

  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    preflightContinue: false,
    credentials: true
  })

  const data = JSON.parse(req.body)
  const { email, projectKey } = data
  const { emailController } = req.query

  if (!email || !projectKey) {
    res.json({ message: 'Hello NextJs Cors!' })
    return
  }

  await withController(email, projectKey, emailController)
  return res.json({ message: 'Hello NextJs Cors!' })
}

export default handle
