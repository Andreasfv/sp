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

interface UserStraffepilsLineProps {
  user: {
    __typename?: 'User' | undefined
    id: number
    firstName: string
    lastName: string
    antallStraffepils?: number | null | undefined
  } | null
}

export const UserStraffepilsLine: React.FC<UserStraffepilsLineProps> = ({
  user,
}) => {
  if (!user) {
    return null
  }

  const { id, firstName, lastName, antallStraffepils } = user!

  const [{ fetching, error }, updateStraffePils] =
    useUpdateStraffepilsMutation()

  return (
    <Wrapper>
      <ContentBox width="200px">
        <div>{firstName + ' ' + lastName}</div>
        <div>Antall: {antallStraffepils}</div>
      </ContentBox>
    </Wrapper>
  )
}
