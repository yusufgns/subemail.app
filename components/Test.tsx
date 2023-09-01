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
      `https://submails.vercel.app/api/v1/5475742a-a409-40d5-8f30-9f610c71fd88`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: 'NewTester@gmail.com',
          projectKey: 'f9bc8080-4218-434b-96b8-e60ad9deef3b',
        }),
      },
    )
    console.log(data)
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
