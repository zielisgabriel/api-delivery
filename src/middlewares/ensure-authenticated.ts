import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { verify } from "jsonwebtoken";
import { authConfig } from "../config/auth-config";

type TokenPayload = {
    sub: string,
    role: string,
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
    const authHeader = req?.headers.authorization

    if(!authHeader){
        throw new AppError('Token inválido')
    }

    const [, token] = authHeader.split(' ')
    
    const { sub: user_id, role } = verify(token, authConfig.jwt.secret) as TokenPayload

    req.user = {
        user_id,
        role,
    }

    return next()
}