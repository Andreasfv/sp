import { FullPageError, FullPageLoader } from 'components'
import { UserContext } from 'context'
import { useMeQuery } from 'generated/graphql'
import React from 'react'
import { Navigate } from 'react-router-dom'
import { AuthRoutes } from '.'

interface AuthenticateProps {}

export const Authenticate: React.FC<AuthenticateProps> = () => {
  const [{ data, fetching, error }] = useMeQuery()

  if (fetching) return <FullPageLoader />

  return !!data?.me ? (
    <UserContext.Provider value={data.me}>
      <AuthRoutes />
    </UserContext.Provider>
  ) : (
    <Navigate to="login" />
  )
}
