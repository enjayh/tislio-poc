import NavBar from '@/app/components/NavBar'
import Link from 'next/link'
import TraitList from './TraitList'

export default function Traits() {
  return (
    <main>
      <NavBar />
      <nav>
        <Link href="/dashboard/traits/create">
          <button className="btn-primary">Create Trait</button>
        </Link>
      </nav>
      <h2>Traits</h2>
      <div>List of traits here.</div>
      <TraitList />
    </main>
  )
}