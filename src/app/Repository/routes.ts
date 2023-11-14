import { Router } from 'express'
import repositories from '@/app/Repository/controllers/RepositoryController'
import ownerMiddleware from '@app/Auth/middlewares/OwnerMiddleware'

const routes = Router()

routes.get('/repositories', ownerMiddleware, repositories.show)
routes.post('/repositories', ownerMiddleware, repositories.create)
routes.patch('/repositories', ownerMiddleware, repositories.update)

export default routes
