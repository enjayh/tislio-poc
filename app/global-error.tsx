'use client'

import { useEffect } from 'react'
import SimpleNav from './components/SimpleNav'

export default function GlobalError({
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
    <html>
      <body>
        <SimpleNav />
        <main>
          <h2 className="text-center">Something went very wrong!</h2>
          <button
            className="btn-primary btn-center"
            onClick={() => reset()}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}