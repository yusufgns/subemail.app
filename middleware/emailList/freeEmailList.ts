import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import supabase from '@/utils/supabase'

export async function withRoleControl(req: NextApiRequest) {
  const { emailController } = req.query

  const { data: isHereData, error } = await supabase
    .from('users')
    .select('role')
    .eq('userEmailKey', emailController)

  if (isHereData) {
    const isHere = isHereData[0].role
    switch (isHere) {
        case 'free':
            NextResponse.next()
            break;
        case 'premium':
            NextResponse.next()
            break;
    }
  }
}
