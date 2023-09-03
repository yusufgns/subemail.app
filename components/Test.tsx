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
    const data = await fetch(
      'https://submails.vercel.app/api/v1/9199f124-e1bb-4413-aec0-f508a3c5516d',
      {
        body: JSON.stringify({
          email: 'gunesyusuf024@gmailasdasdasdas000000000000dadsasda.com',
          projectKey: '631c3e83-0c33-4f72-ac00-9eef0aafae8a',
        }),
        method: 'POST',
      },
    )
    console.log(data)
  }

  return (
    <div onClick={() => onSubmit()} className="bg-gray-500">
      TEST BUTTON <button>asdasdasdd</button>
    </div>
  )
}
