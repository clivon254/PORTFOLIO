

import express from "express"
import { verifyToken } from "../utils/verify.js"
import { createSkill, deleteSkill, getSkill, getSkills, updateSkill } from "../controller/skillController.js"



const skillRouter = express.Router()



skillRouter.post('/create-skill' ,verifyToken , createSkill)


skillRouter.get('/get-skill/:skillId', getSkill)


skillRouter.get('/get-skills' , getSkills)


skillRouter.put('/update-skill/:skillId' ,verifyToken , updateSkill)


skillRouter.delete('/delete-skill/:skillId' ,verifyToken , deleteSkill)




export default skillRouter