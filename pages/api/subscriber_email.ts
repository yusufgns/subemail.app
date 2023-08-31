import supabase from '@/utils/supabase'
import { NextApiRequest, NextApiResponse } from 'next'

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
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
