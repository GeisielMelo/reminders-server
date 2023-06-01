import { Router } from "express";
import auth from "./middlewares/auth";

import UsersController from "./controllers/UsersController";
import NotesController from "./controllers/NotesController";
import SessionsController from "./controllers/SessionsController";


const routes = new Router();

routes.post("/sessions", SessionsController.create);
routes.post("/users", UsersController.create);

routes.use(auth);

// Temp routes
routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.show);

// Login
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.delete);

// Notes
routes.get("/notes/:user_id", NotesController.index);
routes.get("/notes/:user_id/:note_id", NotesController.show);
routes.post("/notes/:user_id", NotesController.create);
routes.delete("/notes/:user_id/:note_id", NotesController.delete);
export default routes;

