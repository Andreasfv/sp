import { UserContext } from 'context'
import { useGetOrganizationUsersSpAmountQuery } from 'generated/graphql'
import { SPWrapper, SPContainer } from 'modules/straffepils/components'
import { Header } from 'modules/straffepils/components/Header'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { UserStraffepilsLine } from './components/UserStraffepilsLine'

const Wrapper = styled.div`
  justify-self: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`

interface SeStraffepilsProps {}

export const SeStraffepils: React.FC<SeStraffepilsProps> = () => {
  const user = useContext(UserContext)

  const [{ data, fetching, error }] = useGetOrganizationUsersSpAmountQuery({
    variables: {
      id: user?.organizationId!,
    },
  })
  console.log(data)
  const listItems = data?.organizationUsers?.map(user =>
    user ? <UserStraffepilsLine user={user} /> : null
  )

  return (
    <SPWrapper>
      <SPContainer>
        <Header />
        {listItems}
      </SPContainer>
    </SPWrapper>
  )
} // Compare this snippet from frontend/src/modules/dashboard/Dashboard.tsx:
