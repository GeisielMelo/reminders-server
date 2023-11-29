import database from '../../../database'
import Ping from '../../../database/models/Ping'
import PingError from '../exceptions/PingError'

export default async () => {
  try {
    await database.connect()
    const ping = await Ping.create({ pingAt: Math.floor(Date.now() / 1000) })
    if (!ping) throw new PingError('Error on DatabasePing service.')
  } catch (error) {
    if (error instanceof PingError) return
  } finally {
    await database.disconnect()
  }
}
