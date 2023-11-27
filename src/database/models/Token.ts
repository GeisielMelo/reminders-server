import { Schema, Document, model } from 'mongoose'

interface IToken {
  token: string
}

interface ITokenDocument extends IToken, Document {}

const tokenSchema = new Schema<ITokenDocument>(
  {
    token: { type: String, required: true },
  },
  { timestamps: true, expireAfterSeconds: 7 * 24 * 60 * 60 },
)

const Token = model<ITokenDocument>('Token', tokenSchema)
export default Token
