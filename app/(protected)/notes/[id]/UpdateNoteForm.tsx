'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Note, Tag, SelectableTag, UpdateNote, Trait, SelectableTrait } from '@/app/utils/types'
import SelectableTagList from '../SelectableTagList'
import SelectableTraitList from '../SelectableTraitList'
import { isValidTraitList } from '@/app/utils/general-utils'
import Switch from 'react-switch'

export default function UpdateNoteForm({ note, tags, traits }: { note: Note, tags: Tag[], traits: Trait[] }) {
  const router = useRouter()

  const selectableTags: SelectableTag[] = tags.map(tag => ({
    id: tag.id,
    name: tag.name,
    selected: note.tags.filter(noteTag => noteTag.id === tag.id).length > 0
  }))
  const selectableTraits: SelectableTrait[] = traits.map(trait => ({
    id: trait.id,
    name: trait.name,
    type: trait.type,
    value: note.traits.find(noteTrait => noteTrait.trait_id === trait.id)?.value || (trait.type === 'BOOL' ? 'false' : trait.type === 'DATE' ? new Date().toISOString() : ''),
    selected: note.traits.filter(noteTrait => noteTrait.trait_id === trait.id).length > 0,
    existing: note.traits.filter(noteTrait => noteTrait.trait_id === trait.id).length > 0
  }))

  const [body, setBody] = useState(note.body)
  const [completed, setCompleted] = useState(note.completed)
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

    const updatedNote: UpdateNote = {
      id: note.id,
      body,
      completed,
      tags: selectableTagList,
      traits: selectableTraitList
    }

    const res = await fetch(`${location.origin}/api/notes/${note.id}`, {
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
    <>
      <form onSubmit={handleSubmit} className="w-1/2">
        <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
          rows={5}
        />
        <div className="text-center">
          <span className="align-middle">Completed:</span>
          <Switch
            onChange={handleCompletedChange}
            checked={completed}
            className="switch-completed"
          />
        </div>
        <span>Tags:</span>
        <SelectableTagList tagList={selectableTagList} setTagList={setSelectableTagList} />
        <span>Traits:</span>
        <SelectableTraitList traitList={selectableTraitList} setTraitList={setSelectableTraitList} />
        <button
          className="btn-primary"
          disabled={isLoading}
        >
          {isLoading && <span>Updating...</span>}
          {!isLoading && <span>Update Note</span>}
        </button>
      </form>
      {error && (
        <div className="error">{error}</div>
      )}
    </>
  )
}