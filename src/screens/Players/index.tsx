import { Header } from '@components/Header'
import { Container, Form, HeaderList, NumberOfPlayers } from './styles'
import { Highlight } from '@components/Highlight'
import Input from '@components/Input'
import { ButtonIcon } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'
import { Alert, FlatList } from 'react-native'
import { useState } from 'react'
import { PlayerCard } from '@components/playerCard'
import { ListEmpity } from '@components/ListEmpity'
import Button from '@components/Button'
import { useRoute } from '@react-navigation/native'
import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { AppError } from '@utils/AppError'

type RouteParams = {
  group: string
}
export function Players() {
  const route = useRoute()
  const { group } = route.params as RouteParams
  const [players, setPlayers] = useState<string[]>([])
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('time a')

  async function handleAddNewPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        'Nova pessoa',
        'Informe o nome da pessoa para adicionar'
      )
    }
    const newPlayer = {
      name: newPlayerName,
      team,
    }
    try {
      await playerAddByGroup(newPlayer, group)
    } catch (err) {
      if (err instanceof AppError) {
        Alert.alert('Nova pessoa', err.message)
      } else {
        Alert.alert('Nova pessoa', 'Ocorreu um erro ao adicionar a pessoa')
      }
    }

    setPlayers([...players, newPlayerName])
    setNewPlayerName('')
  }
  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="adicione a galera e separe os times" />
      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
        />
        <ButtonIcon icon="add" onPress={handleAddNewPlayer} />
      </Form>
      <HeaderList>
        <FlatList
          data={['time a', 'time b']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={team === item}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpity message="Não há pessoas nesse time" />
        )}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />
      <Button title="Remover turma" type="SECONDARY" />
    </Container>
  )
}
