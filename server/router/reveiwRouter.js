

import express from "express"
import { createReveiw, deleteReveiw, getReveiw, getReveiws, updateReveiw } from "../controller/reveiwController.js"
import { verifyToken } from "../utils/verify.js"


const reveiwRouter = express.Router()


reveiwRouter.post('/create-reveiw' ,verifyToken ,  createReveiw)


reveiwRouter.get('/get-reveiw/:reveiwId' ,  getReveiw)


reveiwRouter.get('/get-reveiws' ,  getReveiws)


reveiwRouter.put('/update-reveiw/:reveiwId' ,verifyToken ,  updateReveiw)


reveiwRouter.delete('/delete-reveiw/:reveiwId' ,verifyToken ,  deleteReveiw)



export default reveiwRouter