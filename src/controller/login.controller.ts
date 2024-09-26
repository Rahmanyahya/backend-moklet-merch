import { loginService } from "../service/login.service";
import { Response, Request } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


const loginController = async (req: Request, res: Response) => {
  try {
    const { password, username } = req.body;

    const checkEmail = await loginService(username);

    if (checkEmail == null) return res.status(401).json({message: "your account is not available"});

     bcrypt.compare(password, checkEmail.password,  (err,_) => {
      if (err) return res.status(401).json({message: "incorrect password"});
      
      const payload = {
        id: Math.random(),
        role: checkEmail.role
      }

      return res.status(200).json({message: "Successfully login"}), res.cookie("token", jwt.sign(payload, String(process.env.SECRET_KEY), {expiresIn: '24h', algorithm: "ES512"}), {httpOnly: true, secure: true, sameSite: "strict"})
    })

  } catch (error) {
    return res.status(400).json(error);
  }
};

export {loginController}
