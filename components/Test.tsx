'use client'
import React from 'react'

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

  const handleTest = () => {
    fetch('/api/subscriber_email', {
      method: 'POST',
      body: JSON.stringify([{ email: 'example@example.com' }, { userID: 121233 }]),
      mode: 'no-cors', // Opaque yanıt almak için
    })
  }
  return (
    <div onClick={handleTest} className="bg-gray-500">
      TEST BUTTON <button>asdasdasdd</button>
    </div>
  )
}
