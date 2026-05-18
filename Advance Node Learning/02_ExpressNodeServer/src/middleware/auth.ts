import type { NextFunction, Request, Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { pool } from '../db';

export const auth = (...roles: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // console.log("This is protected route");
            // console.log(roles);

            const token = req.headers.authorization
            if (!token)
                return res.status(401).json({ success: false, message: "Unauthorized access !!!" })

            const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload
            // console.log(decoded);

            const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [decoded.email])

            if (result.rowCount === 0)
                return res.status(404).json({ success: false, message: "User not found !!!" })

            const user = result.rows[0]

            if (!user.is_active)
                return res.status(403).json({ success: false, message: "Forbidden access !!!" })

            if(roles.length && !roles.includes(user.role))
                return res.status(403).json({ success: false, message: "Forbidden access !!!" })

            req.user = decoded

            next()
        }

        catch (err: any) {
            next(err)
        }
    }
}