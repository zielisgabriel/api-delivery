import { Request, Response } from 'express'
import { prisma } from '../database/prisma'
import { AppError } from '../utils/AppError'
import { compare } from 'bcrypt'
import { authConfig } from '../config/auth-config'
import { sign } from 'jsonwebtoken'

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

        const { secret, expiresIn } = authConfig.jwt

        // @ts-ignore
        const token = sign({ role: String(userVerify.role) ?? "customer" }, secret, {
            expiresIn,
            subject: String(userVerify.id),
          })

        return res.status(201).json({ message: token })
    }
}