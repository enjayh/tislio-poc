'use client'

import { Note } from '@/app/utils/types'
import { useRouter } from 'next/navigation'
import { TiTick } from 'react-icons/ti'

const maxCharactersDisplayed = 40

export default function NoteButton({ note }: { note: Note }) {
  const router = useRouter()

  const handleClick = () => {
    router.push('/notes/' + note.id)
  }

  const getDisplayBody = () => {
    const firstLine = note.body.split('\n')[0]
    const slicedLine = firstLine.slice(0, maxCharactersDisplayed)
    if (firstLine.length > maxCharactersDisplayed) {
      return slicedLine + '...'
    }

    return slicedLine
  }

  return (
    <button
      className="pill pill-note"
      onClick={handleClick}
    >
      {note.completed && (<TiTick />)}
      <span>
        {getDisplayBody()}
      </span>
    </button >
  )
}