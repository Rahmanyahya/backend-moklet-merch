import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
   const token = req.cookies.token
   const verify = jwt.verify(token, String(process.env.SECRET_KEY))
   if (!verify) return res.status(401).json({message: "Access denied"})
    return next()
}

export {verifyJwt}