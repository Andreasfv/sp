import { Header } from 'modules/straffepils/components/Header'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { SPContainer, SPWrapper } from 'modules/straffepils/components'
import { useForm } from '@ur/react-hooks'
import { Input as BaseInput } from 'components'
import { Feedback, SPForm } from './types'
import {
  Button as BaseButton,
  Select as BaseSelect,
} from '@ur/react-components'
import {
  useCreateStraffepilsMutation,
  useGetOrganizaionQuery,
  useGetOrganizationUsersQuery,
  useMeQuery,
} from 'generated/graphql'

const Container = styled.div`
  display: flex;
  padding: 1rem;
  width: 100%;
  flex-direction: column;
  gap: 5px;
`
const Select = styled(BaseSelect)`
  width: calc(100% - 2rem);
  height: 48px;

  .--select-display,
  .--select-display-inner {
    height: 48px;
  }
`

const Button = styled(BaseButton)`
  width: calc(100% - 2rem);
  & > div {
    justify-content: center;
  }
`

const Input = styled(BaseInput)`
  width: calc(100% - 2rem);
  height: 48px;
`
interface FeedbackProps {
  status: boolean
}
const FeedbackBox = styled.div<FeedbackProps>`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  color: ${props => (props.status ? 'green' : 'red')};
`
interface MeldStraffepilsProps {}

export const MeldStraffepils: React.FC<MeldStraffepilsProps> = () => {
  const {
    formValues: form,
    submitHandler,
    formChangeHandler,
  } = useForm<SPForm>({
    values: {
      amount: '1',
      user: null,
      reason: '',
    },
  })
  const [feedback, setFeedback] = useState<Feedback>({
    status: true,
    message: '',
  })

  const me = useMeQuery()

  const [{ data, error, fetching }, refetch] = useGetOrganizationUsersQuery({
    variables: { id: me[0].data?.me?.organizationId! },
  })

  const [{ error: spError, fetching: spFetching }, createStraffepils] =
    useCreateStraffepilsMutation()

  function handleCreateStraffepilsSubmit() {
    console.log(form)
    if (form.amount == '') {
      setFeedback({
        status: false,
        message: 'Du må angi et antall straffepils',
      })
      return
    }
    if (typeof form.user != 'number') {
      setFeedback({
        status: false,
        message: 'Du må velge en bruker',
      })
      return
    }

    createStraffepils({
      data: {
        amount: parseInt(form.amount),
        giverId: me[0].data?.me?.id!,
        receiverId: form.user!,
        reason: form.reason,
      },
    }).then(result => {
      setFeedback({
        status: result.data?.createStraffepils?.ok,
        message: result.data?.createStraffepils?.ok
          ? 'Straffepils opprettet!'
          : 'Noe gikk galt, prøv igjen senere',
      })
      formChangeHandler('reason')('')
    })
  }
  const options = data?.organizationUsers
    ? data?.organizationUsers.map(user => {
        return {
          value: user?.id ?? 999999,
          label: user?.firstName ?? '' + user?.lastName ?? '',
        }
      })
    : [{ value: 999999, label: 'Ingen brukere' }]

  return (
    <SPWrapper>
      <SPContainer>
        <Header />
        <Container>
          Velg offer
          <Select
            options={options}
            onChange={formChangeHandler('user')}
            value={form.user}
          />
        </Container>
        <Container>
          Antall
          <Input
            type="number"
            value={form.amount}
            onChange={formChangeHandler('amount')}
            name="amount"
          />
        </Container>
        <Container>
          Begrunnelse
          <Input
            type="text"
            value={form.reason}
            onChange={formChangeHandler('reason')}
            name="reason"
          />
        </Container>
        <Container>
          <Button onClick={handleCreateStraffepilsSubmit} disabled={spFetching}>
            Meld straffepils
          </Button>
        </Container>
        <Container>
          <FeedbackBox status={feedback.status ?? true}>
            {feedback.message}
          </FeedbackBox>
        </Container>
      </SPContainer>
    </SPWrapper>
  )
} // Compare this snippet from frontend/src/modules/dashboard/Dashboard.tsx:
