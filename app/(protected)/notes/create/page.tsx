import NavBar from '@/app/components/NavBar'
import CreateNoteForm from './CreateNoteForm'
import { getAccountIdFromServerComponent } from '@/app/utils/SupabaseUtils'
import { PrismaClient } from '@prisma/client'
import { getTags } from '@/app/utils/prisma-utils'

export default async function CreateNote() {
  const accountId = await getAccountIdFromServerComponent()

  const prisma = new PrismaClient()
  const tags = await getTags(prisma, accountId)

  return (
    <>
      <NavBar />
      <main>
        <h2 className="text-primary text-center">Add a New Note</h2>
        <CreateNoteForm tags={tags} />
      </main>
    </>
  )
}