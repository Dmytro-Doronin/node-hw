"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const blogsMiddleware_1 = require("../middleware/blogsMiddleware");
const loginValidationModel_1 = require("../validation/loginValidationModel");
const authValidationModel_1 = require("../validation/authValidationModel");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/login', (0, loginValidationModel_1.loginValidationModelMiddleware)(), blogsMiddleware_1.errorMiddleware, authController_1.authController);
exports.authRouter.post('/registration', (0, authValidationModel_1.authRegistrationValidationMiddleware)(), blogsMiddleware_1.errorMiddleware, authController_1.registrationController);
exports.authRouter.post('/registration-confirmation', (0, authValidationModel_1.authRegistrationConfirmationValidationMiddleware)(), blogsMiddleware_1.errorMiddleware, authController_1.registrationConfirmationController);
exports.authRouter.post('/registration-email-resending', (0, authValidationModel_1.authRegistrationConfirmationValidationMiddleware)(), blogsMiddleware_1.errorMiddleware, authController_1.emailResendingController);
