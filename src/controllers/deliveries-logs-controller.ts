import { Request, Response } from 'express'
import z from 'zod'

export class DeliveriesLogsController{
    async create(req: Request, res: Response){
        const bodySchema = z.object({
            description: z.string(),
            deliverieId: z.string().uuid(),
        })

        return res.status(201).json({ message: 'ok' })
    }
}