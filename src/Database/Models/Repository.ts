import { Schema, Document, model } from 'mongoose'

interface IRepository {
  user_Id: string;
  notes: any[];
  labels: any[];
  archived: any[];
}

interface IRepositoryDocument extends IRepository, Document {}

const repositorySchema = new Schema<IRepositoryDocument>(
  {
    user_Id: { type: String, required: true },
    notes: { type: [Schema.Types.Mixed], required: true },
    labels: { type: [Schema.Types.Mixed], required: true },
    archived: { type: [Schema.Types.Mixed], required: true },
  },
  {
    timestamps: true,
  }
);

const Repository = model<IRepositoryDocument>('Repository', repositorySchema);

export default Repository;
