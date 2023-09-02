'use client'
import React from 'react'
import supabase from '@/utils/supabase'

export default function Test() {
  const apiUrl = 'https://submails.vercel.app/api/subscriber_email' // Gerçek API endpoint URL'sini kullanın

  //   const handleTest = async () => {
  //     let { data: user_email_data, error } = await supabase
  //       .from('user_email_data')
  //       .insert([{ email: 'someVaasdasdsalue' }])

  //       console.log(data)
  //       console.log(error)
  //   }

  const emailss = 'TESTTTASDAD'

  const onSubmit = async () => {
    const {
      data: existingRowData,
      error: existingRowError,
    } = await supabase
      .from('emailList')
      .select('*')
      .eq('email', 'asdasd')
      .eq('projectKey', 'asdasdads')

      console.log(existingRowData)
      console.log(existingRowError)
  }

  return (
    <div onClick={() => onSubmit()} className="bg-gray-500">
      TEST BUTTON <button>asdasdasdd</button>
    </div>
  )
}
