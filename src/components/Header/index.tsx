import React from 'react'
import { BackIcon, Container, Logo, BackButton } from './styles'
import logoImg from '@assets/logo.png'

interface Props {
  showBackButton?: boolean
}
export function Header({ showBackButton = false }: Props) {
  return (
    <Container>
      {showBackButton && (
        <BackButton>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logoImg} />
    </Container>
  )
}
