import {Schema} from 'express-validator';
import User, { UserType } from '../models/User';
import bcrypt from 'bcrypt';

let U : UserType;

const registerSchema: Schema = {

    email: {
        isEmail: {
            bail: true
        },
        in: ['body'],
        errorMessage: "Email is required field",
        custom: {
            options: value => {
                return User.findOne({
                    email: value
                }).then((user: UserType) => {
                    if (user !== null) {
                        return Promise.reject("Email already taken")
                    }
                })
            }
        }
    },
    password: {
        isAlphanumeric: {
            bail: true
        },
        errorMessage: "Passwords do not match",
    },
    password2: {
        isAlphanumeric: {
            bail: true
        },
        errorMessage: "Passwords do not match",
        custom: {
            options: (value, {req}) => {
                return req.body.password === value;
            }
        }
    }
}

const loginSchema : Schema = {
    email: {
        isEmail:{
            bail: true
        },
        in: ['body'],
        errorMessage: "Email is required field",
        custom: {
            options: value => {
                return User.findOne({
                    email: value
                }).then((user:UserType) => {
                    if (user === null) {
                        return Promise.reject('Email not found')
                    }
                    U = user
                })
            }
        }
    },
    password: {
        isAlphanumeric: {
            bail:true,
            errorMessage: "Password is required field"
        },
        custom: {
            options: async value => {
                if (!await bcrypt.compare(value, U.password)) {
                    return Promise.reject('Password is required field')
                }
            }
        }
    }
}

export {loginSchema, registerSchema};