import supabase from '@/utils/supabase'
import { NextApiRequest, NextApiResponse } from 'next'

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  await supabase
    .from('user_email_data')
    .insert({ email: req.body.email, id: req.body.id })

  console.log(req.body)

  res.send({ message: 'Hello from the API' })
}

export default handle
