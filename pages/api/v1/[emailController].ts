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

  await rateLimitMiddleware(req, res)

  const data = JSON.parse(req.body)
  const { emailController } = req.query
  const { email, projectKey } = data

  if (!email || !projectKey) {
    res.status(400).json({ error: 'Email and Project Key are required' })
    return
  }

  const { data: isHaveEmail, error: isHaventEmail } = await supabase
    .from('emailList')
    .select('*')
    .eq('email', email)

  const isEmailData = isHaveEmail?.length ?? 0

  if (isEmailData <= 0) {
    await supabase.from('emailList').insert({
      email: email,
      projectKey: projectKey,
      emailController: emailController,
    })
  } else {
    const data = isHaveEmail?.find((item) => item.projectKey === projectKey)
    data
      ? ''
      : await supabase.from('emailList').insert({
          email: email,
          projectKey: projectKey,
          emailController: emailController,
        })
  }

  res.send('Success your request!')
}

export default handle
