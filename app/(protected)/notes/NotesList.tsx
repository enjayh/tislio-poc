import { getAccountIdFromServerComponent } from '@/app/utils/SupabaseUtils';
import { TiTick } from 'react-icons/ti'
import Link from 'next/link';
import prisma from '@/app/utils/prisma-utils';

export const dynamic = 'force-dynamic'

interface Note {
  body: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
  id: number;
}

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