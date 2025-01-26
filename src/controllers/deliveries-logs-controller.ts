import { Request, Response } from 'express'
import z from 'zod'
import { prisma } from '../database/prisma'
import { AppError } from '../utils/AppError'

export class DeliveriesLogsController{
    async index(req: Request, res: Response){
        const deliveries = await prisma.deliveriesLogs.findMany() ?? []

        res.json(deliveries)
    }

    async create(req: Request, res: Response){
        const bodySchema = z.object({
            description: z.string(),
            deliverie_id: z.string().uuid()
        })

        const { description, deliverie_id } = bodySchema.parse(req.body)

        const deliverie = await prisma.deliveries.findFirst({ where: { id: deliverie_id } })

        if(!deliverie){
            throw new AppError('Deliverie não encontrado', 404)
        }

        if(deliverie.status === 'processing'){
            throw new AppError('Alterar o status para enviado', 400)
        }

        await prisma.deliveriesLogs.create({ data: { description, deliverieId: deliverie_id } })

        return res.status(201).json(deliverie)
    }
}