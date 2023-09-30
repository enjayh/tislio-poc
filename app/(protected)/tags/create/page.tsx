import NavBar from '@/app/components/NavBar'
import CreateTagForm from './CreateTagForm'

export default function CreateTag() {
  return (
    <main>
      <NavBar />
      <h2 className="text-primary text-center">Add a New Tag</h2>
      <CreateTagForm />
    </main>
  )
}