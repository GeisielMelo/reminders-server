import { Router } from 'express'
import repositories from '../Repository/controllers/RepositoryController'
import authMiddleware from '../Auth/middlewares/AuthMiddleware'
import ownerMiddleware from '../Auth/middlewares/OwnerMiddleware'

const routes = Router()

routes.get('/repositories/:id', authMiddleware, ownerMiddleware, repositories.show)
routes.post('/repositories', authMiddleware, ownerMiddleware, repositories.create)
routes.patch('/repositories', authMiddleware, ownerMiddleware, repositories.update)

export default routes
