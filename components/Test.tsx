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
    await fetch('https://subemaill.vercel.app/api/subscriber_email', {
      method: 'POST',
      body: JSON.stringify({
        email: 'tester3131@gmail.com',
      }),
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
  }

  const handleTest = async () => {
    fetch(
      `https://submails.vercel.app/api/v1/c24debfa-c258-422f-9f53-44e4a0e799db`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: 'ters3131@gmail.com',
          emailKey: 'c24debfa-c258-422f-9f53-44e4a0e799db',
        }),
        mode: 'no-cors', // Opaque yanıt almak için
      },
    )
    ////////////
    // fetch(`/api/v1/${'asdasdasd'}.ts`, {
    //   method: 'POST',
    //   body: JSON.stringify([
    //     { email: 'example@example.com' },
    //     { userID: 121233 },
    //   ]),
    // })
    //////////////

    // const { data, error } = await supabase
    //   .from('user_email_data')
    //   .insert([
    //     {
    //       projectKey: 'c24debfa-c258-422f-9f53-44e4a0e799db',
    //       email: 'testerzzzz@gmail.com',
    //     },
    //   ])
    // console.log(data)
    // console.log(error)
  }

  return (
    <div onClick={onSubmit} className="bg-gray-500">
      TEST BUTTON <button>asdasdasdd</button>
    </div>
  )
}
