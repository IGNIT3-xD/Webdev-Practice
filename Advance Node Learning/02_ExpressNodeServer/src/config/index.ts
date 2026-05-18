import dotenv from 'dotenv'
import path from 'path';

dotenv.config({
    path: path.join(process.cwd(), '.env')
})

const config = {
    DB: process.env.DB as string,
    PORT: process.env.PORT as unknown as number,
    JWT_SECRET: process.env.JWT_SECRET as string,
    REF_SECRET: process.env.REF_SECRET as string
}

export default config