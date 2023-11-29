import { Request, Response } from 'express'
import PingError from '../exceptions/PingError'
import database from '../../../database'
import Ping from '../../../database/models/Ping'

class PingController {
  async index(req: Request, res: Response) {
    try {
      await database.connect()
      const pings = await Ping.find()
      if (!pings) throw new PingError('Error on list the pings.')
      return res.status(200).json(pings)
    } catch (error) {
      if (error instanceof PingError) return res.status(404).send()
      return res.status(500).send()
    } finally {
      await database.disconnect()
    }
  }
}

export default new PingController()
