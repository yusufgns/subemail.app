'use client'
import React from 'react'

export default function Test() {
  const apiUrl = 'https://submails.vercel.app/api/subscriber_email' // Gerçek API endpoint URL'sini kullanın

  const postData = {
    email: 'example@example.com',
    id: 123,
  }

  const handleTest = () => {
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Gönderilen veri JSON formatında
      },
      body: JSON.stringify(postData), // Veriyi JSON formatına dönüştürerek gönder
      mode: 'no-cors', // Opaque yanıt almak için
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error('Hata:', error)
      })
  }
  return (
    <div onClick={handleTest} className="bg-gray-500">
      TEST BUTTON <button>asdasdasdd</button>
    </div>
  )
}
