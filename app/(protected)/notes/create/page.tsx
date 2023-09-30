import NavBar from '@/app/components/NavBar'
import CreateNoteForm from './CreateNoteForm'

export default function CreateNote() {
  return (
    <main>
      <NavBar />
      <h2 className="text-primary text-center">Add a New Note</h2>
      <CreateNoteForm />
    </main>
  )
}