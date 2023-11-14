import { Router } from 'express'
import repositories from '@app/Repository/controllers/RepositoriesController'
import ownerMiddleware from '@app/Auth/middlewares/OwnerMiddleware'

const routes = Router()

routes.get('/repositories', ownerMiddleware, repositories.show)
routes.post('/repositories', ownerMiddleware, repositories.create)

export default routes
