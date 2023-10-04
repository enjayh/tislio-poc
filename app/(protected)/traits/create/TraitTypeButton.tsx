import { getTypeIcon } from "@/app/utils/general-utils"
import { Dispatch, SetStateAction } from "react"

export default function TraitTypeButton({
  type,
  setType,
  buttonType,
  buttonText
}: {
  type: string,
  setType: Dispatch<SetStateAction<string>>,
  buttonType: string,
  buttonText: string
}) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        setType(buttonType)
      }}
      className={type === buttonType ? 'btn-trait-selected' : ''}
    >
      {getTypeIcon(buttonType, 'icon-btn')}
      {buttonText}
    </button>
  )
}