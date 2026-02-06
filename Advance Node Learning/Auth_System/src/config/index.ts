import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.join(process.cwd(), '.env')
})

const config = {
    PORT: process.env.PORT as string | number,
    URI: process.env.URI as string,
    JWT_SECRET: process.env.JWT_SECRET as string
}

export default config