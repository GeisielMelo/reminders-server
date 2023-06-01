import User from "../models/User";
import { createPasswordHash } from "../services/password";

class UsersController {
  // Method to list all users.
  async index(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Method to list a single user.
  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      } else {
        return res.json(user);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Method to create a new user.
  async create(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (user) {
        return res.status(422).json({ error: `User ${email} already exists` });
      }

      // Encrypt password
      const encryptedPassword = await createPasswordHash(password);

      // Create a new user with encrypted password.
      const newUser = await User.create({ email, password: encryptedPassword });

      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // update a user.
  async update(req, res) {
    try {
      const { id } = req.params;
      const { email, password } = req.body;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Encrypt password
      const encryptedPassword = await createPasswordHash(password);

      await user.update({ email, password: encryptedPassword });
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // delete a user.
  async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await user.deleteOne();
      return res.status(200).json();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new UsersController();
