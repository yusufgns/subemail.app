import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import supabase from '@/utils/supabase'

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
        await supabase.from('emailList').insert([
          {
            email: 'free@gmail.com',
            projectKey: 'free',
            cretorEmailKey: 'free',
          },
        ])

        await res
          .status(200)
          .json({ message: `Success: Email successfully added` })
        break

      case 'low':
        await supabase.from('emailList').insert([
          {
            email: 'low@gmail.com',
            projectKey: 'low',
            cretorEmailKey: 'low',
          },
        ])

        await res
          .status(200)
          .json({ message: `Success: Email successfully added` })
        break
    }
  })

  return NextResponse.next()
}
