import 'dotenv/config'
import z from 'zod'

const envSchema = z.object({
    PORT: z.string().default('3333'),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
})

export const ENV = envSchema.parse(process.env)