import { Request, Response } from 'express'
import z from 'zod'
import { hash } from 'bcrypt'
import { prisma } from '../database/prisma'
import { AppError } from '../utils/AppError'

export class UserController{
    async index(req: Request, res: Response){
        const users = await prisma.user.findMany() ?? []

        res.json(users)
    }

    async show (req: Request, res: Response){
        const { id } = req.params

        const user = await prisma.user.findFirst({ where: { id } })

        if(!user){
            throw new AppError('Página não encontrada', 404)
        }

        const { password: _, ...userWithoutPassword } = user


        res.json(userWithoutPassword)
    }

    async create(req: Request, res: Response){
        const bodySchema = z.object({
            name: z.string().trim().min(4, 'O nome tem que ter pelo menos 4 caracteres'),
            email: z.string().trim().min(10, 'O email tem que ter pelo menos 10 caracteres'),
            password: z.string().trim().min(8, 'A senha tem que ter pelo menos 8 caracteres')
        })

        const { name, email, password } = bodySchema.parse(req.body)

        const userWithSameEmail = await prisma.user.findFirst({ where: { email } })
        
        if(userWithSameEmail){
            throw new AppError("Já existe este usuário", 401)
        }

        const hashingPassword = await hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashingPassword,
            }
        })

        const { password: _, ...userWithoutPassword } = user

        res.status(201).json(userWithoutPassword)
    }
}