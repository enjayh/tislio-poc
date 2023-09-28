import Link from 'next/link'
import NavBar from '../components/NavBar'
import TagList from './TagList'

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
      <TagList />
    </main>
  )
}