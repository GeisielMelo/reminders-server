import User from "../models/User";
import Repository from "../models/Repository";

class RepositoriesController {
  async index(req, res) {}

  async show(req, res) {}

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
    } catch (error) {}
  }

  async delete(req, res) {}
}

export default new RepositoriesController();
