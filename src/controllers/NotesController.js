import User from "../models/User";
import Note from "../models/Note";

class NotesController {
  // List all notes.
  async index(req, res) {
    try {
      const { user_id } = req.params;

      // Verify if user exists.
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // List all notes.
      const notes = await Note.find({ userId: user_id });
      return res.status(200).json(notes);

      // Return error if something goes wrong.
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Show a note.
  async show(req, res) {
    try {
      const { user_id, note_id } = req.params;

      // Verify if user exists.
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Verify if note exists.
      const note = await Note.findById(note_id);
      return res.status(200).json(note);

      // Return error if something goes wrong.
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async create(req, res) {
    try {
      const { user_id } = req.params;
      const { title, content, status } = req.body;

      // Verify if user exists.
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create new note.
      const newNote = await Note.create({
        userId: user_id,
        title,
        content,
        status
      });
      return res.status(201).json(newNote);

      // Return error if something goes wrong.
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req, res) {
    try {
      const { user_id, note_id } = req.params;

      // Verify if user exists.
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Verify if note exists.
      const note = await Note.findById(note_id);
      if (!note) {
        return res.status(404).json({ error: "Note not found." });
      }

      // Delete note.
      await Note.deleteOne({ _id: note_id });
      return res.status(200).json();

      // Return error if something goes wrong.
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new NotesController();
