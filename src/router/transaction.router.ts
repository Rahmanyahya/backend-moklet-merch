import {Router} from "express"
import { validateTransaction, validateTransactionById } from "../middleware/transaction.validation"
import { addTransactionService } from "../service/transaction.service"
import { uploadPaymentImage } from "../middleware/upload.photo"
import { changeStatusController, deleteTransactionController, getAllTransactionController } from "../controller/transaction.controller"
import { verifyJwt } from "../middleware/verifyJWT.middleware"

const router = Router()

router.post('/', [uploadPaymentImage,validateTransaction], addTransactionService)
router.delete('/:id', [verifyJwt,validateTransactionById], deleteTransactionController)
router.get('/',verifyJwt, getAllTransactionController)
router.patch('/:id', [verifyJwt,validateTransactionById], changeStatusController)

export default router