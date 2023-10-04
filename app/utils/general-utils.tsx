import { SelectableTrait } from './types'
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

export function getTypeIcon(type: string) {
  switch (type) {
    case 'TEXT':
      return <TiDocumentText className="icon-pill" />
    case 'FLOAT':
      return <TiSortNumerically className="icon-pill" />
    case 'DATE':
      return <TiCalendar className="icon-pill" />
    case 'BOOL':
      return <TiInputCheckedOutline className="icon-pill" />
  }
  throw new Error(`Invalid trait type: ${type}`)
}