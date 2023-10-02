'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Note, Tag, SelectableTag, UpdateNote } from '@/app/utils/types'
import SelectableTagList from '../SelectableTagList'

export default function UpdateNoteForm({ note, tags }: { note: Note, tags: Tag[] }) {
  const router = useRouter()

  const selectableTags: SelectableTag[] = tags.map(tag => ({ id: tag.id, name: tag.name, selected: note.tags.filter((noteTag) => noteTag.id === tag.id).length > 0 }))

  const [body, setBody] = useState(note.body)
  const [completed, setCompleted] = useState(note.completed)
  const [selectableTagList, setSelectableTagList] = useState(selectableTags)
  const [isLoading, setIsLoading] = useState(false)

  const handleCompletedChange = async () => {
    setCompleted(!completed)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    const updatedNote: UpdateNote = {
      id: note.id,
      body,
      completed,
      tags: selectableTagList
    }

    const res = await fetch('http://localhost:3000/api/notes/' + note.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedNote)
    })

    if (res.ok) {
      router.refresh()
      router.push('/notes')
    } else {
      throw new Error('Error creating note')
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
      <SelectableTagList tagList={selectableTagList} setTagList={setSelectableTagList} />
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