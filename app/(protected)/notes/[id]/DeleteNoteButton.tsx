'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { TiDelete } from "react-icons/ti"

export default function DeleteNoteButton({ noteId }: { noteId: number }) {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleDelete = async () => {
    setIsLoading(true)

    const res = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
      method: 'DELETE'
    })

    if (res.ok) {
      router.refresh()
      router.push('/notes')
    } else {
      throw new Error('Failed to delete note')
    }
  }

  return (
    <button
      className="btn-primary float-right"
      onClick={handleDelete}
      disabled={isLoading}
    >
      {isLoading && (
        <>
          <TiDelete />
          Deleting...
        </>
      )}
      {!isLoading && (
        <>
          <TiDelete />
          Delete Note
        </>
      )}
    </button>
  )
}