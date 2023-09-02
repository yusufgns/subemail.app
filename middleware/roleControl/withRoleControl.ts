import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import supabase from '@/utils/supabase'
import { withFreeEmailList } from '@/middleware/emailList/freeEmailList'
import { withLowEmailList } from '@/middleware/emailList/lowEmailList'
import { withMiddleEmailList } from '@/middleware/emailList/middleEmailList'
import { withhighEmailList } from '@/middleware/emailList/highEmailList'

export async function withRoleControl(req: NextApiRequest) {
  const { emailController } = req.query
  const res = NextResponse.next() as any

  const { data: isHereData, error } = await supabase
    .from('users')
    .select('role')
    .eq('userEmailKey', emailController)

  isHereData?.map(async (item) => {
    switch (item.role) {
      case 'free':
        withFreeEmailList(req)
        break

      case 'low':
        withLowEmailList(req)
        break

      case 'middle':
        withMiddleEmailList(req)
        break

      case 'high':
        withhighEmailList(req)
        break
      default:
        NextResponse.next()
        break
    }
  })
}
