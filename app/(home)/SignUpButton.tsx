'use client'

import { useRouter } from 'next/navigation'

export default function SignUpButton() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/signup')
  }

  return (
    <button
      className="btn-primary btn-center"
      onClick={handleClick}
    >
      Sign Up Here!
    </button>
  )
}