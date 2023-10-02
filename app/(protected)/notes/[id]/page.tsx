import { getAccountId, getSessionUserEmail } from '@/app/utils/SupabaseUtils'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import UpdateNoteForm from './UpdateNoteForm'
import NavBar from '@/app/components/NavBar'
import { Tag, Note } from '@/app/utils/types'
import { PrismaClient } from '@prisma/client'

export default async function Note({ params }: { params: { id: string } }) {
  const prisma = new PrismaClient()

  const supabase = createRouteHandlerClient({ cookies })
  const email = await getSessionUserEmail(supabase)
  const accountId = await getAccountId(supabase, email)

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
      }
    }
  })

  if (!note) {
    throw new Error('Error reading note')
  }

  const tags: Tag[] = await prisma.tag.findMany({
    where: {
      account_id: accountId
    },
    select: {
      id: true,
      name: true
    }
  })

  return (
    <>
      <NavBar />
      <main>
        <h2 className="text-primary text-center">Note</h2>
        <UpdateNoteForm note={note} tags={tags} />
      </main>
    </>
  )
}