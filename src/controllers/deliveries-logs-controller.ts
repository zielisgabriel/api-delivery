import { Request, Response } from 'express'
import z from 'zod'
import { prisma } from '../database/prisma'
import { AppError } from '../utils/AppError'

export class DeliveriesLogsController{
    async index(req: Request, res: Response){

        if(req.user.role === 'customer'){
            const deliveries = await prisma.deliveries.findMany({
                where: { userId: req.user.user_id }
            })

            return res.json(deliveries)
        }

        const deliveries = await prisma.deliveriesLogs.findMany({
            include: { deliverie: { select: { description: true, status: true } } }
        }) ?? []

        return res.json(deliveries)
    }

    async show(req: Request, res: Response){
        const idSchema = z.object({
            deliverie_id: z.string().uuid()
        })
    
        const { deliverie_id } = idSchema.parse(req.params)

        const deliverie = await prisma.deliveries.findUnique({
            where: { id: deliverie_id },
            include: {
                user: {
                    select: { name: true }
                },
                logs: true,
            }
        })

        if(req.user.role === 'customer' && req.user.user_id !== deliverie?.userId){
            throw new AppError('Essa entrega não pertence ao seu usuário', 401)
        }

        return res.json(deliverie)
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

        if(deliverie.status === 'delivered'){
            throw new AppError('Não é possível criar novas logs com a entrega concluída')
        }

        if(deliverie.status === 'processing'){
            throw new AppError('Alterar o status para enviado', 400)
        }

        await prisma.deliveriesLogs.create({ data: { description, deliverieId: deliverie_id } })

        return res.status(201).json(deliverie)
    }

    async delete(req: Request, res: Response){

    }
}