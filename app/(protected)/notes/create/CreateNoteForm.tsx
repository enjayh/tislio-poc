'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import SelectableTagList from '../SelectableTagList'
import { NewNote, SelectableTag, SelectableTrait, Tag, Trait } from '@/app/utils/types'
import SelectableTraitList from '../SelectableTraitList'
import { isValidTraitList } from '@/app/utils/general-utils'

export default function CreateNoteForm({ tags, traits }: { tags: Tag[], traits: Trait[] }) {
  const selectableTags: SelectableTag[] = tags.map(tag => ({
    id: tag.id,
    name: tag.name,
    selected: false
  }))
  const selectableTraits: SelectableTrait[] = traits.map(trait => ({
    id: trait.id,
    name: trait.name,
    type: trait.type,
    value: '',
    selected: false,
    existing: false
  }))

  const router = useRouter()

  const [body, setBody] = useState('')
  const [completed, setCompleted] = useState(false)
  const [selectableTagList, setSelectableTagList] = useState(selectableTags)
  const [selectableTraitList, setSelectableTraitList] = useState(selectableTraits)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleCompletedChange = async () => {
    setCompleted(!completed)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError('')

    if (!isValidTraitList(selectableTraitList)) {
      setError('One or more trait values don\'t match the trait type')
      return
    }

    setIsLoading(true)

    const note: NewNote = {
      body,
      completed,
      tags: selectableTagList,
      traits: selectableTraitList
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
    <>
      <form onSubmit={handleSubmit} className="w-1/2">
        <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
          rows={5}
        />
        <span>Completed:</span>
        <input
          type="checkbox"
          onChange={handleCompletedChange}
          checked={completed}
        />
        <span>Tags:</span>
        <SelectableTagList tagList={selectableTagList} setTagList={setSelectableTagList} />
        <span>Traits:</span>
        <SelectableTraitList traitList={selectableTraitList} setTraitList={setSelectableTraitList} />
        <button
          className="btn-primary"
          disabled={isLoading}
        >
          {isLoading && <span>Adding...</span>}
          {!isLoading && <span>Add Note</span>}
        </button>
      </form>
      {error && (
        <div className="error">{error}</div>
      )}
    </>
  )
}