import {body} from "express-validator";

export const authLogin = body('login')
    .isString()
    .trim()
    .isLength({min: 3, max: 10})
    .matches('^[a-zA-Z0-9_-]*$')
    .withMessage('The field must not be less then 3 symbols and more then 10 symbols')

export const authPassword = body('password')
    .isString()
    .trim()
    .isLength({min: 6, max: 20})
    .withMessage('The field must not be less then 6 symbols and more then 20 symbols')

export const authEmail = body('email')
    .isString()
    .trim()
    .isLength({min: 1})
    .isEmail()
    // .matches('^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
    .withMessage('Wrong email')

export const authCode = body('code')
    .isString()

export const authRegistrationValidationMiddleware = () => [authLogin, authPassword,authEmail]
export const authRegistrationConfirmationValidationMiddleware = () => [authCode]