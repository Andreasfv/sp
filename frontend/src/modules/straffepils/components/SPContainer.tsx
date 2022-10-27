import React from 'react'
import styled from 'styled-components'

interface ContainerProps {}

export const SPContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin-bottom: 1rem;
  flex: 1;
  border: ${props => props.theme.colors.gray8} solid 1px;
  border-radius: 1rem;
  gap: 1rem;
  ${props => props.theme.media.mobile} {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`
