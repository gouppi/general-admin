import User, {UserType} from '../models/User';
import bcrypt from 'bcrypt';

/**
 * Creates a new user to database
 * @param user
 * @returns Promise<string> - A message to display
 */
export const createUser = async (user : UserType) : Promise<string> => {

    if (await User.findOne({username: user.username})) {
        return "Username already taken";
    }
    if (await User.findOne({email:user.email})) {
        return "Email already taken"
    }

    // Salt & Hash incoming password
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);

    const dbUser = new User({
        username: user.username.toLowerCase(),
        email: user.email.toLowerCase(),
        password: user.password,
        salt: user.salt
    });

    if (await dbUser.save()) {
        return "Success";
    }
    return "Error";
}


export const getUsers = async () : Promise<UserType[]> => {

    return await User.find({}, "username email createdAt updatedAt" );

}

