'use client'

import { SelectableTrait, Trait } from '@/app/utils/types'
import { Dispatch, SetStateAction } from 'react'

export default function SelectableTraitList({ traitList, setTraitList }: { traitList: SelectableTrait[], setTraitList: Dispatch<SetStateAction<SelectableTrait[]>> }) {
  const onClick = (id: number) => {
    const updated = traitList.map((trait: SelectableTrait) => {
      if (trait.id === id) {
        const selectableTrait: SelectableTrait = {
          id: trait.id,
          name: trait.name,
          type: trait.type,
          value: trait.value,
          selected: !trait.selected,
          existing: trait.existing
        }
        return selectableTrait
      } else {
        return trait
      }
    })

    setTraitList(updated)
  }

  const onChange = (id: number, value: string) => {
    const updated = traitList.map((trait: SelectableTrait) => {
      if (trait.id === id) {
        const selectableTrait: SelectableTrait = {
          id: trait.id,
          name: trait.name,
          type: trait.type,
          value: value,
          selected: trait.selected,
          existing: trait.existing
        }
        return selectableTrait
      } else {
        return trait
      }
    })

    setTraitList(updated)
  }

  return (
    <>
      {traitList.map((trait) => (
        <div key={trait.id}>
          <span
            className={trait.selected ? "pill pill-trait" : "pill pill-unselected"}
            onClick={() => onClick(trait.id)}
          >
            {trait.name} | {trait.type}

          </span>
          {trait.selected &&
            <input
              onChange={(e) => onChange(trait.id, e.target.value)}
              value={trait.value}
            />
          }
        </div>
      ))}
    </>
  )
}