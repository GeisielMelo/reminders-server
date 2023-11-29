import { Router } from 'express'
import ping from './controllers/PingController'

const routes = Router()

routes.get('/app/pings', ping.index)

export default routes
