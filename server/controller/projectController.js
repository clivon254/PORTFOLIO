
import Project from "../model/projectModel.js"
import { errorHandler } from "../utils/error.js"



export const createProject = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed not create a project"))
    }


    const {title,image,description,tags} = req.body


    const newProject = new Project({
        title,
        image,
        description,
        tags
    })


    try
    {
        await newProject.save()

        res.status(200).json({success:true , newProject , message:'Project created successfully'})

    }
    catch(error)
    {
        next(error)
    }

}


export const getProject = async (req,res,next) => {

    const {projectId} = req.params

    try
    {
        const project = await Project.findById(projectId)

        if(!project)
        {
            return next(errorHandler(404, "project not found"))
        }

        res.status(200).json({success:true , project})

    }
    catch(error)
    {
        next(error)
    }

}


export const getProjects = async (req,res,next) => {

    try
    {

        const projects = await Project.find({}).sort({_id : -1})

        res.status(200).json({success:true , projects})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateProject = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to update project"))
    }

    const {projectId} = req.params

    try
    {
        const project = await Project.findById(projectId)

        if(!project)
        {
            return next(errorHandler(404,"Project not found"))
        }

        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            {
                $set:{
                    title:req.body.title,
                    description:req.body.description,
                    tags:req.body.tags,
                    image:req.body.image
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedProject})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteProject = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to update project"))
    }

    const {projectId} = req.params

    try
    {
        const project = await Project.findById(projectId)

        if(!project)
        {
            return next(errorHandler(404,"Project not found"))
        }

        await Project.findByIdAndDelete(projectId)

        res.status(200).json({success:true , message:"project deleted successfully"})

    }
    catch(error)
    {
        next(error)
    }

}