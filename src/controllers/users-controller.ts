import { Request, Response } from 'express'

export class UserController{
    index(req: Request, res: Response){
        res.json({ message: 'ok' })
    }
}