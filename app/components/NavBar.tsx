import Logo from './Logo'
import Link from 'next/link'
import LogoutButton from './LogoutButton'

export default function NavBar() {
  return (
    <nav>
      <Logo />
      <Link href="/dashboard" className="mr-auto">
        <h2>Dashboard</h2>
      </Link>
      <Link href="/tags">
        <h2>Tags</h2>
      </Link>
      <Link href="/traits">
        <h2>Traits</h2>
      </Link>
      <LogoutButton />
    </nav>
  )
}