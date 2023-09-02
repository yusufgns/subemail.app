import { NextResponse } from 'next/server'
import supabase from '@/utils/supabase'

export const withContext = async (req : any, userEmailKey: any) => {
  const props = JSON.parse(req.body)
  const { email, projectKey } = props

  const { data, error } = await supabase.from('emailList').insert([
    {
      email: email,
      projectKey: projectKey,
      cretorEmailKey: userEmailKey,
    },
  ])

  console.log(data, error)

  return
}
