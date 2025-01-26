import { Router } from "express";
import { DeliveriesController } from "../controllers/deliveries-controller";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "../middlewares/verify-user-authorization";

const deliveresRoutes = Router()
const deliveriesController = new DeliveriesController()

deliveresRoutes.get('/', ensureAuthenticated, verifyUserAuthorization(['seller', 'admin']), deliveriesController.index)
deliveresRoutes.post('/', ensureAuthenticated, verifyUserAuthorization(['seller', 'admin']), deliveriesController.create)
deliveresRoutes.patch('/:id/status', ensureAuthenticated, verifyUserAuthorization(['seller', 'admin']), deliveriesController.update)

export { deliveresRoutes }