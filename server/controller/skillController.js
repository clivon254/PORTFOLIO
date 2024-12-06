

import Skill from "../model/skillModel.js"
import { errorHandler } from "../utils/error.js"



export const createSkill = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed not create a project"))
    }


    const {title,image,description} = req.body


    const newSkill = new Skill({
        title,
        image,
        description
    })


    try
    {
        await newSkill.save()

        res.status(200).json({success:true , newSkill , message:'Skill created successfully'})

    }
    catch(error)
    {
        next(error)
    }

}


export const getSkill = async (req,res,next) => {

    const {skillId} = req.params

    try
    {
        const skill = await Skill.findById(skillId)

        if(!skill)
        {
            return next(errorHandler(404, "skill not found"))
        }

        res.status(200).json({success:true , skill})

    }
    catch(error)
    {
        next(error)
    }

}


export const getSkills = async (req,res,next) => {

    try
    {

        const skills = await Skill.find({}).sort({_id : -1})

        res.status(200).json({success:true , skills})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateSkill = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to update project"))
    }

    const {skillId} = req.params

    try
    {
        const skill = await Skill.findById(skillId)

        if(!skill)
        {
            return next(errorHandler(404,"Skill not found"))
        }

        const updatedSkill = await Skill.findByIdAndUpdate(
            skillId,
            {
                $set:{
                    title:req.body.title,
                    description:req.body.description,
                    image:req.body.image
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedSkill})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteSkill = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to update project"))
    }

    const {skillId} = req.params

    try
    {
        const skill = await Skill.findById(skillId)

        if(!skill)
        {
            return next(errorHandler(404,"skill not found"))
        }

        await Skill.findByIdAndDelete(skillId)

        res.status(200).json({success:true , message:"skill deleted successfully"})

    }
    catch(error)
    {
        next(error)
    }

}