import {Schema, model} from 'mongoose';

interface UserType {
    _id?: string,
    username: string,
    email: string,
    password?: string,
    salt?: string
}

const userSchema = new Schema<UserType>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
}, {timestamps: true});

const User = model<UserType>("User", userSchema);

export default User;
export type {UserType};







