import { Request, Response } from 'express'
import AuthService from '../services/AuthService'
import AuthError from '../exceptions/AuthError'

class AuthController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    try {
      const { user, token } = await new AuthService().signIn(email, password)
      return res.status(200).json({ user, token })
    } catch (error) {
      if (error instanceof AuthError) return res.status(404).send()
      return res.status(500).send()
    }
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    const authorization = req.headers.authorization

    if (!authorization) return res.status(401).send()

    const token = authorization.replace('Bearer ', '')

    await new AuthService().signOut(token)
    return res.status(200).send()
  }
}

export default new AuthController()
