import { Router } from 'express'
import authRoutes from './app/Auth/routes'
import usersRoutes from './app/User/routes'
import repositoriesRoutes from './app/Repository/routes'
import pingRoutes from './app/Ping/routes'

const routes = Router()

routes.use(authRoutes)
routes.use(usersRoutes)
routes.use(repositoriesRoutes)
routes.use(pingRoutes)

export default routes
