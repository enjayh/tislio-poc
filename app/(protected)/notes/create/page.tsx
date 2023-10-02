import NavBar from '@/app/components/NavBar'
import CreateNoteForm from './CreateNoteForm'
import { getAccountIdFromServerComponent } from '@/app/utils/SupabaseUtils'
import prisma, { getTags, getTraits } from '@/app/utils/prisma-utils'

export default async function CreateNote() {
  const accountId = await getAccountIdFromServerComponent()

  const tags = await getTags(accountId)
  const traits = await getTraits(accountId)

  return (
    <>
      <NavBar />
      <main>
        <h2 className="text-primary text-center">Add a New Note</h2>
        <CreateNoteForm tags={tags} traits={traits} />
      </main>
    </>
  )
}