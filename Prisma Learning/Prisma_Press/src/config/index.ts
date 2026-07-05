import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.join(process.cwd(), '.env')
})

export default {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL as string,
    APP_URL: process.env.APP_URL,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_REFRSESH_SECRET: process.env.JWT_REFRSESH_SECRET as string,
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
    STRIPE_PRODUCT_ID: process.env.STRIPE_PRODUCT_ID as string,
    STRIPE_SECRET: process.env.STRIPE_SECRET as string,
    STRIPE_PRICE_ID: process.env.STRIPE_PRICE_ID as string,
    WEHBHOOK_SECRET: process.env.WEHBHOOK_SECRET as string
}