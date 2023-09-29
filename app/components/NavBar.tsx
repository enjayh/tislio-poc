import Logo from './Logo'
import Link from 'next/link'
import LogoutButton from './LogoutButton'

export default function NavBar() {
  return (
    <nav>
      <Logo />
      <Link href="/dashboard">
        <h2>Dashboard</h2>
      </Link>
      <Link href="/tags" className="mr-auto">
        <h2>Tags</h2>
      </Link>
      <LogoutButton />
    </nav>
  )
}