import LogoutButton from '../components/LogoutButton';

export default async function Dashboard() {
  return (
    <main>
      <nav>
        <h2 className="mr-auto">Dashboard</h2>
        <LogoutButton />
      </nav>
      <div>Need some actual content here!</div>
    </main>
  )
}