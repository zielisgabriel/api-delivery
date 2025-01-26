import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import z from "zod";

export class DeliveriesController{
    async index(req: Request, res: Response){
        const deliveries = await prisma.deliveries.findMany({
            include: {
                user: { select: { name: true, email: true } }
            }
        })
        
        res.json(deliveries)
    }

    async create(req: Request, res: Response){
        const bodySchema = z.object({
            user_id: z.string(),
            description: z.string(),
        })

        const { user_id, description } = bodySchema.parse(req.body)

        await prisma.deliveries.create({ data: {
            userId: user_id,
            description,
        } })

        res.status(201).json()
    }

    async update(req: Request, res: Response){
        const idSchema = z.object({
            id: z.string().uuid()
        })

        const bodySchema = z.object({
            status: z.enum(['processing', 'shipped', 'delivered'])
        })

        const { id } = idSchema.parse(req.params)
        const { status } = bodySchema.parse(req.body)

        await prisma.deliveries.update({
            data: { status },
            where: { id },
        })

        await prisma.deliveriesLogs.create({
            data: {
                deliverieId: id,
                description: status,
            }
        })

        res.json()
    }
}