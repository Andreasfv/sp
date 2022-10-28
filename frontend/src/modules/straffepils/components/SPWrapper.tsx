import styled from 'styled-components'

export const SPWrapper = styled.div`
  justify-self: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;

  ${props => props.theme.media.mobile} {
    margin-top: 0;
  }
`
