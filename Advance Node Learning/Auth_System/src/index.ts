import express, { type Application, type Request, type Response } from 'express'
import router from './modules/auth/auth.route'
const app: Application = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.use('/auth', router)

export default app;