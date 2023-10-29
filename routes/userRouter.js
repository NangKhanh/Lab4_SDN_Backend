import express from 'express'
import { userController } from '../controllers/index.js'
import { body, validationResult } from "express-validator";


// Khai báo đối tượng Router
const userRouter = express.Router()


userRouter.post('/login', userController.login)
userRouter.get('/', userController.findAll)
userRouter.post('/',
    body("username").notEmpty().withMessage("Username not empty"),
    body("email").isEmail().withMessage("Please input format your email !"),
    body("password").isLength({ min: 8 }).withMessage("Please passwords must be at least 8 characters !!"),
    userController.register
)
userRouter.post('/:id/comment', userController.addComment);
userRouter.get('/:id', userController.findOne)
userRouter.delete('/:id', userController.deleteOne)
userRouter.put('/:id', userController.updateOne)

export default userRouter;