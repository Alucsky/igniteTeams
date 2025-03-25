import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppError } from '@utils/AppError'
import { PLAYER_COLLECTION } from '@storage/storageConfig'

import { PlayerStorageDTO } from './playerStorageDTO'
import { playersGetByGroup } from './playersGetByGroup'

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storedPlayers = await playersGetByGroup(group)

    const players = storedPlayers ?? []

    const playerAlreadyExists = players.some(
      (player) => player.name === newPlayer.name
    )

    if (playerAlreadyExists) {
      throw new AppError('Player already exists in this group')
    }

    const storage = JSON.stringify([...players, newPlayer])

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  } catch (error) {
    console.error(error)
    throw error
  }
}
