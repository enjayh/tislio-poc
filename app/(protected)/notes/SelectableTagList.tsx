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
        <span
          key={tag.id}
          className={tag.selected ? "item-pill" : "item-pill-unselected"}
          onClick={() => handleClick(tag.id)}
        >
          {tag.name} | {String(tag.selected)}
        </span>
      ))}
    </>
  )
}