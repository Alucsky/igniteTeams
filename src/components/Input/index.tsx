import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components'
import { Container } from './styles'

export default function Input({ ...rest }: TextInputProps) {
  const { COLORS } = useTheme()

  return (
    <Container placeholderTextColor={COLORS.GRAY_300} {...rest}></Container>
  )
}
