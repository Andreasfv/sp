import { User } from 'generated/graphql'
import React from 'react'

export const UserContext = React.createContext<Omit<
  User,
  'organization'
> | null>(null)
