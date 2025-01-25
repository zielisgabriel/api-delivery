import { Request, Response } from 'express'
import z from 'zod'

export class UserController{
    async index(req: Request, res: Response){
        const bodySchema = z.object({
            name: z.string().trim().min(6),
            email: z.string().trim().min(10),
            password: z.string().trim().min(8)
        })

        const { name, email, password } = bodySchema.parse(req.body)

        res.json({ message: 'ok' })
    }

    async create(req: Request, res: Response){
        res.status(201).json({ message: 'create' })
    }
}