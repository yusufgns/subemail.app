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
    optionsSuccessStatus: 200,
  })

  const data = JSON.parse(req.body)
  const { email, projectKey } = data
  const { emailController } = req.query

  if (!email || !projectKey) {
    res.status(400).json({ error: 'Email and Project Key are required' })
    return
  }

  await withController(req, res)

  return res.status(200).json({ message: `Success: Email successfully added` })
}

export default handle
