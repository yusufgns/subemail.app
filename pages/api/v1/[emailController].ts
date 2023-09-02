// pages/api/yourApiRoute.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { rateLimitMiddleware } from '@/middleware/rateLimit'
import supabase from '@/utils/supabase'
import NextCors from 'nextjs-cors'
import { withRoleControl } from '@/middleware/roleControl/withRoleControl'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  await rateLimitMiddleware(req, res)

  const props = JSON.parse(req.body)
  const { email, projectKey } = props
  const { emailController } = req.query

  if (!email || !projectKey) {
    res.status(400).json({ error: 'Email and projectKey are required' })
    return
  }

  const {
    data: existingRowData,
    error: existingRowError,
  } = await supabase.from('emailList').select('projectKey').eq('email', email)

  if (existingRowError) {
    res.status(400).json({
      error: `Something went wrong while connecting to Supabase | Error 400`,
    })
    return false
  }

  const checkData = existingRowData.length ?? 0

  if (checkData) {
    const data = existingRowData.find((item) => item.projectKey === projectKey)
    if (data) await supabase.from('emailList').insert({ email: "gunesyusuf024@gmail.com", projectKey: "flksdfjnsdfjn" })
  }

  return res.status(200).json({ message: `Success: Email successfully added` })
}
