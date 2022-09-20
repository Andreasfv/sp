import { fallbackExchange } from '@urql/core/dist/types/exchanges/fallback'
import { Header } from 'components/Header/Header'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`
interface BootstrapProps {
  children: React.ReactNode
}

export const Bootstrap: React.FC<BootstrapProps> = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  )
}
