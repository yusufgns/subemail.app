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

  const { userKey } = req.query
  const props = JSON.parse(req.body)
  const { email } = props

  if (!email || !userKey) {
    res.status(400).json({ error: 'Email and emailKey are required' })
    return
  }

  const { data: isHaveEmail, error: isHaventEmail } = await supabase
    .from('users')
    .select('*')

  if (isHaventEmail) {
    res.status(400).json({
      error: `Something went wrong while connecting to Supabase : ${isHaventEmail}`,
    })
    return
  }

  const isCheckEmail = isHaveEmail?.length ?? 0

  if (isCheckEmail <= 0) {
    await supabase
      .from('user_email_data')
      .insert({ email: email, user_id: userKey })
  } else {
    const data = isHaveEmail?.find((item) => item.user_id === userKey)
    data
      ? ''
      : await supabase
          .from('user_email_data')
          .insert({ email: email, user_id: userKey })
  }

  return res.send(`Hey what are you doing here?`)
}
