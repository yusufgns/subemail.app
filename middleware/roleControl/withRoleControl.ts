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
          res.status(200).json({ message: `Success: Email successfully added` })
        } else {
          res
            .status(400)
            .json({ error: `Failed to add the row to the database` })
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
          res.status(200).json({ message: `Success: Email successfully added` })
        } else {
          res
            .status(400)
            .json({ error: `Failed to add the row to the database` })
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
          res.status(200).json({ message: `Success: Email successfully added` })
        } else {
          res
            .status(400)
            .json({ error: `Failed to add the row to the database` })
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
          res.status(200).json({ message: `Success: Email successfully added` })
        } else {
          res
            .status(400)
            .json({ error: `Failed to add the row to the database` })
        }
        break
      default:
        NextResponse.next()
        break
    }
  })

  return NextResponse.next()
}
