import mongoose, { Schema } from "mongoose";
import type { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: 5,
        },
        role: {
            type: String,
            enum: {
                values: ['User', 'Admin'],
                message: '{VALUE} is not a valid role',
            },
            default: 'User'
        },
        token: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;