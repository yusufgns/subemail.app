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

  const { emailController } = req.query
  const props = JSON.parse(req.body)
  const { email, projectKey } = props

  await withRoleControl(req)

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

  const { error: newRowError } = await supabase.from('emailList').insert([
    {
      email: "testerFnish@gmail.com",
      projectKey: "tester",
      cretorEmailKey: "tester",
    },
  ])

  if (newRowError) {
    res.status(400).json({
      error: `Failed to add the row to the database`,
    })
    return
  }

  return res.status(200).json({ message: `Success: Email successfully added` })
}
