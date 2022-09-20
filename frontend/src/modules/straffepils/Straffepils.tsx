import { Input } from 'components'
import React from 'react'
import styled from 'styled-components'

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
  width: 600px;
  height: calc(100% - 6rem);
  border: ${props => props.theme.colors.gray8} solid 1px;
  border-radius: 1.5rem;
  padding: 1rem;

  ${props => props.theme.media.mobile} {
    width: 100%;
    height: 100%;
  }
`

const InputField = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

interface StraffepilsProps {}

export const Straffepils: React.FC<StraffepilsProps> = () => {
  const
  return (
    <Wrapper>
      <Container>
        <InputField>
          <Input />
        </InputField>
        <h1>Straffepils</h1>
      </Container>
    </Wrapper>
  )
}
