import { Router } from 'express'
import authRoutes from './app/Auth/routes'
import usersRoutes from './app/User/routes'
import repositoriesRoutes from './app/Repository/routes'

const routes = Router()

routes.use(authRoutes)
routes.use(usersRoutes)
routes.use(repositoriesRoutes)

export default routes
