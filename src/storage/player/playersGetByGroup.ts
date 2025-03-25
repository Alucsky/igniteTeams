import { PLAYER_COLLECTION } from '@storage/storageConfig'
import { PlayerStorageDTO } from './playerStorageDTO'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function playersGetByGroup(group: string) {
  try {

    const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`)

    const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : []
    
    return players

  } catch (error) {
    console.error(error)
  }
}
