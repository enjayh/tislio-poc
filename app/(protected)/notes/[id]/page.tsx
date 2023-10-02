import { getAccountId, getSessionUserEmail } from '@/app/utils/SupabaseUtils'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import UpdateNoteForm from './UpdateNoteForm'
import NavBar from '@/app/components/NavBar'
import Note from '../Note'
import { SelectableTag } from '@/app/utils/types'
import { PrismaClient } from '@prisma/client'

interface Params {
  id: String
}

export default async function Note({ params }: { params: Params }) {
  const prisma = new PrismaClient()

  const supabase = createRouteHandlerClient({ cookies })
  const email = await getSessionUserEmail(supabase)
  const accountId = await getAccountId(supabase, email)

  const note: Note | null = await prisma.note.findUnique({
    where: {
      id: parseInt(params.id.toString()),
      account_id: accountId
    },
    select: {
      id: true,
      body: true,
      completed: true,
      created_at: true,
      updated_at: true
    }
  })

  if (!note) {
    throw new Error('Error getting note')
  }

  const accountTags = await prisma.tag.findMany({
    where: {
      account_id: accountId
    },
    select: {
      id: true,
      name: true
    }
  })

  const getNote = await prisma.note.findUnique({
    where: {
      'account_id': accountId,
      id: note.id
    },
    include: {
      tags: {
        select: {
          id: true
        }
      }
    }
  })

  if (!getNote) {
    throw Error('Error getting single note')
  }
  const tags: SelectableTag[] = accountTags.map(datum => ({ id: datum.id, name: datum.name, selected: getNote?.tags.filter((tag) => tag.id === datum.id).length > 0 }))

  return (
    <>
      <NavBar />
      <main>
        <h2 className="text-primary text-center">Note</h2>
        <UpdateNoteForm note={note} baseTagList={tags} />
      </main>
    </>
  )
}