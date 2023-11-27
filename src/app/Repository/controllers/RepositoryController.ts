import { Request, Response } from 'express'
import database from '../../../database'
import Repository from '../../../database/models/Repository'

class RepositoryController {
  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      await database.connect()
      const repositories = await Repository.findOne({ userId: id })

      if (!repositories) {
        return res.status(404).json({ error: 'Repository does not exist.' })
      }

      return res.status(200).json(repositories)
    } catch (error) {
      return res.status(500).json({ error: 'Fail on fetch user repositories.' })
    } finally {
      await database.disconnect()
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.body

    try {
      await database.connect()
      const repository = await Repository.findOne({ userId: id })

      if (repository) {
        return res.status(422).send()
      }

      const newRepository = await Repository.create({
        userId: id,
        notes: [],
        labels: [],
      })

      return res.status(201).json(newRepository)
    } catch (error) {
      return res.status(500).json({ error: 'Repository creation fail.' })
    } finally {
      await database.disconnect()
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id, notes, labels } = req.body

    try {
      await database.connect()
      const repository = await Repository.findOne({ userId: id })

      if (!repository) {
        return res.status(404).json({ error: 'Repository does not exist.' })
      }

      await Repository.updateOne(
        { userId: id },
        {
          notes,
          labels,
        },
        { new: true },
      )
      return res.status(200).send()
    } catch (error) {
      return res.status(500).json({ error: 'Repository update fail.' })
    } finally {
      await database.disconnect()
    }
  }
}
export default new RepositoryController()
