import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession()

  return (
    <>
      <nav>
        <h1 className="mr-auto">Tislio</h1>
        {data.session && (
          <Link href="/dashboard">
            <button className="btn-primary">Dashboard</button>
          </Link>
        )}
        {!data.session && (
          <Link href="/login">Login</Link>
        )}
      </nav>
      <main>
        <div>Oh hi. This is Tislio. Not much to see at the moment :D</div>
      </main>
    </>
  )
}
