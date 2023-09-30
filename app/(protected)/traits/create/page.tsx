import NavBar from '@/app/components/NavBar'
import CreateTraitForm from './CreateTraitForm'

export default function CreateTrait() {
  return (
    <main>
      <NavBar />
      <h2 className="text-primary text-center">Add a New Trait</h2>
      <CreateTraitForm />
    </main>
  )
}