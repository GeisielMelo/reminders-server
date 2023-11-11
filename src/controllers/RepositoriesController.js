import User from "../models/User";
import Repository from "../models/Repository";

class RepositoriesController {
  // Method to list a repository.
  async show(req, res) {
    try {
      const { id } = req.body;
      const repository = await Repository.findOne({ user_Id: id });

      if (!repository) {
        return res.status(404).json({ success: false, message: "Repository not found" });
      }

      return res.status(201).json({ success: true, repository: repository });
    } catch (error) {
      return res.status(500).json({ success: false });
    }
  }

  // Method to create a new repository.
  async create(req, res) {
    try {
      const { id } = req.body;
      const repository = await Repository.findOne({ user_Id: id });

      if (repository) {
        return res.status(500).json({ success: false, message: "Repository already exists." });
      }

      await Repository.create({
        user_Id: id,
        notes: [],
        labels: [],
        archived: [],
      });

      return res.status(201).json({ success: true, message: "Repository successfully created." });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Internal server error." });
    }
  }

  // update a user.
  async update(req, res) {
    try {
      const { id, notes, labels, archived } = req.body;

      await Repository.findByIdAndUpdate(
        id,
        {
          notes,
          labels,
          archived,
        },
        { new: true }
      );

      return res.status(201).json({ success: true, message: "Repository successfully updated." });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Internal server error." });
    }
  }
}

export default new RepositoriesController();
