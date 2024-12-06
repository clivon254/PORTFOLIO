

import express from "express"
import { contactMe, forgotPassord, resetPassword, signin, signup } from "../controller/authController.js"


const authRouter = express.Router()



authRouter.post('/sign-in' , signin)


authRouter.post('/sign-up' , signup)


authRouter.post('/forgot-password' ,forgotPassord)


authRouter.post('/reset-password/:token', resetPassword)


authRouter.post('/contact-us', contactMe)



export default authRouter