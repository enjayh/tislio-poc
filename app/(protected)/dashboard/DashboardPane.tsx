'use client'

import { formatNoteBodyForDisplay, formatTraitValueForDisplay } from '@/app/utils/general-utils'
import { Note, Tag, Trait, TraitFilter } from '@/app/utils/types'
import { useState } from 'react'
import { TiTick } from 'react-icons/ti'
import Switch from 'react-switch'

export default function DashboardPane({ tagList, traitList, noteList }: { tagList: Tag[], traitList: Trait[], noteList: Note[] }) {
  const [tags] = useState(tagList)
  const [traits] = useState(traitList)
  const [notes] = useState(noteList)
  const [tagFilters, setTagFilters] = useState<number[]>([])
  const [traitFilters, setTraitFilters] = useState<TraitFilter[]>([])
  const [showCompleted, setShowCompleted] = useState(false)

  const handleTagClick = (id: number) => {
    if (tagFilters.includes(id)) {
      setTagFilters(tagFilters.filter(tagId => tagId !== id))
    } else {
      setTagFilters([...tagFilters, id])
    }
  }

  const handleTraitClick = (id: number) => {
    if (traitFilters.filter(f => f.id === id).length > 0) {
      setTraitFilters(traitFilters.filter(traitFilter => traitFilter.id !== id))
    } else {
      setTraitFilters([...traitFilters, { id, value: 'true' }])
    }
  }

  const filterNotes = (notes: Note[], tagFilters: number[], traitFilters: TraitFilter[]): Note[] => {
    let filteredNotes = notes
    if (tagFilters.length > 0) {
      // OR filter
      // filteredNotes = filteredNotes.filter(note => note.tags.filter(tag => tagFilters.includes(tag.id)).length > 0)

      // AND filter
      // All the tags must be in the tagFilters
      filteredNotes = notes.filter(note => note.tags.filter(tag => tagFilters.includes(tag.id)).length === tagFilters.length)
    }
    if (traitFilters.length > 0) {
      // OR
      //filteredNotes = filteredNotes.filter(note => note.traits.filter(trait => traitFilters.filter(f => (f.id === trait.trait.id) && (f.value === trait.value)).length > 0).length > 0)

      // AND filter
      filteredNotes = filteredNotes.filter(
        note => note.traits.length > 0 && note.traits.filter(
          trait => traitFilters.filter(
            f => (f.id === trait.trait.id)).length > 0).length === traitFilters.length)

      // AND filter that checks trait value
      // filteredNotes = filteredNotes.filter(
      //   note => note.traits.length > 0 && note.traits.filter(
      //     trait => traitFilters.filter(
      //       f => (f.id === trait.trait.id) && (f.value === trait.value)).length >= 0).length === traitFilters.length)
    }

    return filteredNotes
  }

  return (
    <>
      <div className="text-right">
        <span className="align-middle">Show Completed</span>
        <Switch
          onChange={() => setShowCompleted(!showCompleted)}
          checked={showCompleted}
          className="switch-completed"
        />
      </div>
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
            className={'pill-inline pill ' + (traitFilters.filter(f => f.id === trait.id).length > 0 ? 'pill-trait' : 'pill-unselected')}
          >
            {trait.name}
          </button>
        ))}
      </div>
      <div>
        <h2>Notes</h2>
        {filterNotes(notes, tagFilters, traitFilters).map(note => (
          <>
            {(!note.completed || (showCompleted && note.completed)) && (
              <div key={note.id}>
                <button
                  key={note.id}
                  className="pill pill-note pill-inline"
                >
                  {note.completed && <TiTick />}
                  {formatNoteBodyForDisplay(note)}
                </button>
                {note.tags.map(tag => (<button key={tag.id} className="pill-inline pill pill-tag">{tag.name}</button>))}
                {note.traits.map(traitWithValue => (
                  <button
                    key={traitWithValue.trait_id}
                    className="pill-inline pill pill-trait"
                  >
                    {traitWithValue.trait.name + ': ' + formatTraitValueForDisplay(traitWithValue)}
                  </button>
                ))}
              </div>
            )}
          </>
        ))}
      </div>
    </>
  )
}