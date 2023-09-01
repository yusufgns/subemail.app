import type { NextApiRequest, NextApiResponse } from 'next'
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

  const { emailController } = req.query
  const props = JSON.parse(req.body)
  const { email, projectKey } = props

  if (!email || !projectKey) {
    res.status(400).json({ error: 'Email and emailKey are required' })
    return
  }

  const { data: isHaveEmail, error: isHaventEmail } = await supabase
    .from('emailList')
    .select('*')
    .eq('email', email)

  const data = isHaveEmail?.find((item) => item.projectKey === projectKey)

  if (isHaveEmail) {
    data
      ? ''
      : await supabase.from('emailList').insert({
          email: email,
          projectKey: projectKey,
          cretorEmailKey: emailController,
        })
  }

  if (isHaventEmail) {
    res.status(400).json({
      error: `Something went wrong while connecting to Supabase | Error 400`,
    })
  }

  return res.send(`Hey what are you doing here?`)
}
