'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Note from '../Note'
import { SelectableTag } from '@/app/utils/types'
import SelectableTagList from '../SelectableTagList'

export default function UpdateNoteForm({ note, baseTagList }: { note: Note, baseTagList: SelectableTag[] }) {
  const router = useRouter()

  const [body, setBody] = useState(note.body)
  const [completed, setCompleted] = useState(note.completed)
  const [tagList, setTagList] = useState(baseTagList)
  const [isLoading, setIsLoading] = useState(false)

  const handleCompletedChange = async () => {
    setCompleted(!completed)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    const updatedNote = {
      body,
      completed,
      id: note.id,
      tagList
    }

    const res = await fetch('http://localhost:3000/api/notes/' + note.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedNote)
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
      <div className="info-pill">Created: {new Date(note.created_at).toLocaleString()}</div>
      <div className="info-pill">Updated: {note.updated_at ? new Date(note.updated_at).toLocaleString() : 'Never'}</div>
      <SelectableTagList tagList={tagList} setTagList={setTagList} />
      <button
        className="btn-primary"
        disabled={isLoading}
      >
        {isLoading && <span>Updating...</span>}
        {!isLoading && <span>Update Note</span>}
      </button>
    </form>
  )
}