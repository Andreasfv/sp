import { RoundButton } from 'components/Button/RoundButton'
import { Straffepils, User } from 'generated/graphql'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
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

const KvittEllerDobbelt = styled(RoundButton)`
  margin-left: auto;
`

interface StraffepilsLineProps {
  straffepils: {
    id: number
    reason: string | null | undefined
    amount: number
    giver: Omit<User, 'email' | 'organization' | 'role' | 'organizationId'>
    receiver: Omit<User, 'email' | 'organization' | 'role' | 'organizationId'>
    confirmed: boolean
  }
}

export const StraffepilsLine: React.FC<StraffepilsLineProps> = ({
  straffepils,
}) => {
  const { id, receiver, giver, amount, confirmed, reason } = straffepils
  return (
    <Wrapper>
      <ContentBox width="200px">
        <div>Giver: {giver.firstName}</div>
        <div>Antall: {amount}</div>
      </ContentBox>
      <div>Begrunnelse: {reason}</div>
      <KvittEllerDobbelt
        onClick={() => {
          alert('moren din er mann')
        }}
      >
        K/D
      </KvittEllerDobbelt>
    </Wrapper>
  )
}
