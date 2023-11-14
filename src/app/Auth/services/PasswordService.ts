import bcrypt from 'bcryptjs'
import AuthError from '../exceptions/AuthError'

// Function to compare the hashed password with the one input by the user.
export default async (inputPassword: string, hashedPassword: string) => {
  try {
    const passwordMatch = await bcrypt.compare(inputPassword, hashedPassword)

    if (!passwordMatch) {
      throw new AuthError('Invalid Password.')
    }

    return true
  } catch (error) {
    console.error(error)
    throw new AuthError('Error comparing passwords.')
  }
}
