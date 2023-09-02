import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import supabase from '@/utils/supabase'

export async function withRoleControl(
  res: NextApiResponse,
  emailController: any,
) {
  const { data: isHereData, error } = await supabase
    .from('users')
    .select('role')
    .eq('userEmailKey', emailController)

  if (isHereData) {
    if (isHereData?.length ?? 0) {
      switch (isHereData[0].role) {
        case 'free':
          res.status(400).json({ error: 'FREE' })
          break
        case 'low':
          res.status(400).json({ error: 'LOW' })
          break
        default:
          res.status(400).json({ error: 'Something went wrong' })
          break
      }
    }
  }

  return NextResponse.next()
}
