import { Header } from 'modules/straffepils/components/Header'
import React from 'react'
import styled from 'styled-components'
import { SPContainer, SPWrapper } from 'modules/straffepils/components'

interface StraffepilsDashboardProps {}

export const StraffepilsDashboard: React.FC<StraffepilsDashboardProps> = () => {
  return (
    <SPWrapper>
      <SPContainer>
        <Header />
        Dashboard
      </SPContainer>
    </SPWrapper>
  )
}
