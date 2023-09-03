import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import supabase from '@/utils/supabase'

export async function withRoleControl(req: NextApiRequest) {
  const { emailController } = req.query
  const { email, projectKey } = req.body
  const res = NextResponse.next() as any

  const { data: isHereData, error } = await supabase
    .from('users')
    .select('role')
    .eq('userEmailKey', emailController)

  isHereData?.map(async (item) => {
    switch (item.role) {
      case 'free':
        const { data: isFreeData, error: isFreeError } = await supabase
          .from('emailList')
          .insert([
            {
              email: 'free@gmail.com',
              projectKey: projectKey,
              cretorEmailKey: emailController,
            },
          ])

        if (isFreeData) {
          res.json({ message: 'Hello NextJs Cors!' })
        } else {
          res.json({ message: 'Hello NextJs Cors!' })
        }
        break

      case 'low':
        const { data: isLowData, error: isLowError } = await supabase
          .from('emailList')
          .insert([
            {
              email: 'low@gmail.com',
              projectKey: projectKey,
              cretorEmailKey: emailController,
            },
          ])

        if (isLowData) {
          res.json({ message: 'Hello NextJs Cors!' })
        } else {
          res.json({ message: 'Hello NextJs Cors!' })
        }
        break

      case 'middle':
        const {
          data: isMiddleData,
          error: isMiddleError,
        } = await supabase.from('emailList').insert([
          {
            email: 'middle@gmail.com',
            projectKey: projectKey,
            cretorEmailKey: emailController,
          },
        ])
        if (isMiddleData) {
          res.json({ message: 'Hello NextJs Cors!' })
        } else {
          res.json({ message: 'Hello NextJs Cors!' })
        }
        break

      case 'high':
        const { data: isHighData, error: isHighError } = await supabase
          .from('emailList')
          .insert([
            {
              email: 'high@gmail.com',
              projectKey: projectKey,
              cretorEmailKey: emailController,
            },
          ])
        if (isHighData) {
          res.json({ message: 'Hello NextJs Cors!' })
        } else {
          res.json({ message: 'Hello NextJs Cors!' })
        }
        break
      default:
        NextResponse.next()
        break
    }
  })

  return NextResponse.next()
}
