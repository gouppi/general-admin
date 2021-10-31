import {Schema, model} from 'mongoose';

interface UserType {
    _id?: string,
    email: string,
    password?: string,
}

interface UserLoginType {
    email: string,
    password: string,
    rememberMe: boolean
}

const userSchema = new Schema<UserType>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {timestamps: true});

const User = model<UserType>("User", userSchema);

export default User;
export type {UserType, UserLoginType};







