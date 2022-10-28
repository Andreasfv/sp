import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
} from '@ur/react-components'
import styled from 'styled-components'

const StyledButton = styled(BaseButton)`
  width: 32px;
  height: 32px;
  border-radius: 999px;
  & > div {
    padding: 0 0.25rem;
  }
`

interface RoundButtonProps extends BaseButtonProps {}

export const RoundButton: React.FC<RoundButtonProps> = ({ ...props }) => {
  return <StyledButton {...props} />
}
