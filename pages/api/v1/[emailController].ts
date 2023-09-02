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

  await rateLimitMiddleware(req, res)

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

  const checkData = isHaveEmail.length

  if (checkData <= 0 || checkData === undefined) {
    await withRoleControl(req)
  }

  if (checkData > 0) {
    const data = isHaveEmail.find((item) => item.projectKey === projectKey)
    if (data) res.status(400).json({ error: 'Email already exists' })
    if (!data) await withRoleControl(req)
  }

  res.send('Success your request!')
}

export default handle
