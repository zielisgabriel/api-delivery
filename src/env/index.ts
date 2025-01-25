import 'dotenv/config'
import z from 'zod'

const envSchema = z.object({
    PORT: z.string().default('3333')
})

export const ENV = envSchema.parse(process.env)