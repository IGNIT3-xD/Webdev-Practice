import { pool } from "../db"
import bcrypt from 'bcrypt'

// Initialize Queries
export const createUserQuery = async (name: string, email: string, password: string, age: number) => {

    const hashPassword = await bcrypt.hash(password, 10)
    // console.log(hashPassword);

    const result = await pool.query(`
        INSERT INTO users(name, email, password, age)
        VALUES($1, $2, $3, $4)
        RETURNING *
    `, [name, email, hashPassword, age])

    delete result.rows[0].password;

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

export const updateUserQuery = async (id: number, name: string, age: number, password: string, is_active: boolean) => {
    const hashPassword = await bcrypt.hash(password, 10)

    const result = await pool.query(`
        UPDATE users
        SET name = COALESCE($1, name), age = COALESCE($2, age), password = COALESCE($3, password), is_active = COALESCE($4, is_active)
        WHERE id = $5
        RETURNING *
    `, [name, age, hashPassword, is_active, id])

    delete result.rows[0].password;

    return result.rows[0] ?? null
}

export const deleteUserQuery = async (id: string) => {
    const result = await pool.query(`
        DELETE FROM users
        WHERE id = $1
    `, [id])

    return result.rowCount
}