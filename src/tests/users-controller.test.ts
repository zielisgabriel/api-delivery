import request from "supertest"
import { app } from "../app"
import { prisma } from "../database/prisma"

describe('UsersController', () => {
    let userId: string

    afterAll(async () => {
        await prisma.user.delete({
            where: { id: userId }
        })
    })

    it('should create a new user', async () => {
        const response = await request(app).post('/users').send({
            name: 'Test User',
            email: 'test@email.com',
            password: 'teste123',
        })

        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('id')
        expect(response.body.name).toBe('Test User')

        userId = response.body.id
    })

    it('should throw error if user with same email already exists', async () => {
        const response = await request(app).post('/users').send({
            name: 'Duplicate User',
            email: 'test@email.com',
            password: 'teste123',
        })

        expect(response.statusCode).toBe(401)
        expect(response.body.message).toBe('Já existe este usuário')
    })
})