import { UserContext } from 'context'
import { useMeQuery } from 'generated/graphql'
import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 54px;
  min-height: 54px;
  background-color: lightgray;
  display: flex;
  border-bottom: 1px solid black;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  ${props => props.theme.media.mobile} {
    border-radius: 0;
  }
`
interface HeaderButtonProps {
  to: string
  currentPath: string
}
const HeaderButton = styled(Link)<HeaderButtonProps>`
  padding: 0.75rem;
  align-items: center;
  justify-content: center;
  display: flex;
  flex: 1;
  color: lightyellow;
  font-size: 17px;
  z-index: 100;
  background-color: ${props =>
    props.to === props.currentPath ? 'gray' : 'lightgray'};
`
interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const location = useLocation()
  const me = useContext(UserContext)
  return (
    <Wrapper>
      <HeaderButton currentPath={location.pathname} to="/straffepils">
        Oversikt
      </HeaderButton>
      <HeaderButton
        currentPath={location.pathname}
        to="/straffepils/meld-straffepils"
      >
        Meld Straffepils
      </HeaderButton>
      {me?.role === 'ADMIN' ? (
        <HeaderButton
          currentPath={location.pathname}
          to="/straffepils/administrate-straffepils"
        >
          Administrer SP
        </HeaderButton>
      ) : (
        ''
      )}
    </Wrapper>
  )
}
