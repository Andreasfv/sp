import { SPWrapper, SPContainer } from 'modules/straffepils/components'
import { Header } from 'modules/straffepils/components/Header'
import React from 'react'
import styled from 'styled-components'

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
  return (
    <SPWrapper>
      <SPContainer>
        <Header />
        Se SP
      </SPContainer>
    </SPWrapper>
  )
} // Compare this snippet from frontend/src/modules/dashboard/Dashboard.tsx:
