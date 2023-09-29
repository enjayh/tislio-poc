'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import AuthNav from '../AuthNav'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError(error.message)
    }
    if (!error) {
      router.refresh()
      router.push('/dashboard')
    }
  }

  return (
    <main>
      <AuthNav />
      <h2 className="text-center">Log In</h2>
      <form onSubmit={handleSubmit}>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <span>Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button className="btn-primary">Submit</button>
      </form>
      <div className="text-center"><Link href="/signup">Don&apos;t have an account? Sign up here.</Link></div>
      {error && (
        <div className="error">{error}</div>
      )}
    </main>
  )
}