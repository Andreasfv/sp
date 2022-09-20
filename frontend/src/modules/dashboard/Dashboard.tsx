import { Button } from '@ur/react-components'
import { useTranslate } from '@ur/react-hooks'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useUser } from 'utils'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  const translations = useTranslate({
    signOut: 'auth.sign-out',
  })

  const nav = useNavigate()
  const user = useUser()

  return (
    <Wrapper>
      <div>
        <h1>Hello, {user.firstName}</h1>

        <Button onClick={() => nav('/logout')}>{translations.signOut}</Button>
      </div>
    </Wrapper>
  )
}
