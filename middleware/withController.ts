import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import supabase from '@/utils/supabase'

export async function withController(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email, projectKey } = req.body
  const { emailController } = req.query
  const { data: isHaveEmail, error: isHaventEmail } = await supabase
    .from('emailList')
    .select('*')
    .eq('email', email)

  const isHaveEmailData = isHaveEmail?.length ?? 0

  if (isHaveEmailData <= 0) {
    await supabase.from('emailList').insert({
      email: email,
      projectKey: projectKey,
      cretorEmailKey: emailController,
    })
  } else {
    const data = isHaveEmail?.find((item) => item.projectKey === projectKey)
    data
      ? ''
      : await supabase.from('emailList').insert({
          email: email,
          projectKey: projectKey,
          cretorEmailKey: emailController,
        })
  }

  return NextResponse.next()
}
