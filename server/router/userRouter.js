


import express from "express"
import { deleteUser, getUser, updateUser } from "../controller/userController.js"
import { verifyToken } from "../utils/verify.js"




const userRoute = express.Router()


userRoute.get('/get-user/:userId' , getUser)


userRoute.put('/update-user/:userId', verifyToken, updateUser)


userRoute.delete('/delete-user/:userId', verifyToken, deleteUser)



export default userRoute