import jwt from 'jsonwebtoken'
import AuthError from '../exceptions/AuthError'
import config from '../../../config'
import { getValue, setValue } from '../../../lib/redis'
import User from '@/database/models/User'
import decryptPassword from '@app/Auth/services/PasswordService'

export default class AuthService {
  async signIn(
    email: string,
    password: string,
  ): Promise<{ user: object; token: string }> {
    const user = await User.findOne({ email })

    if (!user) {
      throw new AuthError('User not found')
    }

    const passwordDecrypted = await decryptPassword(password, user.password)

    if (!passwordDecrypted) {
      throw new AuthError('Invalid credentials')
    }

    const { id } = user

    // Generate token
    const token = jwt.sign({ id }, config.auth.secret, {
      expiresIn: config.auth.expiresIn,
    })

    return { user: { id, email }, token }
  }

  async signOut(token: string) {
    console.log(token)
    await this.blacklistToken(token)
  }

  async validateTokenOwner(id: string, token: string): Promise<void> {
    try {
      const userDecoded = jwt.verify(token, config.auth.secret) as {
        id: string
      }

      if (userDecoded.id !== id) {
        throw new AuthError('Invalid token owner.')
      }
    } catch (error) {
      console.error(error)
      throw new AuthError('Invalid token.')
    }
  }

  async validateToken(token: string): Promise<string> {
    try {
      if (await this.isTokenBlacklisted(token))
        throw new AuthError('Token was blacklisted.')

      const userDecoded = jwt.verify(token, config.auth.secret) as {
        id: string
      }

      return userDecoded.id
    } catch (error) {
      console.error(error)
      throw new AuthError('Invalid token.')
    }
  }

  private async isTokenBlacklisted(token: string): Promise<boolean> {
    const blacklistedToken = await getValue(`tokens:invalidated:${token}`)

    return !!blacklistedToken
  }

  private async blacklistToken(token: string): Promise<void> {
    await setValue(`tokens:invalidated:${token}`, true)
  }
}
