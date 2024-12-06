
import Reveiw from "../model/reveiwModel.js"
import { errorHandler } from "../utils/error.js"



export const createReveiw = async (req,res,next) => {

    const {name,email,rate,content} = req.body 

    try
    {

        const newReveiw = new Reveiw({
            name,
            email,
            rate,
            content
        })

        await newReveiw.save()

        res.status(200).json({success:true , newReveiw})
    }
    catch(error)
    {
        next(error)
    }

}


export const getReveiw = async (req,res,next) => {

    const {reveiwId} = req.params

    try
    {
        const reveiw = await Reveiw.findById(reveiwId)

        if(!reveiw)
        {
            return next(errorHandler(404, "No reveiw found"))
        }

        res.status(200).json({success:true , reveiw})

    }
    catch(error)
    {
        next(error)
    }

}


export const getReveiws = async (req,res,next) => {

    try
    {
        const reveiws = await Reveiw.find({})

        res.status(200).json({success:true ,reveiws})
    }
    catch(error)
    {
        next(error)
    }

}


export const updateReveiw = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to update reveiw"))
    }

    const {reveiwId} = req.params

    try
    {

        const reveiw = await Reveiw.findById(reveiwId)

        if(!reveiw)
        {
            return next(errorHandler(404,"reveiw not found"))
        }

        const updatedReveiw = await Reveiw.findByIdAndUpdate(
            reveiwId,
            {
                $set:{
                    name:req.body.name,
                    email:req.body.email,
                    picture:req.body.picture,
                    content:req.body.content,
                    rate:req.body.rate
                }
            },
            {new : true}
        )

        res.status(200).json({success:true , updatedReveiw})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteReveiw = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to update reveiw"))
    }
    
    const {reveiwId} = req.params
    
    try
    {
    
        const reveiw = await Reveiw.findById(reveiwId)

        if(!reveiw)
        {
            return next(errorHandler(404,"reveiw not found"))
        }

        await Reveiw.findByIdAndDelete(reveiwId)

        res.status(200).json({success:true , message:"reveiw deleted successfully"})

    }
    catch(error)
    {
        next(error)
    }

}
