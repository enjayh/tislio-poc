import Link from 'next/link'

export default function NotFound() {
  return (
    <main>
      <h2>Problem!</h2>
      <p>Can&apos;t find the page you were looking for.</p>
      <p>Go back to <Link href="/">Home</Link></p>
    </main>
  )
}