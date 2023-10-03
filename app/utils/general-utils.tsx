import { SelectableTrait } from "./types"

export function isValidTraitList(selectableTraitList: SelectableTrait[]) {
  let isValid = true

  selectableTraitList.forEach(trait => {
    if (trait.selected) {
      switch (trait.type) {
        case 'TEXT':
          break
        case 'INT':
          if (isNaN(parseInt(trait.value))) {
            isValid = false
          }
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