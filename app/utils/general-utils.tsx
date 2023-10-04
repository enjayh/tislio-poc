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