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
            age INT,
            created_at TIMESTAMP DEFAULT NOW(),
            is_active BOOLEAN DEFAULT TRUE
            )
        `)

        console.log("DB connected successfully!!");
    }
    catch (err: any) {
        console.error("DB onnection failed:", err.message);
        process.exit(1)
    }
}


// Initialize Queries
export const createUserQuery = async (name: string, email: string, age: number) => {
    const result = await pool.query(`
        INSERT INTO users(name, email, age)
        VALUES($1, $2, $3)
        RETURNING *
    `, [name, email, age])

    return result.rows[0]
}

export const getAllUsersQuery = async () => {
    const result = await pool.query(`
        SELECT * FROM users
    `)

    return result.rows
}

export const getUserByIdQuery = async (id: number) => {
    const result = await pool.query(`
        SELECT * FROM users
        WHERE id = $1
    `, [id])

    return result.rows[0] ?? null
}

export const updateUserQuery = async (id: number, name: string, age: number, is_active: boolean) => {
    const result = await pool.query(`
        UPDATE users
        SET name = COALESCE($1, name), age = COALESCE($2, age), is_active = COALESCE($3, is_active)
        WHERE id = $4
        RETURNING *
    `, [name, age, is_active, id])

    return result.rows[0] ?? null
}

export const deleteUserQuery = async (id: string) => {
    const result = await pool.query(`
        DELETE FROM users
        WHERE id = $1
    `, [id])

    return result.rowCount
}