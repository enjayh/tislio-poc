'use client'

import { useEffect } from 'react'
import SimpleNav from './components/SimpleNav'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <SimpleNav />
      <main>
        <h2 className="text-center">Something went wrong!</h2>
        <button
          className="btn-primary btn-center"
          onClick={() => reset()}
        >
          Try again
        </button>
      </main>
    </div>
  )
}