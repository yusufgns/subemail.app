import supabase from '@/utils/supabase'
import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
import { rateLimitMiddleware } from '@/middleware/rateLimit'
import { withController } from '@/middleware/withController'
import { NextResponse } from 'next/server'

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  await rateLimitMiddleware(req, res)

  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200,
  })

  const data = JSON.parse(req.body)
  const { email, projectKey } = data
  const { emailController } = req.query

  if (!email || !projectKey) {
    NextResponse.json({ status: 200, message: 'Email already exists!' })
    return
  }

  await withController(email, projectKey, emailController)
  return NextResponse.json({ status: 200, message: 'Email added successfully' })
}

export default handle
