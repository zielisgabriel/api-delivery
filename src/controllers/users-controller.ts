import { Request, Response } from 'express'
import z from 'zod'
import { hash } from 'bcrypt'
import { prisma } from '../database/prisma'
import { AppError } from '../utils/AppError'

export class UserController{
    async index(req: Request, res: Response){
        const user = await prisma.user.findMany()

        res.json(user)
    }

    async create(req: Request, res: Response){
        const bodySchema = z.object({
            name: z.string().trim().min(4, 'O nome tem que ter pelo menos 4 caracteres'),
            email: z.string().trim().min(10, 'O email tem que ter pelo menos 10 caracteres'),
            password: z.string().trim().min(8, 'A senha tem que ter pelo menos 8 caracteres')
        })

        const { name, email, password } = bodySchema.parse(req.body)

        const hashingPassword = await hash(password, 8)

        const userWithSameEmail = await prisma.user.findFirst({
            where: { email }
        })

        const userWithSamePassword = await prisma.user.findFirst({
            where: { password }
        })

        if(userWithSameEmail || userWithSamePassword){
            throw new AppError("Já existe um usuário com este email ou senha", 401)
        }


        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashingPassword,
            }
        })

        return res.status(201).json(user)
    }
}