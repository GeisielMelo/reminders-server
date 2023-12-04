import { Schema, Document, model } from 'mongoose'

interface IPing {
  pingAt: string
  expireAt: Date
}

interface IPingDocument extends IPing, Document {}

const PingSchema = new Schema<IPingDocument>(
  {
    pingAt: { type: String, required: true },
    expireAt: { type: Date, default: () => new Date(Date.now() + 43200 * 1000) },
  },
  { timestamps: true },
)

PingSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })

const Ping = model<IPingDocument>('Ping', PingSchema)

export default Ping
