import NavBar from '@/app/components/NavBar'
import CreateNoteForm from './CreateNoteForm'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { getAccountId, getSessionUserEmail } from '@/app/utils/SupabaseUtils'
import { SelectableTag } from '@/app/utils/types'

export default async function CreateNote() {
  const supabase = createServerComponentClient({ cookies })
  const email = await getSessionUserEmail(supabase)
  const accountId = await getAccountId(supabase, email)

  const { data, error } = await supabase
    .from('Tag')
    .select('id, name')
    .eq('account_id', accountId)

  if (error) {
    throw new Error(`Error retrieving list of tags: ${error.message}`)
  }
  if (!data) {
    throw new Error('Error retrieving list of tags')
  }

  const tags: SelectableTag[] = data.map(datum => ({ id: datum.id, name: datum.name, selected: false }))

  return (
    <>
      <NavBar />
      <main>
        <h2 className="text-primary text-center">Add a New Note</h2>
        <CreateNoteForm baseTagList={tags} />
      </main>
    </>
  )
}