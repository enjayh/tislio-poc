import NavBar from '@/app/components/NavBar'
import CreateTagForm from './CreateTagForm'

export default function CreateTag() {
  return (
    <>
      <NavBar />
      <main>
        <h2 className="text-header text-center">Add a New Tag</h2>
        <CreateTagForm />
      </main>
    </>
  )
}