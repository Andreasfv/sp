import { UserStraffepilsQuery } from 'generated/graphql'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  border-bottom: 2px solid black;
  padding: 1rem;
  align-items: center;
  min-height: 32px;
  overflow-y: scroll;
  flex-direction: row;
`

interface DetailsProps {
  userStraffepils: UserStraffepilsQuery | undefined
}

export const Details: React.FC<DetailsProps> = ({ userStraffepils }) => {
  return (
    <Wrapper>
      antall SP: {userStraffepils?.userStraffepils?.straffepilsAmount}
    </Wrapper>
  )
}
