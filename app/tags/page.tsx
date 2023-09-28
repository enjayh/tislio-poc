import Link from 'next/link'
import NavBar from '../components/NavBar'

export default function Tags() {
  return (
    <main>
      <NavBar />
      <nav>
        <Link href="/tags/create">
          <button className="btn-primary">New Tag</button>
        </Link>
      </nav>
      <h2>Tags</h2>
      <div>List of tags here.</div>
    </main>
  )
}