import { Loader } from '@ur/react-components'
import { useForm, useTranslate } from '@ur/react-hooks'
import { FullPageLoader, FullPageError, Input, Button } from 'components'
import { useIsLoggedInQuery, useLoginMutation } from 'generated/graphql'
import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useKeyDown } from 'utils'
import { setAuthToken } from './util'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
`
const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 320px;

  padding: 1rem;
  border: 1px solid ${props => props.theme.colors.gray8};

  h1 {
    display: flex;
    justify-content: space-between;

    margin: 0;
    font-size: 1.2em;
  }
  button {
    align-self: flex-end;
  }
  p {
    margin: 0;
    color: ${props => props.theme.colors.error};
    font-size: 0.8em;
  }
`

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  const translations = useTranslate({
    header: 'auth.login',
    email: 'auth.email',
    password: 'auth.password',
    signIn: 'auth.sign-in',

    errors: {
      credentials: 'auth.errors.credentials',
    },
  })

  const nav = useNavigate()

  const {
    formValues: form,
    formChangeHandler: handler,
    submitHandler: submit,
  } = useForm({
    values: {
      email: '',
      password: '',
    },
  })

  const handleEnter = useKeyDown('Enter', submit(handleSubmit))

  const [
    {
      data: isLoggedInData,
      fetching: isLoggedInFetching,
      error: isLoggedInError,
    },
  ] = useIsLoggedInQuery()

  const [{ fetching: loginFetching, error: loginError }, login] =
    useLoginMutation()

  const submitDisabled = useMemo(
    () => loginFetching || !form.email || !form.password,
    [loginFetching, form.email, form.password]
  )

  async function handleSubmit() {
    if (submitDisabled) return

    const res = await login({ data: form })
    if (!res.data?.loginUser.token || res.error) return

    setAuthToken(res.data.loginUser.token)
    nav('/')
  }

  useEffect(() => {
    if (isLoggedInData?.isLoggedIn) nav('/')
  }, [isLoggedInData, nav])

  if (isLoggedInFetching) return <FullPageLoader />
  if (!!isLoggedInError) return <FullPageError />

  return (
    <Wrapper>
      <Card>
        <h1>
          {translations.header}
          {loginFetching && <Loader.Spinner size={16} thickness={2} />}
        </h1>

        {!!loginError && <p>{translations.errors.credentials}</p>}

        <Input
          value={form.email}
          placeholder={translations.email}
          autoFocus
          disabled={loginFetching}
          onKeyDown={handleEnter}
          onChange={handler('email')}
        />
        <Input
          value={form.password}
          type="password"
          placeholder={translations.password}
          disabled={loginFetching}
          onKeyDown={handleEnter}
          onChange={handler('password')}
        />

        <Button disabled={submitDisabled} onClick={submit(handleSubmit)}>
          {translations.signIn}
        </Button>
      </Card>
    </Wrapper>
  )
}
