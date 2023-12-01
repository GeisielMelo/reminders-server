import { Schema, Document, model } from 'mongoose'

interface IPing {
  pingAt: string
}

interface IPingDocument extends IPing, Document {}

const PingSchema = new Schema<IPingDocument>(
  {
    pingAt: { type: String, required: true },
  },
  { timestamps: true, expires: 6 * 60 * 60 },
)

const Ping = model<IPingDocument>('Ping', PingSchema)
export default Ping
