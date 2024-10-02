import { Router } from "express"
import { loginValidation } from "../middleware/login.validation"
import { loginController } from "../controller/login.controller"

const router = Router()

router.post('/', [loginValidation], loginController)

export default router