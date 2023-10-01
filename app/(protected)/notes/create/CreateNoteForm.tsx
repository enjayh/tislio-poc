'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import SelectableTagList from '../SelectableTagList'
import { SelectableTag } from '@/app/utils/types'

export default function CreateNoteForm({ baseTagList }: { baseTagList: SelectableTag[] }) {
  const router = useRouter()

  const [body, setBody] = useState('')
  const [completed, setCompleted] = useState(false)
  const [tagList, setTagList] = useState(baseTagList)
  const [isLoading, setIsLoading] = useState(false)

  const handleCompletedChange = async () => {
    setCompleted(!completed)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    const note = {
      body,
      completed,
      tagList
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
      console.error('Error creating note.')
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
      <SelectableTagList tagList={tagList} setTagList={setTagList} />
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