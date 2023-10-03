'use client'

import { useRouter } from 'next/navigation'

export default function SignUpButton() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/signup')
  }

  return (
    <button
      className="btn-primary btn-signup"
      onClick={handleClick}
    >
      Sign Up Here!
    </button>
  )
}