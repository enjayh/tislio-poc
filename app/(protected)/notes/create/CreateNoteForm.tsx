'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import SelectableTagList from '../SelectableTagList'
import { NewNote, SelectableTag, Tag } from '@/app/utils/types'

export default function CreateNoteForm({ tags }: { tags: Tag[] }) {
  const selectableTags: SelectableTag[] = tags.map(tag => ({ id: tag.id, name: tag.name, selected: false }))

  const router = useRouter()

  const [body, setBody] = useState('')
  const [completed, setCompleted] = useState(false)
  const [selectableTagList, setSelectableTagList] = useState(selectableTags)
  const [isLoading, setIsLoading] = useState(false)

  const handleCompletedChange = async () => {
    setCompleted(!completed)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    const note: NewNote = {
      body,
      completed,
      tags: selectableTagList
    }

    const res = await fetch('http://localhost:3000/api/notes/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note)
    })

    if (res.ok) {
      router.refresh()
      router.push('/notes')
    }
    else {
      throw new Error('Error creating note.')
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
      <span>Tags:</span>
      <SelectableTagList tagList={selectableTagList} setTagList={setSelectableTagList} />
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