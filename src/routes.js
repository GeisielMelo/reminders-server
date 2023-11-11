import { Router } from "express";
import auth from "./middlewares/auth";

import UsersController from "./controllers/UsersController";
import SessionsController from "./controllers/SessionsController";

const routes = new Router();
routes.post("/sessions", SessionsController.create);
routes.get("/sessions/:email", SessionsController.show);
routes.post("/users", UsersController.create);

routes.use(auth);

// Login
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.delete);

// Repositories


// Notes



export default routes;

