import { Header } from 'modules/straffepils/components/Header'
import React from 'react'
import styled from 'styled-components'
import { SPContainer, SPWrapper } from 'modules/straffepils/components'

interface MeldStraffepilsProps {}

export const MeldStraffepils: React.FC<MeldStraffepilsProps> = () => {
  return (
    <SPWrapper>
      <SPContainer>
        <Header />
        Meld SP
      </SPContainer>
    </SPWrapper>
  )
} // Compare this snippet from frontend/src/modules/dashboard/Dashboard.tsx:
