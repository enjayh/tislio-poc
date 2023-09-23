import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function OverviewLayout({ children, }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession()

  if (!data.session) {
    redirect("/login")
  }

  return (
    <>
      <span>OverviewLayout</span>
      {children}
    </>
  )
}