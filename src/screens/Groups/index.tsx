import { useState, useEffect } from 'react'
import { Container } from './styles'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import GroupCard from '@components/GroupCard'
import { FlatList } from 'react-native'
import { ListEmpity } from '@components/ListEmpity'
import Button from '@components/Button'
import { useNavigation } from '@react-navigation/native'
import { groupsGetAll } from '@storage/group/groupGetAll'

export function Groups() {
  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('new')
  }
  async function fetchGroups() {
    try {
      const data = await groupsGetAll()
      setGroups(data)
    } catch (error) {
      console.error(error)
    }
  }
  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  const [groups, setGroups] = useState<string[]>(['Galera da rocket'])

  useEffect(() => {
    fetchGroups()
  }, [groups])

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={(item) => {
          return (
            <GroupCard
              title={item.item}
              onPress={() => handleOpenGroup(item.item)}
            />
          )
        }}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpity message="Que tal cadastrar a primeira turma?" />
        )}
      />

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  )
}
