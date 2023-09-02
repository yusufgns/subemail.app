import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import supabase from '@/utils/supabase'

export async function withRoleControl(req: NextApiRequest) {
  const { emailController } = req.query

  const { data: isHereData, error } = await supabase
    .from('users')
    .select('role')
    .eq('userEmailKey', emailController)

  return NextResponse.next()
}
