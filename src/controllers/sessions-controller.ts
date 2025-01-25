import { Request, Response } from 'express'
import { prisma } from '../database/prisma'
import { AppError } from '../utils/AppError'
import { compare } from 'bcrypt'

export class SessionsController{
    async create(req: Request, res: Response){
        const { email, password } = req.body

        const userVerify = await prisma.user.findFirst({ where: { email } })

        if(!userVerify){
            throw new AppError('Email e/ou senha incorretos')
        }

        const userVerifyPassword = await compare(password, userVerify.password)

        if(!userVerifyPassword){
            throw new AppError('Email e/ou senha incorretos')
        }

        return res.status(201).json({ message: 'acessado' })
    }
}