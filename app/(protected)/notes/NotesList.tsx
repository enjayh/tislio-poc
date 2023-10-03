import { getAccountIdFromServerComponent } from '@/app/utils/SupabaseUtils';
import { TiTick } from 'react-icons/ti'
import Link from 'next/link';
import prisma from '@/app/utils/prisma-utils';
import { Note } from '@/app/utils/types';

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
      {notes.map((note: Note) => (
        <div key={note.id} className="item-pill">
          {note.completed && (<TiTick />)}
          <Link href={'/notes/' + note.id}>
            <span>{note.body}</span>
          </Link>
        </div >

      ))
      }
    </>
  )
}