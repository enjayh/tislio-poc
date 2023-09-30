import Link from 'next/link'
import NavBar from '@/app/components/NavBar'
import TagList from './TagList'

export default function Tags() {
  return (
    <>
      <NavBar />
      <main>
        <nav>
          <Link href="/tags/create">
            <button className="btn-primary">New Tag</button>
          </Link>
        </nav>
        <h2>Tags</h2>
        <div>List of tags here.</div>
        <TagList />
      </main>
    </>
  )
}