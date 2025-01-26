import request from 'supertest'
import { app } from '../app'
import { prisma } from '../database/prisma'

describe('Sessions', () => {
    let userId: string

    afterAll( async () => {
        await prisma.user.delete({
            where: { id: userId }
        })
    })

    it('should throw validation error if email is invalid', async () => {
        const userResponse = await request(app).post('/users').send({
            name: 'Auth Test User',
            email: 'authtestuser@email.com',
            password: 'teste123',
        })

        userId = userResponse.body.id

        const sessionResponse = await request(app).post('/sessions').send({
            name: 'Auth Test User',
            email: 'authtestusererror@email.com',
            password: 'teste123',
        })

        expect(sessionResponse.statusCode).toBe(401)
        expect(sessionResponse.body.message).toBe('Email e/ou senha incorretos')
    })
})