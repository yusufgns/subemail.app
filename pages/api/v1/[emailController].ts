import supabase from '@/utils/supabase'
import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
import { rateLimitMiddleware } from '@/middleware/rateLimit'

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  await supabase.from('emailList').insert([{
    email: "req.body.email",
    projectKey: "req.body.projectKe",
    emailController: "req.body.emailController",
  }])

  return res.send('Success your request!')
}

export default handle
