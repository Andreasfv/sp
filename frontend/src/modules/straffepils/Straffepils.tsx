import { useForm } from '@ur/react-hooks'
import { Button, Input } from 'components'
import {
  useAllStraffepilsQuery,
  useCreateStraffepilsMutation,
  useMeQuery,
} from 'generated/graphql'
import React from 'react'
import styled from 'styled-components'
import { Router, Routes, Route } from 'react-router-dom'

const Wrapper = styled.div`
  justify-self: center;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: calc(100% - 6rem);
  border: ${props => props.theme.colors.gray8} solid 1px;
  border-radius: 1.5rem;
  gap: 1rem;
  ${props => props.theme.media.mobile} {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`

const InputField = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  padding: 1rem;
`

interface StraffepilsProps {}

export const Straffepils: React.FC<StraffepilsProps> = () => {
  const me = useMeQuery()

  const { formValues, submitHandler, formChangeHandler } = useForm({
    values: {
      name: '',
    },
  })

  const [
    { fetching: createStraffepilsFetching, error: createStraffepilsError },
    createStraffepils,
  ] = useCreateStraffepilsMutation()

  const [{ fetching, data, error }, refetch] = useAllStraffepilsQuery({
    variables: { byReceiver: me[0].data?.me?.id },
  })

  return <Wrapper></Wrapper>
}
