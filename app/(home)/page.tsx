import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Logo from '../components/Logo'
import { TiBook, TiTags, TiThListOutline } from 'react-icons/ti'
import SignUpButton from './SignUpButton'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    throw new Error(`Failed to load home: ${error.message}`)
  }

  return (
    <>
      <nav>
        <Logo />
        <h1 className="text-4xl">Tislio</h1>
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
        <div className="text-center">
          <p><strong>A Different Way of Taking Notes</strong></p>
          <p>A better way? Who know. ¯\_(ツ)_/¯</p>
          <div className="three-column">
            <div>
              <h2>Tags</h2>
              <TiTags className="icon-home" />
              <p>Use tags to organize you notes. Your note can have as many (or few) tags as you want.</p>
            </div>
            <div>
              <h2>Traits</h2>
              <TiThListOutline className="icon-home" />
              <p>Save extra information associated with your note, like your rating for a movie or when a book will be released. </p>
            </div>
            <div>
              <h2>Notes</h2>
              <TiBook className="icon-home" />
              <p>Keep track of some information. Save the names of all the shows you want to watch or what restaurants you&apos;ve been recommended.</p>
            </div>
          </div>
        </div>
        <SignUpButton />
        <br />
        <div className="text-center">The the source code for this project can be found <u><Link href="https://github.com/enjayh/tislio">here on GitHub</Link></u>.</div>
      </main>
    </>
  )
}
