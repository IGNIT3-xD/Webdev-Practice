import { Pool } from "pg";
import config from "../config";

// Initialize Database
export const pool = new Pool({
    connectionString: config.DB
})

export const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(20),
            email VARCHAR(20) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            age INT,
            created_at TIMESTAMP DEFAULT NOW(),
            is_active BOOLEAN DEFAULT TRUE,
            role VARCHAR(10) DEFAULT 'user'
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS profiles(
            id SERIAL PRIMARY KEY,
            user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
            bio TEXT,
            address TEXT,
            phone VARCHAR(15),
            gender TEXT,
            created_at TIMESTAMP DEFAULT NOW()
            )
        `)

        console.log("DB connected successfully!!");
    }
    catch (err: any) {
        console.error("DB onnection failed:", err.message);
        process.exit(1)
    }
}