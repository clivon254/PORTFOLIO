

import express from "express"
import { verifyToken } from "../utils/verify.js"
import { createProject, deleteProject, getProject, getProjects, updateProject } from "../controller/projectController.js"



const projectRouter = express.Router()



projectRouter.post('/create-project' ,verifyToken , createProject)


projectRouter.get('/get-project/:projectId', getProject)


projectRouter.get('/get-projects' , getProjects)


projectRouter.put('/update-project/:projectId' ,verifyToken , updateProject)


projectRouter.delete('/delete-project/:projectId' ,verifyToken , deleteProject)




export default projectRouter