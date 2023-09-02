import supabase from '@/utils/supabase'
import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
import { rateLimitMiddleware } from '@/middleware/rateLimit'
import { withRoleControl } from '@/middleware/roleControl/withRoleControl'

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  const data = JSON.parse(req.body)
  const { emailController } = req.query
  const { email, projectKey } = data

  if (!email || !projectKey) {
    res.status(400).json({ error: 'Email and Project Key are required' })
    return
  }

  const { data: isHaveEmail, error: isHaveEmailError } = await supabase
    .from('emailList')
    .select('*')
    .eq('email', email)

  if (isHaveEmailError) {
    res.status(400).json({
      error: `Something went wrong while connecting to Supabase | Error 400`,
    })
    return false
  }

  if (!isHaveEmail.length || isHaveEmail.length <= 0) {
    await withRoleControl(req)
  } else {
    const data = isHaveEmail?.find((item) => item.projectKey === projectKey)
    data
      ? res.status(400).json({
          error: `Something went wrong while connecting to Supabase | Error 400`,
        })
      : await withRoleControl(req)
  }

  res.send('Success your request!')
}

export default handle
