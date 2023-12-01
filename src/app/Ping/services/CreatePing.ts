import database from '../../../database'
import Ping from '../../../database/models/Ping'
import PingError from '../exceptions/PingError'

export default async () => {
  try {
    await database.connect()
    const ping = await Ping.create({ pingAt: Math.floor(Date.now() / 1000) })
    if (!ping) throw new PingError('Error on CreatePing service.')
  } catch (error) {
    console.error('CreatePing service: Error on ping.')
    if (error instanceof PingError) return
  } finally {
    try {
      await database.disconnect()
    } catch (error) {
      console.error('CreatePing service: Error on disconnect.')
    }
  }
}
