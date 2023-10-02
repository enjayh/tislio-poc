'use client'

import { NewTrait } from '@/app/utils/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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

    const res = await fetch('http://localhost:3000/api/traits/', {
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
      <select
        required
        onChange={(e) => setType(e.target.value)}
        value={type}
      >
        <option value="TEXT">TEXT</option>
        <option value="INT">INT</option>
        <option value="FLOAT">FLOAT</option>
        <option value="DATE">DATE</option>
        <option value="BOOL">BOOL</option>
      </select>
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