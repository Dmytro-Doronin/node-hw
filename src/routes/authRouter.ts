
import {Router} from "express";
import {
    authController, emailResendingController, meController,
    registrationConfirmationController,
    registrationController
} from "../controllers/authController";
import {errorMiddleware} from "../middleware/blogsMiddleware";
import {loginValidationModelMiddleware} from "../validation/loginValidationModel";
import {
    authEmailResendingValidationMiddleware,
    authRegistrationConfirmationValidationMiddleware,
    authRegistrationValidationMiddleware
} from "../validation/authValidationModel";
import {authMiddlewareWithBearer} from "../middleware/authMiddlewareWithBearer";
export const authRouter = Router()

authRouter.post('/me', authMiddlewareWithBearer, meController)
authRouter.post('/login', loginValidationModelMiddleware(), errorMiddleware, authController)
authRouter.post('/registration', authRegistrationValidationMiddleware(), errorMiddleware, registrationController)
authRouter.post('/registration-confirmation', authRegistrationConfirmationValidationMiddleware(), errorMiddleware,  registrationConfirmationController)
authRouter.post('/registration-email-resending', authEmailResendingValidationMiddleware(), errorMiddleware,  emailResendingController)