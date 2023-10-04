'use client'

import { Note } from '@/app/utils/types'
import { useRouter } from 'next/navigation'
import { TiTick } from 'react-icons/ti'

export default function NoteButton({ note }: { note: Note }) {
  const router = useRouter()

  const handleClick = () => {
    router.push('/notes/' + note.id)
  }

  return (
    <button
      key={note.id}
      className="pill pill-note"
      onClick={handleClick}
    >
      {note.completed && (<TiTick />)}
      <span>{note.body}</span>
    </button >
  )
}