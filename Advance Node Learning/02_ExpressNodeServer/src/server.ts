import express, { type Application, type Request, type Response } from 'express'
import { Pool } from 'pg'
import config from './config'
import { userRoute } from './routes/users.route'
import { initDB } from './services/user.service'

const app: Application = express()
const port = config.PORT

app.use(express.json())

const pool = new Pool({
    connectionString: config.DB
})

// const initDB = async () => {
//     try {
//         await pool.query(`
//             CREATE TABLE IF NOT EXISTS users(
//             id SERIAL PRIMARY KEY,
//             name VARCHAR(20),
//             email VARCHAR(20) UNIQUE NOT NULL,
//             age INT,
//             created_at TIMESTAMP DEFAULT NOW(),
//             is_active BOOLEAN DEFAULT TRUE
//             )
//         `)

//         console.log("DB connected successfully!!");
//     }
//     catch (err: any) {
//         console.log(err.message);
//         process.exit(1)
//     }
// }

initDB()

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        author: "Imran Ali",
        message: "Server is running....."
    })
})

app.use('/main', userRoute)

// app.post('/main', async (req: Request, res: Response) => {
//     const { name, email, age } = req.body;
//     // console.log(body)

//     if (!email)
//         return res.status(400).json({ success: false, message: "Email is required" });

//     try {
//         const result = await pool.query(`
//         INSERT INTO users(name, email, age)
//         VALUES($1, $2, $3)
//         RETURNING *
//         `, [name, email, age])

//         // console.log(result)

//         res.status(201).json({
//             success: true,
//             message: "User Created Successfully",
//             data: result.rows[0]
//         })
//     }
//     catch (err: any) {
//         res.status(500).json({
//             success: false,
//             message: err.message,
//             error: err
//         })
//     }
// })

// app.get('/main', async (req: Request, res: Response) => {
//     try {
//         const result = await pool.query(`
//             SELECT * FROM users
//         `)
//         // console.log(result);

//         res.status(200).json({
//             success: true,
//             message: "Users retreived Successfully",
//             data: result.rows
//         })

//     }
//     catch (err: any) {
//         res.status(404).json({
//             success: false,
//             message: "Users not found !!",
//             error: err
//         })
//     }
// })

// app.get('/main/:id', async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params
//         // console.log(id);

//         const result = await pool.query(`
//             SELECT * FROM users
//             WHERE id = $1
//         `, [id])

//         // console.log(result);

//         if (result.rowCount === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found !!",
//                 data: null
//             })
//         }

//         res.status(200).json({
//             success: true,
//             message: "Users retreived Successfully",
//             data: result.rows[0]
//         })

//     }
//     catch (err: any) {
//         res.status(404).json({
//             success: false,
//             message: "User not found !!",
//             error: err
//         })
//     }
// })

// app.put('/main/:id', async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params
//         const { name, age, is_active } = req.body

//         const result = await pool.query(`
//             UPDATE users
//             SET name = COALESCE($1, name), age = COALESCE($2, age), is_active = COALESCE($3, is_active)
//             WHERE id = $4
//             RETURNING *
//         `, [name, age, is_active, id])

//         // console.log(result);

//         if (result.rowCount === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Users not found !!",
//                 data: null
//             })
//         }

//         res.status(200).json({
//             success: true,
//             message: "Users Updated Successfully",
//             data: result.rows[0]
//         })
//     }
//     catch (err: any) {
//         res.status(404).json({
//             success: false,
//             message: "Users not found !!",
//             error: err
//         })
//     }
// })

// app.delete('/main/:id', async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params
//         const result = await pool.query(`
//             DELETE FROM users
//             WHERE id = $1
//         `, [id])

//         if (result.rowCount === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found !!",
//                 data: null
//             })
//         }

//         res.status(200).json({
//             success: true,
//             message: "Users Deleted Successfully",
//             data: null
//         })
//     }
//     catch (err: any) {
//         res.status(404).json({
//             success: false,
//             message: "Users not found !!",
//             error: err
//         })
//     }
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})