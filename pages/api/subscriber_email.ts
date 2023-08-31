import supabase from '@/utils/supabase'
import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    // Options
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })

  const data = JSON.parse(req.body)
  const { email, userID } = data

  if (!email || !userID) {
    res.status(400).json({ error: 'Email and userID are required' })
    return
  }

  await supabase
    .from('user_email_data')
    .insert({ email: email, user_id: userID })

  res.send({ message: 'Hello from the API' })
}

export default handle
