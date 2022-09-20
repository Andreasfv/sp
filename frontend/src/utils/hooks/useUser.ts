import { UserContext } from 'context/UserContext'
import { useContext } from 'react'

export function useUser() {
  const user = useContext(UserContext)
  if (!user) throw new Error('User is not defined in context')

  return user
}
