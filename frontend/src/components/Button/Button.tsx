import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
} from '@ur/react-components'
import styled from 'styled-components'

const StyledButton = styled(BaseButton)``

interface ButtonProps extends BaseButtonProps {}

export const Button: React.FC<ButtonProps> = ({ ...props }) => {
  return <StyledButton {...props} />
}
