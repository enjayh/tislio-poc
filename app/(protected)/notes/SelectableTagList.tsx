'use client'

import { Dispatch, SetStateAction } from 'react'
import { SelectableTag } from '@/app/utils/types'

export default function SelectableTagList({ tagList, setTagList }: { tagList: SelectableTag[], setTagList: Dispatch<SetStateAction<SelectableTag[]>> }) {
  const handleClick = (id: number) => {
    const updated = tagList.map((tag: SelectableTag) => {
      if (tag.id === id) {
        const selectableTag: SelectableTag = {
          id: tag.id,
          name: tag.name,
          selected: !tag.selected
        }
        return selectableTag
      }
      else {
        return tag
      }
    })

    setTagList(updated)
  }

  return (
    <>
      {tagList.map((tag: SelectableTag) => (
        <button
          key={tag.id}
          className={tag.selected ? "pill pill-tag pill-border" : "pill pill-unselected pill-border-unselected"}
          onClick={(e) => {
            e.preventDefault()
            handleClick(tag.id)
          }}
        >
          {tag.name}
        </button>
      ))}
    </>
  )
}