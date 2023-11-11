import mongoose from "mongoose";

const repositorySchema = mongoose.Schema(
  {
    user_Id: { type: String, required: true },
    notes: { type: Array, required: true },
    labels: { type: Array, required: true },
    archived: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Repository", repositorySchema);
