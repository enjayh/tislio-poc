import { Note, SelectableTrait, TraitWithValue } from './types'
import { TiCalendar, TiDocumentText, TiInputCheckedOutline, TiSortNumerically } from 'react-icons/ti'

export function isValidTraitList(selectableTraitList: SelectableTrait[]) {
  let isValid = true

  selectableTraitList.forEach(trait => {
    if (trait.selected) {
      switch (trait.type) {
        case 'TEXT':
          break
        case 'FLOAT':
          if (isNaN(parseFloat(trait.value))) {
            isValid = false
          }
          break
        case 'DATE':
          if (isNaN(Date.parse(trait.value))) {
            isValid = false
          }
          break
        case 'BOOL':
          if (trait.value !== 'true' && trait.value !== 'false') {
            isValid = false
          }
          break
      }
    }
  })

  return isValid
}

export function getTypeIcon(type: string, classNames: string) {
  switch (type) {
    case 'TEXT':
      return <TiDocumentText className={classNames} />
    case 'FLOAT':
      return <TiSortNumerically className={classNames} />
    case 'DATE':
      return <TiCalendar className={classNames} />
    case 'BOOL':
      return <TiInputCheckedOutline className={classNames} />
  }
  throw new Error(`Invalid trait type: ${type}`)
}

const maxCharactersDisplayed = 40

export function formatNoteBodyForDisplay(note: Note) {
  const firstLine = note.body.split('\n')[0]
  const slicedLine = firstLine.slice(0, maxCharactersDisplayed)
  if (firstLine.length > maxCharactersDisplayed) {
    return slicedLine + '...'
  }

  return slicedLine
}

export function formatTraitValueForDisplay(traitWithValue: TraitWithValue) {
  switch (traitWithValue.trait.type) {
    case 'DATE':
      return new Date(traitWithValue.value).toLocaleDateString()
    case 'BOOL':
      return traitWithValue.value === 'true' ? 'Yes' : 'No'
  }
  return traitWithValue.value
}