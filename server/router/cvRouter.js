

import express from "express"
import { addCV, deleteCv, getCv, getCvs, updateCv } from "../controller/cvControllers.js"
import { verifyToken } from "../utils/verify.js"


const cvRouter = express.Router()


cvRouter.post('/add-cv', verifyToken , addCV)


cvRouter.get('/get-cv/:cvId' , getCv)


cvRouter.get('/get-cvs' , getCvs)


cvRouter.put('/update-cv/:cvId', verifyToken , updateCv)


cvRouter.delete('/delete-cv/:cvId', verifyToken , deleteCv)



export default cvRouter