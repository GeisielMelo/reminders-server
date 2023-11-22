import { Request, Response } from 'express'
import User from '../../../database/models/User'
import encryptPassword from '../../User/services/PasswordService'

class UsersController {
  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const user = await User.findById(id)
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json({ error: 'Fail on fetch user.' })
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    try {
      const user = await User.findOne({ email })

      if (user) {
        return res.status(422).json({ error: `User ${email} already exists` })
      }

      const hash = await encryptPassword(password)

      const newUser = await User.create({ email, password: hash })

      return res.status(201).json(newUser)
    } catch (error) {
      return res.status(500).json({ error: 'User creation fail.' })
    }
  }
}

export default new UsersController()
