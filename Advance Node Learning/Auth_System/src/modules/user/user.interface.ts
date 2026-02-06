import type { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    created_at: Date;
    updated_at: Date;
    token?: string;
}