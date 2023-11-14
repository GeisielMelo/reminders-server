import { Request, Response } from 'express'
import Repository from '@/database/models/Repository'

class RepositoryController {
  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.body

    try {
      const repositories = await Repository.findOne({ userId: id })

      if (!repositories) {
        return res.status(404).json({ error: 'Repository does not exist.' })
      }

      return res.status(200).json(repositories)
    } catch (error) {
      return res.status(500).json({ error: 'Fail on fetch user repositories.' })
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.body

    try {
      const repository = await Repository.findOne({ userId: id })

      if (repository) {
        return res.status(422).send()
      }

      await Repository.create({
        userId: id,
        notes: [],
        labels: [],
        archived: [],
      })

      return res.status(201).send()
    } catch (error) {
      return res.status(500).json({ error: 'Repository creation fail.' })
    }
  }
}
export default new RepositoryController()
