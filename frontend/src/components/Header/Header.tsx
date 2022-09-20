import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 5rem;
  display: flex;
  align-content: center;
  background-color: darkgrey;
  border-bottom: 1px solid black;
  background-color: ${props => props.theme.colors.houseRed};
`

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <Wrapper>
      <h1>Header</h1>
    </Wrapper>
  )
}
