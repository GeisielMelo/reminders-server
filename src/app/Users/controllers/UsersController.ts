import { Request, Response } from 'express'
import User from '@/Database/Models/User'

class UsersController {
  async index(req: Request, res: Response): Promise<Response> {
    const users = [{ id: '456', email: 'mod@mod.com' }]

    return res.status(200).json(users)
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    console.log(email, password)

    try {
      const user = await User.findOne({ email })

      if (user) {
        return res.status(422).json({ error: `User ${email} already exists` })
      }

      const newUser = await User.create({ email, password })

      return res.status(201).json(newUser)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'User creation fail.' })
    }
  }

  async message(req: Request, res: Response): Promise<Response> {
    const { message } = req.body
    return res.status(200).json({ message })
  }
}

export default new UsersController()
