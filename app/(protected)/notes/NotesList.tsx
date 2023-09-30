import { getAccountId, getSessionUserEmail } from '@/app/utils/SupabaseUtils';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'
import { TiTick, TiTickOutline } from 'react-icons/ti'
import Link from 'next/link';

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
        <div key={note.id} className="item-pill">
          {note.completed && (<TiTick />)}
          {!note.completed && (<TiTickOutline />)}
          <Link href={'/notes/' + note.id}>
            <span>{note.body}</span>
          </Link>
        </div >

      ))
      }
    </>
  )
}