import jwt from "jsonwebtoken";
import User from "../models/User";
import { checkPassword } from "../services/password";
import authConfig from "../config/auth";

class SessionsController {
  async show(req, res) {
    try {
      const { id } = req.body;

      // Buscar informações do usuário usando o ID obtido do token
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Retorna as informações do usuário, incluindo o token
      return res.json({
        token: req.headers.authorization,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async create(req, res) {
    const { email, password } = req.body;

    // Verify if email exists.
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User / password invalid" });
    }

    // Verify if password is correct.
    const passwordMatched = await checkPassword(user, password);
    if (!passwordMatched) {
      return res.status(401).json({ error: "User / password invalid" });
    }

    const { id } = user;

    return res.json({
      user: {
        id,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionsController();
