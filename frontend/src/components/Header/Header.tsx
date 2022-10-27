import { useMeQuery } from 'generated/graphql'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 5rem;
  display: flex;
  align-content: center;
  background-color: darkgrey;
  border-bottom: 1px solid black;
  width: 100%;
  background-color: ${props => props.theme.colors.houseRed};
`

const HeaderLink = styled(Link)`
  display: flex;
  margin-left: auto;
  align-items: center;
  padding: 1rem;

  :visited {
    color: inherit;
  }
`

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const me = useMeQuery()

  return (
    <Wrapper>
      <h1>Header</h1>
      {me[0].data?.me ? (
        <HeaderLink to="/straffepils">Straffepils</HeaderLink>
      ) : (
        ''
      )}
      {me[0].data?.me ? <HeaderLink to="/logout">Logout</HeaderLink> : ''}
    </Wrapper>
  )
}
