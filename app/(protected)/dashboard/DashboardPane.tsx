'use client'

import { formatNoteBodyForDisplay, formatTraitValueForDisplay } from '@/app/utils/general-utils'
import { Note, Tag, Trait } from '@/app/utils/types'
import { useState } from 'react'
import { TiTick } from 'react-icons/ti'

export default function DashboardPane({ tagList, traitList, noteList }: { tagList: Tag[], traitList: Trait[], noteList: Note[] }) {
  const [tags] = useState(tagList)
  const [traits] = useState(traitList)
  const [notes] = useState(noteList)
  const [tagFilters, setTagFilters] = useState<number[]>([])
  const [traitFilters, setTraitFilters] = useState<number[]>([])

  const handleTagClick = (id: number) => {
    if (tagFilters.includes(id)) {
      setTagFilters(tagFilters.filter(tagId => tagId !== id))
    } else {
      setTagFilters([...tagFilters, id])
    }
  }

  const handleTraitClick = (id: number) => {
    if (traitFilters.includes(id)) {
      setTraitFilters(traitFilters.filter(tagId => tagId !== id))
    } else {
      setTraitFilters([...traitFilters, id])
    }
  }

  const filterNotes = (notes: Note[], tagFilters: number[], traitFilters: number[]): Note[] => {
    let filteredNotes = notes
    if (tagFilters.length > 0) {
      // OR filter
      filteredNotes = filteredNotes.filter(note => note.tags.filter(tag => tagFilters.includes(tag.id)).length > 0)

      // AND filter
      // All the tags must be in the tagFilters
      // filteredNotes = notes.filter(note => note.tags.filter(tag => tagFilters.includes(tag.id)).length === tagFilters.length)
    }
    if (traitFilters.length > 0) {
      filteredNotes = filteredNotes.filter(note => note.traits.filter(trait => traitFilters.includes(trait.trait_id)).length > 0)
    }

    return filteredNotes
  }

  return (
    <>
      <div>
        <h2>Tags</h2>
        {tags.map(tag => (
          <button
            key={tag.id}
            onClick={() => handleTagClick(tag.id)}
            className={'pill-inline pill ' + (tagFilters.includes(tag.id) ? 'pill-tag' : 'pill-unselected')}
          >
            {tag.name}
          </button>
        ))}
      </div>
      <div>
        <h2>Traits</h2>
        {traits.map(trait => (
          <button
            key={trait.id}
            onClick={() => handleTraitClick(trait.id)}
            className={'pill-inline pill ' + (traitFilters.includes(trait.id) ? 'pill-trait' : 'pill-unselected')}
          >
            {trait.name}
          </button>
        ))}
      </div>
      <div>
        <h2>Notes</h2>
        {filterNotes(notes, tagFilters, traitFilters).map(note => (
          <div key={note.id}>
            <button
              key={note.id}
              className="pill pill-note pill-inline"
            >
              {note.completed && (<TiTick />)}
              {formatNoteBodyForDisplay(note)}
            </button>
            {note.tags.map(tag => (<button key={tag.id} className="pill-inline pill pill-tag">{tag.name}</button>))}
            {note.traits.map(traitWithValue => (<button key={traitWithValue.trait_id} className="pill-inline pill pill-trait" >{traitWithValue.trait.name + ': ' + formatTraitValueForDisplay(traitWithValue)}</button>))}
          </div>
        ))}
      </div>
    </>
  )
}