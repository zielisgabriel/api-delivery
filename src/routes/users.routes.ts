import { Router } from 'express'
import { UserController } from '../controllers/users-controller'
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "../middlewares/verify-user-authorization";

const userRoutes = Router()
const userController = new UserController()

userRoutes.get('/', userController.index)

userRoutes.get('/:id', userController.show)

userRoutes.post('/', ensureAuthenticated, verifyUserAuthorization(['admin', 'seller']), userController.create)

export { userRoutes }