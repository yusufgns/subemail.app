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
    const { data: isHereData, error } = await supabase
      .from('users')
      .select('role')
      .eq('userEmailKey', '9199f124-e1bb-4413-aec0-f508a3c5516d')
    isHereData?.map((item) => {
      switch (item.role) {
        case 'low':
          console.log('low')
          break
      }
    })
  }

  return (
    <div onClick={() => onSubmit()} className="bg-gray-500">
      TEST BUTTON <button>asdasdasdd</button>
    </div>
  )
}
