import { Schema, Document, model } from 'mongoose'

interface INote {
  note: string
  labels: string[]
}

interface IRepository {
  userId: string
  notes: INote[]
  labels: string[]
  archived: INote[]
}

interface IRepositoryDocument extends IRepository, Document {}

const noteSchema = new Schema<INote>(
  {
    note: { type: String, required: true },
    labels: { type: [String], default: [] },
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
    archived: { type: [noteSchema], default: [] },
  },
  {
    timestamps: true,
  },
)

const Repository = model<IRepositoryDocument>('Repository', repositorySchema)

export default Repository
