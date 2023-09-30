import NavBar from '@/app/components/NavBar'

export default async function Dashboard() {
  return (
    <>
      <NavBar />
      <main>
        <h2>Dashboard!</h2>
        <div>Need some actual <strong>dashboard</strong> content here!</div>
      </main>
    </>
  )
}