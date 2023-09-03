import supabase from '@/utils/supabase'
import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
import { rateLimitMiddleware } from '@/middleware/rateLimit'
import { withController } from '@/middleware/withController'

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  await rateLimitMiddleware(req, res)

  await NextCors(req, res, {
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    origin: '*',
    optionsSuccessStatus: [200, 400],
  })

  const data = JSON.parse(req.body)
  const { email, projectKey } = data
  const { emailController } = req.query

  if (!email || !projectKey) {
    res.status(400).json({ message: 'Email and project key required' })
    return
  }

  const { data: isHaveEmail, error: isHaventEmail } = await supabase
    .from('emailList')
    .select('*')
    .eq('email', email)

  const isHaveEmailData = isHaveEmail?.length ?? 0

  if (isHaveEmailData <= 0) {
    await withController(email, projectKey, emailController)
  } else {
    const data = isHaveEmail?.find((item) => item.projectKey === projectKey)
    data
      ? res.status(400).json({ message: 'Email added successfully' })
      : await withController(email, projectKey, emailController)
  }

  return res.status(200).json({ message: 'Email added successfully' })
}

export default handle
