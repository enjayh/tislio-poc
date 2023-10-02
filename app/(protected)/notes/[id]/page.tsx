import { getAccountId, getSessionUserEmail } from '@/app/utils/SupabaseUtils'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import UpdateNoteForm from './UpdateNoteForm'
import NavBar from '@/app/components/NavBar'
import Note from '../Note'
import { redirect } from 'next/navigation'
import { SelectableTag } from '@/app/utils/types'
import { PrismaClient } from '@prisma/client'

interface Params {
  id: number
}

export default async function Note({ params }: { params: Params }) {
  const prisma = new PrismaClient()

  const supabase = createRouteHandlerClient({ cookies })
  const email = await getSessionUserEmail(supabase)
  const accountId = await getAccountId(supabase, email)

  const { data, error } = await supabase
    .from('Note')
    .select('body, completed, created_at, updated_at, id')
    .eq('account_id', accountId)
    .eq('id', params.id)
    .single()

  if (error) {
    throw new Error(`Error getting note: ${error.message}`)
  }

  const note: Note = {
    body: data?.body,
    completed: data?.completed,
    created_at: data?.created_at,
    updated_at: data?.updated_at,
    id: data?.id
  }

  const { data: dataTag, error: errorTag } = await supabase
    .from('Tag')
    .select('id, name')
    .eq('account_id', accountId)

  if (errorTag) {
    throw new Error(`Error retrieving list of tags: ${errorTag.message}`)
  }
  if (!dataTag) {
    throw new Error('Error retrieving list of tags')
  }

  const getNote = await prisma.note.findUnique({
    where: {
      'account_id': accountId,
      id: data?.id
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
  const tags: SelectableTag[] = dataTag.map(datum => ({ id: datum.id, name: datum.name, selected: getNote?.tags.filter((tag) => tag.id === datum.id).length > 0 }))

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