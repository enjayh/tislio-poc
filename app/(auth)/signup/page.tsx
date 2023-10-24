'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import SimpleNav from '../../components/SimpleNav'
import { NewAccount } from '@/app/utils/types'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (password !== repassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`
      }
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
      return
    }

    const newAccount: NewAccount = {
      email: email
    }

    const res = await fetch(`${location.origin}/api/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAccount)
    })

    if (res.ok) {
      router.push('/verify')
    } else {
      setError('Invalid email and/or password')
      setIsLoading(false)
      throw new Error('Error creating account')
    }
  }

  return (
    <>
      <SimpleNav />
      <main>
        <h2 className="text-center">Sign up</h2>
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
          <span>Retype Password:</span>
          <input
            type="password"
            onChange={(e) => setRepassword(e.target.value)}
            value={repassword}
            required
          />
          <button
            className="btn-primary"
            disabled={isLoading}
          >
            {!isLoading && "Submit"}
            {isLoading && "Submitting..."}
          </button>
        </form>
        <div className="text-center"><Link href="/login">Already have an account? <u>Log in here.</u></Link></div>
        {error && (
          <div className="error">{error}</div>
        )}
      </main>
    </>
  )
}