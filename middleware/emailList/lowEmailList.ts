import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import supabase from '@/utils/supabase'

export async function withLowEmailList(req: NextApiRequest) {
  const { emailController } = req.query
  const res = NextResponse.next() as any
  const { email, projectKey } = req.body

  const { data: isLowData, error: isLowError } = await supabase
    .from('emailList')
    .insert([
      {
        email: "low@gmail.com",
        projectKey: projectKey,
        cretorEmailKey: emailController,
      },
    ])

  if (isLowData) {
    res.status(200).json({ message: `Success: Email successfully added` })
    return NextResponse.next()
  }

  if (isLowError) {
    res.status(400).json({ error: `Failed to add the row to the database` })
  }
}
