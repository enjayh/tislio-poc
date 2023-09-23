import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession()

  return (
    <main className="flex">
      <nav>
        {data.session && (
          <Link href="/overview">Overview</Link>
        )}
        {!data.session && (
          <Link href="/login">Login</Link>
        )}
      </nav>
      <h2>Tislio</h2>
      <div>Oh hi. This is Tislio. Not much to see at the moment :D</div>
    </main>
  )
}
