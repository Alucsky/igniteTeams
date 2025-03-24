import { useState } from 'react'
import { Container } from './styles'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import GroupCard from '@components/GroupCard'
import { FlatList } from 'react-native'
import { ListEmpity } from '@components/ListEmpity'
import Button from '@components/Button'

export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Galera da rocket'])
  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={(item) => {
          return <GroupCard title={item.item} />
        }}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpity message="Que tal cadastrar a primeira turma?" />
        )}
      />
      
      <Button title="Criar nova turma" />
    </Container>
  )
}
