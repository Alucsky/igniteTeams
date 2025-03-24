import React from 'react'
import { Container, Message } from './styles'

interface Props {
  message: string
}
export function ListEmpity({ message }: Props) {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  )
}
