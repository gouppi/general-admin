import jsonwebtoken from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import { Status } from '../models/Status';

/**
 * Authenticates JWT token on requests middleware
 * @param req Request
 * @param res Response
 * @param next Next Function
 */
const verifyJWT = (req: Request, res : Response, next: NextFunction) => {
    const token : string = req.headers["x-access-token"] as string;
    if (! token) {
        return res.status(Status.UNAUTHORIZED).json({message: "No Token", data: {loggedIn: false}});
    }
    const [_, tokenText] = token.split(' ');
    if( ! tokenText) {
        return res.status(Status.UNAUTHORIZED).json({message: "No valid token", data: {loggedIn: false}});
    }
    jsonwebtoken.verify(tokenText, "MAKSAMAKKARA", (err, decoded) => {
        if (err) return res.status(Status.INTERNAL).json({
            message: "Failed to authenticate",
            data: {
                loggedIn: false
            }
        });
        res.locals.user = decoded;
        res.locals.loggedIn = true;
        next();
    });
}

export default verifyJWT;