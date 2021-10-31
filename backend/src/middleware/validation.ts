import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import Result from "../models/Result";

const validateErrors = (req: Request, res: Response, next: NextFunction) => {
    console.log("VALIDATE ERRORS");

    const errors = validationResult(req);
    if (!errors.isEmpty() ) {
        const payload : Result = {
            message: "Errors found",
            statusCode: 400,
            success: false,
            errors: errors.array()
        }
        res.status(400).json(payload);
        return
    }
    next();
}

export default validateErrors;