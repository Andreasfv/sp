import { Header } from 'modules/straffepils/components/Header'
import React from 'react'
import styled from 'styled-components'
import { SPContainer, SPWrapper } from 'modules/straffepils/components'
import { useGetOrganizaionQuery } from 'generated/graphql'

interface AdministrateStraffepilsProps {}

export const AdministrateStraffepils: React.FC<
  AdministrateStraffepilsProps
> = () => {
  const [{ data, error, fetching }, refetch] = useGetOrganizaionQuery({
    variables: { id: 1 },
  })
  return (
    <SPWrapper>
      <SPContainer>
        <Header />
        Dashboard
      </SPContainer>
    </SPWrapper>
  )
}
