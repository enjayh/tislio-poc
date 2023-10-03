import { getAccountIdFromServerComponent } from '@/app/utils/SupabaseUtils'
import UpdateNoteForm from './UpdateNoteForm'
import NavBar from '@/app/components/NavBar'
import { Note } from '@/app/utils/types'
import prisma, { getTags, getTraits } from '@/app/utils/prisma-utils'

export default async function Note({ params }: { params: { id: string } }) {
  const accountId = await getAccountIdFromServerComponent()

  const noteId = parseInt(params.id.toString())
  if (!noteId) {
    throw new Error(`Error getting note with unknown id: ${params.id}`)
  }

  const note: Note | null = await prisma.note.findUnique({
    where: {
      id: noteId,
      account_id: accountId
    },
    include: {
      tags: {
        select: {
          id: true,
          name: true
        }
      },
      traits: {
        include: {
          trait: {
            select: {
              id: true,
              name: true,
              type: true
            }
          }
        }
      }
    }
  })

  if (!note) {
    throw new Error('Error reading note')
  }

  const tags = await getTags(accountId)
  const traits = await getTraits(accountId)

  return (
    <>
      <NavBar />
      <main>
        <h2 className="text-primary text-center">Note</h2>
        <UpdateNoteForm note={note} tags={tags} traits={traits} />
      </main>
    </>
  )
}