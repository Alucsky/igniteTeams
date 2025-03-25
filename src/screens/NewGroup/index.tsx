import React, { useState } from 'react'
import { Container, Content, Icon } from './styles'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import Button from '@components/Button'
import Input from '@components/Input'
import { useNavigation } from '@react-navigation/native'
import { groupCreate } from '@storage/group/groupCreate'
import { AppError } from '@utils/AppError'
import { Alert } from 'react-native'

export function NewGroup() {
  const [group, setGroup] = useState('')
  const navigate = useNavigation()
  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        throw new AppError('Nome da turma é obrigatório')
      }

      await groupCreate(group)
      navigate.navigate('players', { group })
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo grupo', error.message)
      } else {
        Alert.alert('Novo grupo', 'Ocorreu um erro ao tentar criar o grupo')
        console.error(error)
      }
    }
  }
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie a turma para adicionar novas pessoas"
        />
        <Input placeholder="Nome da turma" onChangeText={setGroup} />
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  )
}
