import { getAccountIdFromServerComponent } from '@/app/utils/SupabaseUtils';
import prisma from '@/app/utils/prisma-utils';
import { Note } from '@/app/utils/types';
import NoteButton from './NoteButton';

export const dynamic = 'force-dynamic'

export default async function NoteList() {
  const accountId = await getAccountIdFromServerComponent()

  const notes: Note[] = await prisma.note.findMany({
    where: {
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

  return (
    <>
      {notes.length === 0 && (<div>Add some notes to have them show up here.</div>)}
      {notes.map((note: Note) => (
        <NoteButton note={note} />
      ))
      }
    </>
  )
}