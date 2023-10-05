import { getAccountIdFromServerComponent } from '@/app/utils/supabase-utils';
import { getNotes } from '@/app/utils/prisma-utils';
import { Note } from '@/app/utils/types';
import NoteButton from './NoteButton';

export const dynamic = 'force-dynamic'

export default async function NoteList() {
  const accountId = await getAccountIdFromServerComponent()
  const notes: Note[] = await getNotes(accountId)

  return (
    <>
      {notes.length === 0 && (<div>Add some notes to have them show up here.</div>)}
      {notes.map((note: Note) => (
        <NoteButton key={note.id} note={note} />
      ))
      }
    </>
  )
}