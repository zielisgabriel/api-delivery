import { Router } from 'express'
import { UserController } from '../controllers/users-controller'

const userRoutes = Router()
const userController = new UserController()

userRoutes.get('/', userController.index)
userRoutes.get('/:id', userController.show)
userRoutes.post('/', userController.create)

export { userRoutes }