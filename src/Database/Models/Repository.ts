import mongoose, { Schema, Document, model } from 'mongoose'

interface INote {
  title: string
  description: string
  labels: object[]
  archived: boolean
}

interface IRepository {
  userId: string
  notes: INote[]
  labels: string[]
}

interface IRepositoryDocument extends IRepository, Document {}

const noteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    labels: { type: [Object], default: [] },
    archived: { type: Boolean, default: false },
  },
  {
    _id: false,
  },
)

const repositorySchema = new Schema<IRepositoryDocument>(
  {
    userId: { type: String, required: true },
    notes: { type: [noteSchema], default: [] },
    labels: { type: [String], default: [] },
  },
  {
    timestamps: true,
  },
)

const Repository = model<IRepositoryDocument>('Repository', repositorySchema)

export default Repository
