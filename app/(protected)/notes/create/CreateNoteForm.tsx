'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateNoteForm() {
  const router = useRouter()

  const [body, setBody] = useState('')
  const [completed, setCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCompletedChange = async () => {
    setCompleted(!completed)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    const note = {
      body,
      completed
    }

    const res = await fetch('http://localhost:3000/api/notes/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note)
    })

    const json = await res.json()

    if (json.error) {
      console.error('Error creating note: ' + json.error.message)
    }
    if (json.data) {
      router.refresh()
      router.push('/notes')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <span>Body:</span>
      <textarea
        required
        onChange={(e) => setBody(e.target.value)}
        value={body}
      />
      <span>Completed:</span>
      <input
        type="checkbox"
        onChange={handleCompletedChange}
        checked={completed}
      />
      <button
        className="btn-primary"
        disabled={isLoading}
      >
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Note</span>}
      </button>
    </form>
  )
}