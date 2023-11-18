import { Router } from 'express'
import users from '@app/User/controllers/UsersController'
import authMiddleware from '@app/Auth/middlewares/AuthMiddleware'
import ownerMiddleware from '@app/Auth/middlewares/OwnerMiddleware'

const routes = Router()

routes.get('/users/:id', authMiddleware, ownerMiddleware, users.show)
routes.post('/users', users.create)

export default routes
