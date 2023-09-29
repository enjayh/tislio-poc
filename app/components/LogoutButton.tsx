'use client'

import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signOut()

    if (!error) {
      router.refresh()
      router.push('/login')
    }
    if (error) {
      console.log(error)
    }
  }

  return (
    <button className="btn-primary" onClick={handleLogout}>
      Logout
    </button>
  )
}