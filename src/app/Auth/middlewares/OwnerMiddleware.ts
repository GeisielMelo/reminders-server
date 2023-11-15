import { NextFunction, Request, Response } from 'express'
import AuthService from '../services/AuthService'
import AuthError from '../exceptions/AuthError'

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  let id

  if (req.body && req.body.id) {
    id = req.body.id
  } else if (req.params && req.params.id) {
    id = req.params.id
  }

  if (!authorization) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = authorization.replace('Bearer ', '')

  try {
    await new AuthService().validateTokenOwner(id, token)
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401).send()
    }
    return res.status(500).json({ error })
  }
  return next()
}
