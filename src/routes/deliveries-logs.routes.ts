import { Router } from "express";
import { DeliveriesLogsController } from "../controllers/deliveries-logs-controller";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "../middlewares/verify-user-authorization";

const deliveriesLogsRoutes = Router()
const deliveriesLogsController = new DeliveriesLogsController()

deliveriesLogsRoutes.get('/', ensureAuthenticated, verifyUserAuthorization(['saller', 'admin', 'customer']), deliveriesLogsController.index)

deliveriesLogsRoutes.get('/:deliverie_id/show', ensureAuthenticated, verifyUserAuthorization(['saller', 'admin', 'customer']), deliveriesLogsController.show)

deliveriesLogsRoutes.post('/', ensureAuthenticated, verifyUserAuthorization(['saller', 'admin']), deliveriesLogsController.create)

export { deliveriesLogsRoutes }