import { Loader } from '@ur/react-components'
import React from 'react'
import styled from 'styled-components'

interface WrapperProps {
  background: string
}
const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background: ${props => props.background};
`

interface FullPageLoaderProps {
  background?: string
  transparent?: boolean
}

export const FullPageLoader: React.FC<FullPageLoaderProps> = ({
  background = '#fff',
  transparent = false,
}) => {
  return (
    <Wrapper background={transparent ? '#0000' : background}>
      <Loader.Spinner size={64} thickness={6} />
    </Wrapper>
  )
}
