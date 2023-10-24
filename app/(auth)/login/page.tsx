'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import SimpleNav from '../../components/SimpleNav'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError('Incorrect email and/or password')
      setIsLoading(false)
      throw new Error(error.message)
    }

    router.refresh()
    router.push('/dashboard')
  }

  return (
    <>
      <SimpleNav />
      <main>
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
          <button
            className="btn-primary"
            disabled={isLoading}
          >
            {!isLoading && "Submit"}
            {isLoading && "Submitting..."}
          </button>
        </form>
        <div className="text-center">
          <Link href="/signup">
            Don&apos;t have an account? <u>Sign up here.</u>
          </Link>
        </div>
        {error && (
          <div className="error">{error}</div>
        )}
      </main>
    </>
  )
}