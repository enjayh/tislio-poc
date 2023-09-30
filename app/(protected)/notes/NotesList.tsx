import { getAccountId, getSessionUserEmail } from '@/app/utils/SupabaseUtils';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

interface Note {
  body: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
  id: number;
}

export default async function NoteList() {
  const supabase = createRouteHandlerClient({ cookies })
  const email = await getSessionUserEmail(supabase)
  const accountId = await getAccountId(supabase, email)

  const { data, error } = await supabase
    .from('Note')
    .select('body, completed, created_at, updated_at, id')
    .eq('account_id', accountId)

  if (error) {
    console.error('Error getting note: ' + error.message)
  }

  const notes = data || []

  return (
    <>
      {notes.map((note: Note) => (
        <div key={note.id} className="tagStyle">
          <p>{note.body} | {String(note.completed)} | {note.created_at.toString()} | {note.updated_at ? note.updated_at.toString() : "Never updated"}</p>
        </div>
      ))}
    </>
  )
}