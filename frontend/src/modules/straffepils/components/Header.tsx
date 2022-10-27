import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 54px;
  background-color: lightgray;
  display: flex;
  border-bottom: 1px solid black;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  overflow: hidden;
`
interface HeaderButtonProps {
  to: string
  currentPath: string
}
const HeaderButton = styled(Link)<HeaderButtonProps>`
  padding: 1rem;
  align-content: center;
  justify-content: center;
  display: flex;
  flex: 1;
  color: lightyellow;
  font-size: 19px;
  z-index: 100;
  background-color: ${props =>
    props.to === props.currentPath ? 'gray' : 'lightgray'};
`
interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const location = useLocation()

  return (
    <Wrapper>
      <HeaderButton currentPath={location.pathname} to="/straffepils">
        Home
      </HeaderButton>
      <HeaderButton
        currentPath={location.pathname}
        to="/straffepils/meld-straffepils"
      >
        Meld Straffepils
      </HeaderButton>
      <HeaderButton
        currentPath={location.pathname}
        to="/straffepils/se-straffepils"
      >
        Se Straffepils
      </HeaderButton>
    </Wrapper>
  )
}
