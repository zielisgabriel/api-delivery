import { Request, Response } from 'express'
import z from 'zod'

export class UserController{
    async index(req: Request, res: Response){
        
    }

    async create(req: Request, res: Response){
        const bodySchema = z.object({
            name: z.string().trim().min(6, 'O nome tem que ter pelo menos 6 caracteres'),
            email: z.string().trim().min(10, 'O email tem que ter pelo menos 10 caracteres'),
            password: z.string().trim().min(8, 'A senha tem que ter pelo menos 8 caracteres')
        })

        const { name, email, password } = bodySchema.parse(req.body)

        res.json({ name, email, password })

        return res.status(201).json({ message: 'create' })
    }
}