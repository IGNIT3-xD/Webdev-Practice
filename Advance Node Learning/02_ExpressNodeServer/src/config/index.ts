import dotenv from 'dotenv'
import path from 'path';

dotenv.config({
    path: path.join(process.cwd(), '.env')
})

const config = {
    DB: process.env.DB as string,
    PORT: process.env.PORT as unknown as number
}

export default config