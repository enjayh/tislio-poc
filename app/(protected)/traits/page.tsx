import NavBar from '@/app/components/NavBar'
import Link from 'next/link'
import TraitList from './TraitList'

export default function Traits() {
  return (
    <>
      <NavBar />
      <main>
        <nav>
          <Link href="/traits/create">
            <button className="btn-primary">Create Trait</button>
          </Link>
        </nav>
        <h2>Traits</h2>
        <TraitList />
      </main>
    </>
  )
}