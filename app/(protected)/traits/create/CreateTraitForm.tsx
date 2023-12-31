'use client'

import { NewTrait } from '@/app/utils/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import TraitTypeSelector from './TraitTypeSelector'

export default function CreateTraitForm() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [type, setType] = useState('TEXT')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    const trait: NewTrait = {
      name,
      type
    }

    const res = await fetch(`${location.origin}/api/traits/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trait)
    })

    if (res.ok) {
      router.refresh()
      router.push('/traits')
    } else {
      throw new Error('Error creating tag')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <span>Name:</span>
      <input
        required
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <span>Type:</span>
      <TraitTypeSelector type={type} setType={setType} />
      <button
        className="btn-primary"
        disabled={isLoading}
      >
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Trait</span>}
      </button>
    </form>
  )
}