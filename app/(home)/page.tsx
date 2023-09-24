import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Logo from '../components/Logo'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession()

  return (
    <>
      <nav>
        <Logo />
        <span className="mr-auto" />
        {data.session && (
          <Link href="/dashboard">
            <button className="btn-primary">Dashboard</button>
          </Link>
        )}
        {!data.session && (
          <Link href="/login">
            <button className="btn-primary">Login</button>
          </Link>
        )}
      </nav>
      <main>
        <h1>Tislio</h1>
        <div>Oh hi. This is Tislio. Not much to see at the moment :D</div>
      </main>
    </>
  )
}
