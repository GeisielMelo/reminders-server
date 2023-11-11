import User from "../models/User";
import Repository from "../models/Repository";

class RepositoriesController {
  // Method to list a repository.
  async show(req, res) {
    try {
      const { id } = req.body;
      const repository = await Repository.findById(id);

      if (!repository) {
        return res.status(404).json({ error: "Repository not found" });
      } else {
        return res.json(repository);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Method to create a new repository.
  async create(req, res) {
    try {
      const { user_Id } = req.body;

      const user = await User.findById(user_Id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await Repository.create({
        user_Id: user_Id,
        notes: [],
        labels: [],
        archived: [],
      });

      return res.status(201);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // update a user.
  async update(req, res) {
    try {
      const { id } = req.body;

      await Repository.findByIdAndUpdate(
        id,
        {
          notes: [],
          labels: [],
          archived: [],
        },
        { new: true }
      );

      return res.status(201).json({ success: `Repository Updated.` });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req, res) {}
}

export default new RepositoriesController();
