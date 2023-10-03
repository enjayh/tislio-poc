import Link from 'next/link'
import SimpleNav from '../components/SimpleNav'

export default function NotFound() {
  return (
    <main className="text-center">
      <SimpleNav />
      <main>
        <h2 className="text-3xl">Problem!</h2>
        <p>Can&apos;t find the page you were looking for.</p>
        <p>Go back to <Link href="/dashboard">Dashboard</Link></p>
      </main>
    </main>
  )
}