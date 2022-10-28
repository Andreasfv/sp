import { Header } from 'modules/straffepils/components/Header'
import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { SPContainer, SPWrapper } from 'modules/straffepils/components'
import {
  useAllStraffepilsQuery,
  useGetOrganizaionQuery,
} from 'generated/graphql'
import { UserContext } from 'context'
import { AdministrateLine } from './components/AdministrateLine'

interface AdministrateStraffepilsProps {}

export const AdministrateStraffepils: React.FC<
  AdministrateStraffepilsProps
> = () => {
  const user = useContext(UserContext)
  const [spLines, setSpLines] = React.useState<JSX.Element[] | []>([])
  const [{ data: sp, error: spError, fetching: spFetching }, refetchSp] =
    useAllStraffepilsQuery({
      variables: {
        confirmed: false,
        organizationId: user?.organizationId,
      },
    })

  useEffect(() => {
    console.log(spFetching)
    if (!spFetching) {
      if (!sp?.allStraffepils) return
      const lines = sp?.allStraffepils?.map(sp => (
        <AdministrateLine
          straffepils={sp}
          refetch={() => {
            console.log('Bitch should be refetching')
            refetchSp({
              variables: {
                confirmed: false,
                organizationId: user?.organizationId,
              },
            })
          }}
        />
      ))
      setSpLines(lines)
    }
  }, [spFetching])

  return (
    <SPWrapper>
      <SPContainer>
        <Header />
        {spLines}
      </SPContainer>
    </SPWrapper>
  )
}
