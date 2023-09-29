import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error('Failed to load auth layout: ' + error.message)
    redirect('/login')
  } else if (data.session) {
    redirect('/dashboard')
  }

  return (
    <>
      {children}
    </>
  )
}