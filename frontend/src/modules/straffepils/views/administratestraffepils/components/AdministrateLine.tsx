import { RoundButton } from 'components/Button/RoundButton'
import {
  Straffepils,
  User,
  useUpdateStraffepilsMutation,
} from 'generated/graphql'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  border-bottom: 1px solid black;
  gap: 1rem;
`

interface ContentBoxProps {
  width: string
}
const ContentBox = styled.div<ContentBoxProps>`
  display: flex;
  flex-direction: column;
  width: ${props => (props.width ? props.width : '')};
`

const BTN = styled(RoundButton)`
  margin-left: auto;
`

interface AdministrateLineLineProps {
  refetch: () => void
  straffepils: {
    __typename?: 'Straffepils' | undefined
    id: number
    giverId: number
    receiverId: number
    reason?: string | null | undefined
    amount: number
    receiver: {
      id: number
      firstName: string
      lastName: string
    }
    giver: {
      id: number
      firstName: string
      lastName: string
    }
  } | null
}

export const AdministrateLine: React.FC<AdministrateLineLineProps> = ({
  straffepils,
  refetch,
}) => {
  if (!straffepils) {
    return null
  }

  const { id, receiver, giver, amount, reason } = straffepils!

  const [{ fetching, error }, updateStraffePils] =
    useUpdateStraffepilsMutation()

  function handleConfirmStraffepils() {
    updateStraffePils({
      id,
      data: {
        confirmed: true,
      },
    }).then(() => refetch())
  }

  return (
    <Wrapper>
      <ContentBox width="200px">
        <div>Giver: {giver.firstName}</div>
        <div>Antall: {amount}</div>
      </ContentBox>
      <div>Begrunnelse: {reason}</div>
      <BTN onClick={handleConfirmStraffepils}>Y</BTN>
      <BTN
        onClick={() => {
          alert('moren din er mann')
        }}
      >
        N
      </BTN>
    </Wrapper>
  )
}
