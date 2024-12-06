

import express from "express"
import { addCV, deleteCv, getCv, updateCv } from "../controller/cvControllers.js"
import { verifyToken } from "../utils/verify.js"


const cvRouter = express.Router()


cvRouter.post('/add-cv', verifyToken , addCV)


cvRouter.get('/get-cv' , getCv)


cvRouter.put('/update-cv', verifyToken , updateCv)


cvRouter.delete('/delete-cv', verifyToken , deleteCv)



export default cvRouter