import React, { useCallback } from 'react'

export function useKeyDown(
  key: string,
  handler: (event: React.KeyboardEvent) => void
) {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === key) handler(event)
    },
    [handler, key]
  )

  return handleKeyDown
}
