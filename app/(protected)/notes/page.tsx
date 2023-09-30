import NavBar from '@/app/components/NavBar'
import Link from 'next/link'

export default function Notes() {
  return (
    <main>
      <NavBar />
      <nav>
        <Link href="/notes/create">
          <button className="btn-primary">Create Note</button>
        </Link>
      </nav>
      <h2>Notes</h2>
      <div>List of notes here.</div>
    </main>
  )
}