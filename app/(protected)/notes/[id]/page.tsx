import { getAccountId, getSessionUserEmail } from '@/app/utils/SupabaseUtils'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import UpdateNoteForm from './UpdateNoteForm'
import NavBar from '@/app/components/NavBar'
import Note from '../Note'

interface Params {
  id: number
}

export default async function Note({ params }: { params: Params }) {
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
    console.error('Error getting note: ' + error.message)
  }

  const note: Note = {
    body: data?.body,
    completed: data?.completed,
    created_at: data?.created_at,
    updated_at: data?.updated_at,
    id: data?.id
  }

  return (
    <main>
      <NavBar />
      <h2 className="text-primary text-center">Note</h2>
      <UpdateNoteForm note={note} />
    </main>
  )
}