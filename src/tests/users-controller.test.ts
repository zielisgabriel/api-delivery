import request from "supertest"
import { app } from "../app"

describe('UsersController', () => {
    it('should create a new user', async () => {
        const response = await request(app).post('/users').send({
            name: 'Test User',
            email: 'test@email.com',
            password: 'teste123',
        })

        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('id')
        expect(response.body.name).toBe('Test User')
    })
})