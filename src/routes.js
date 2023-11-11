import { Router } from "express";
import auth from "./middlewares/auth";

import UsersController from "./controllers/UsersController";
import SessionsController from "./controllers/SessionsController";
import RepositoriesController from "./controllers/RepositoriesController";

const routes = new Router();
routes.post("/sessions", SessionsController.create);
routes.get("/sessions/:email", SessionsController.show);
routes.post("/users", UsersController.create);

routes.use(auth);

// Login
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.delete);

// Repositories
routes.post("/repositories", RepositoriesController.create);
routes.get("/repositories", RepositoriesController.show);
routes.patch("/repositories", RepositoriesController.update);


export default routes;

