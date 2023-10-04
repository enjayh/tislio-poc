import { Dispatch, SetStateAction } from 'react'
import TraitTypeButton from './TraitTypeButton'

export default function TraitTypeSelector({ type, setType }: { type: string, setType: Dispatch<SetStateAction<string>> }) {
  return (
    <div className="four-column">
      <TraitTypeButton
        type={type}
        setType={setType}
        buttonType="TEXT"
        buttonText="Text"
      />
      <TraitTypeButton
        type={type}
        setType={setType}
        buttonType="FLOAT"
        buttonText="Number"
      />
      <TraitTypeButton
        type={type}
        setType={setType}
        buttonType="DATE"
        buttonText="Date"
      />
      <TraitTypeButton
        type={type}
        setType={setType}
        buttonType="BOOL"
        buttonText="Toggle"
      />
    </div>
  )
}