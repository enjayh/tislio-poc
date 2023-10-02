import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    throw new Error(`Failed to load dashboard layout: ${error.message}`)
  }

  if (!data.session) {
    redirect('/login')
  }

  return (
    <>
      {children}
    </>
  )
}