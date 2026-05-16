import { pool } from "../db"

export const createProfileQuery = async (user_id: number, bio: string, address: string, phone: string, gender: string) => {
    const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [user_id])

    // console.log(user_id);

    if (user.rowCount === 0) {
        throw new Error("User does not exist")
    }

    const result = await pool.query(`
        INSERT INTO profiles(user_id, bio, address, phone, gender)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *
    `, [user_id, bio, address, phone, gender])

    return result.rows[0]
}

export const getProfilesQuery = async () => {
    const result = await pool.query(`SELECT * FROM profiles`)
    // console.log(result);
    return result.rows
}

export const getProfileByIdQuery = async (id: string) => {
    const result = await pool.query(`SELECT * FROM profiles WHERE id=$1`, [id])
    return result.rows[0] ?? null
}

export const updateProfileQuery = async (bio: string, address: string, phone: string, id: string) => {
    const result = await pool.query(`
        UPDATE profiles
        SET bio = COALESCE($1, bio), address = COALESCE($2, address), phone = COALESCE($3, phone)
        WHERE id=$4
        RETURNING *
    `, [bio, address, phone, id])

    return result.rows[0] ?? null
}

export const deleteProfileQuery = async (id: string) => {
    const result = await pool.query(`DELETE FROM profiles WHERE id=$1`, [id]);
    return result.rowCount
}