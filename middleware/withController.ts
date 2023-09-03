import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import supabase from '@/utils/supabase'

export async function withController(
  email: string | null,
  projectKey: string | null,
  emailController: string | string[] | undefined | null,
) {
  const res = NextResponse.next() as any
  await supabase.from('emailList').insert({
    email: email,
    projectKey: projectKey,
    cretorEmailKey: emailController,
  })

  return res.status(200).json({ message: 'Hello NextJs Cors!' })
}
