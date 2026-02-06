import type { NextFunction, Request, Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from '../config';
import User from '../modules/user/user.model';

export const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization
            if (!token)
                return res.status(401).json({ success: false, message: "Unauthorized access !!!" })

            const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload
            // console.log(decoded);
            const email = decoded.email

            const result = await User.findOne({email})

            if (!result)
                return res.status(404).json({ success: false, message: "User not found !!!" })

            //req.user = decoded

            next()
        }

        catch (err: any) {
            next(err)
        }
    }
}