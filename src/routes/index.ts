import { Router } from 'express'
import { userRoutes } from './users.routes'
import { sessionsRoutes } from './sessions.routes'
import { deliveresRoutes } from './deliveries.routes'
import { deliveriesLogsRoutes } from './deliveries-logs.routes'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/sessions', sessionsRoutes)
routes.use('/deliveries', deliveresRoutes)
routes.use('/deliveries-logs', deliveriesLogsRoutes)

export { routes }