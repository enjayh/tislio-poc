'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateTagForm() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    const tag = { name }

    const res = await fetch('http://localhost:3000/api/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tag)
    })

    const json = await res.json()

    if (json.error) {
      console.error('Error creating tag: ' + json.error.message)
    }
    if (json.data) {
      router.refresh()
      router.push('/tags')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <span>Name:</span>
      <input
        required
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}>
      </input>
      <button
        className="btn-primary"
        disabled={isLoading}
      >
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Tag</span>}
      </button>
    </form>
  )
}