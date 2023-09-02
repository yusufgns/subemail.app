import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
import { withUsers } from '@/middleware/withUsers'
import { withContext } from '@/middleware/withContext'
import supabase from '@/utils/supabase'

interface IProps {
  email: string | undefined
  projectKey: string | undefined
  controller: string | null | undefined
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { controller } = req.query
  const { email, projectKey } = req.body

  const props = {
    email: email,
    projectKey: projectKey,
    controller: controller,
  } as IProps

  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  const { data: thisUserRole, error: thisUserRoleERROR } = await supabase
    .from('users')
    .select('role')
    .eq('userEmailKey', '9199f124-e1bb-4413-aec0-f508a3c5516d')

  if (thisUserRole) {
    switch (thisUserRole[0]?.role) {
      case 'free':
        await withContext()
    }
  }
  console.log('error', thisUserRoleERROR)

  return
}
