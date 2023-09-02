import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import supabase from '@/utils/supabase'
import NextCors from 'nextjs-cors'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  const { controller } = req.query
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

  NextResponse.json({ message: existingRowData, error: existingRowError })

  return res.status(200).json({ message: `Success : Email successfully added` })
}
