import { useTranslate } from '@ur/react-hooks'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { clearAuthToken } from './util'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  font-size: 3em;
`

interface LogoutProps {}

export const Logout: React.FC<LogoutProps> = () => {
  const translations = useTranslate({
    goodbye: 'auth.goodbye',
  })

  useEffect(() => {
    clearAuthToken()
    window.location.href = '/login'
  }, [])

  return <Wrapper>{translations.goodbye}</Wrapper>
}
