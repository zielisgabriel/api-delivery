import { Request, Response } from 'express'

export class UserController{
    async index(req: Request, res: Response){
        res.json({ message: 'ok' })
    }

    async create(req: Request, res: Response){
        res.status(201).json({ message: 'create' })
    }
}