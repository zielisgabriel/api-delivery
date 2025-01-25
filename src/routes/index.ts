import { Router } from 'express'
import { userRoutes } from './users.routes'
import { sessionsRoutes } from './sessions.routes'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'

const routes = Router()

routes.use('/users', ensureAuthenticated, userRoutes)
routes.use('/sessions', ensureAuthenticated, sessionsRoutes)

export { routes }