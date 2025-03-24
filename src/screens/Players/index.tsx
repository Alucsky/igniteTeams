import { Header } from '@components/Header'
import { Container, Form, HeaderList, NumberOfPlayers } from './styles'
import { Highlight } from '@components/Highlight'
import Input from '@components/Input'
import { ButtonIcon } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'
import { FlatList } from 'react-native'
import { useState } from 'react'
import { PlayerCard } from '@components/playerCard'
import { ListEmpity } from '@components/ListEmpity'
import Button from '@components/Button'

export function Players() {
  const [players, setPlayers] = useState<string[]>(['asdasdasd', 'asdadasd'])
  const [team, setTeam] = useState('time a')
  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title="Nome da turma"
        subtitle="adicione a galera e separe os times"
      />
      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
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
