import { NextResponse } from 'next/server'
import { NextApiRequest } from 'next'
import supabase from '@/utils/supabase'

export const withContext = async () => {
  const { data, error } = await supabase.from('emailList').insert([
    {
      email: 'props.email',
      projectKey: 'props.projectKey',
      cretorEmailKey: 'role',
    },
  ])

  console.log(data, error)

  return
}
