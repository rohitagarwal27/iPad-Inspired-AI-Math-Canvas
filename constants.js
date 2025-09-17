import dotenv from 'dotenv'
dotenv.config()

export const SERVER_URL = process.env.SERVER_URL || 'http://localhost'
export const PORT = Number(process.env.PORT) || 8900
export const ENV = process.env.NODE_ENV || 'development'
export const CORS_ORIGIN = process.env.CORS_ORIGIN || '*'
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY

const requiredVars = ['GEMINI_API_KEY']
const missing = requiredVars.filter((v) => !process.env[v])
if (missing.length > 0) {
  // eslint-disable-next-line no-console
  console.warn(`Missing required env vars: ${missing.join(', ')}`)
}

