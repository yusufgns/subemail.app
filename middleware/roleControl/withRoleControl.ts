import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import supabase from '@/utils/supabase'

export async function withRoleControl(req: NextApiRequest) {
  const { emailController } = req.query

  const { data: isHereData, error } = await supabase
    .from('users')
    .select('role')
    .eq('userEmailKey', emailController)

  const isHereDataSucces = isHereData?.length ?? 0 as any
  const isData = isHereDataSucces[0].role

  switch (isData) {
    case 'free':
      await supabase.from('emailList').insert([
        {
          email: 'free@gmail.com',
          projectKey: 'free',
          cretorEmailKey: 'free',
        },
      ])
      break
    case 'premium':
      await supabase.from('emailList').insert([
        {
          email: 'premium@gmail.com',
          projectKey: 'premium',
          cretorEmailKey: 'premium',
        },
      ])
      break
  }

  return NextResponse.next()
}
