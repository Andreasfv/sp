import React from 'react'
import styled from 'styled-components'

interface ContainerProps {}

export const SPContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 300px;
  margin-bottom: 1rem;
  flex: 1;
  border-radius: 1rem;
  overflow-y: scroll;
  box-shadow: ${props => props.theme.layout.defaultShadow};
  ${props => props.theme.media.mobile} {
    width: 100%;
    height: 100%;
    border-radius: 0;
    margin-bottom: 0;
  }
  background-color: white;
`
