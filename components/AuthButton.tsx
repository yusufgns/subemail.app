'use client'
import React from 'react'
import supabase from '@/utils/supabase'

export default function AuthButton() {
    const appleLogin = async () => {
        supabase.auth.signInWithOAuth({
            provider: 'apple',
        })
    }
    return (
        <button onClick={() => appleLogin()}>AppleLogin</button>
    )
}
