import {
  Input as BaseInput,
  InputProps as BaseInputProps,
} from '@ur/react-components'
import styled from 'styled-components'

const StyledInput = styled(BaseInput)``

interface InputProps extends BaseInputProps {}

export const Input: React.FC<InputProps> = ({ ...props }) => {
  return <StyledInput {...props} />
}
