import { Router } from 'express'
import repositories from '@/app/Repository/controllers/RepositoryController'
import authMiddleware from '@app/Auth/middlewares/AuthMiddleware'
import ownerMiddleware from '@app/Auth/middlewares/OwnerMiddleware'

const routes = Router()

routes.get('/repositories/:id', authMiddleware, ownerMiddleware, repositories.show)
routes.post('/repositories', ownerMiddleware, repositories.create)
routes.patch('/repositories', authMiddleware, ownerMiddleware, repositories.update)

export default routes
