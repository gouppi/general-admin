import User, {UserLoginType, UserType} from '../models/User';
import Result from '../models/Result';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import {Status} from '../models/Status';

/**
 * Creates a new user to database
 * @param user
 * @returns Promise<string> - A message to display
 */
export const createUser = async (user : UserType) : Promise<Result> => {

    if (await User.findOne({username: user.username})) {
        return {message:"Username already taken", success:false, field: "username", statusCode: Status.FORBIDDEN}

    }
    if (await User.findOne({email:user.email})) {
        return {message:"Email already taken", success:false, field: "email", statusCode: Status.FORBIDDEN}
    }

    user.password = await bcrypt.hash(user.password, 10);

    const dbUser = new User({
        username: user.username.toLowerCase(),
        email: user.email.toLowerCase(),
        password: user.password,
    });

    if (await dbUser.save()) {
        return {message:"Success", success:true, statusCode: Status.OK};
    }
    return {message: "Error", success: false, statusCode: Status.INTERNAL}
}

/**
 * Returns all users from database
 * @returns
 */
export const getUsers = async () : Promise<Result> => {
    const data : UserType[] = await User.find({}, "username email createdAt updatedAt" );
    return {
        message: "",
        success: true,
        statusCode: Status.OK,
        data,
    }
}

/**
 * Deletes user by given userId
 * @param userId string
 * @returns
 */
export const deleteUser = async (userId:string) : Promise<Result> => {
    if (await User.findOne({_id: userId})) {
        await User.deleteOne({_id: userId});
        return {message: "User deleted successfully", success:true, statusCode: Status.OK}
    }
    return {message: "No user with given id found", success: false, statusCode: Status.NOT_FOUND}
}

/**
 *
 * @param user
 */
export const loginUser = async (user:UserLoginType) : Promise<Result> => {
    const dbUser = await User.findOne({email: user.email});
    if (! dbUser) {
        return {
            message: "Invalid email or password",
            data: {
                field: "email"
            },
            success: false,
            statusCode: Status.BAD_REQUEST
        }
    }

    if (! await bcrypt.compare(user.password, dbUser.password)) {
        return {
            message:"Invalid username or password",
            data: {
                field: "email"
            },
            success: false,
            statusCode: 400
        }
    }

    const payload = {
        id: dbUser._id,
        email: dbUser.email
    }
    const resultti = jsonwebtoken.sign(payload,"MAKSAMAKKARA",{expiresIn:600});
    if (!resultti) {
        return {
            message: "Error",
            data: "",
            success: false,
            statusCode: 500
        }
    }

    return {
        message: "Token created",
        data: "Bearer " + resultti,
        success: true,
        statusCode: 200
    }
}