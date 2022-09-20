import { useTranslate } from '@ur/react-hooks'
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

  font-size: 2rem;
  background: ${props => props.background};
`

interface FullPageErrorProps {
  background?: string
}

export const FullPageError: React.FC<FullPageErrorProps> = ({
  background = '#fff',
}) => {
  const translations = useTranslate({
    reload: 'errors.reload-page',
  })

  return <Wrapper background={background}>{translations.reload}</Wrapper>
}
