
import CV from "../model/cvModel.js"
import { errorHandler } from "../utils/error.js"



export const addCV = async (req,res,next) => {
    
    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to add cv"))
    }

    try
    {
        const {fileUrl,title} = req.body

        const newCv = new CV({
            fileUrl,title
        })


        await newCv.save()

        res.status(200).json({success:true , newCv})

    }
    catch(error)
    {
        next(error)
    }

}

export const getCv = async (req,res,next) => {

    const {cvId} = req.params

    try
    {
        const cv = await CV.findById(cvId)

        if(!cv)
        {
            return next(errorHandler(404 ,"cv not found"))
        }

        res.status(200).json({success:true , cv})
    }
    catch(error)
    {
        next(error)
    }
}

export const getCvs = async (req,res,next) => {

    try
    {
        const cvs = await CV.find({})

        res.status(200).json({success:true , cvs})
        
    }
    catch(error)
    {
        next(error)
    }
}

export const updateCv = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to add cv"))
    }

    try
    {
        const {cvId} = req.params

        const cv = await CV.findById(cvId)

        if(!cv)
        {
            return next(errorHandler(404 ,"cv not found"))
        }

        const updatedCV= await CV.findByIdAndUpdate(
            cvId,
            {
                $set:{
                    fileUrl:req.body.fileUrl,
                    title:req.body.title
                }
            },
            {new : true}
        )

        res.status(200).json({success:true , updatedCV})
    }
    catch(error)
    {
        next(error)
    }
}

export const deleteCv = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to add cv"))
    }

    try
    {
        const {cvId} = req.params

        const cv = await CV.findById(cvId)

        if(!cv)
        {
            return next(errorHandler(404 ,"cv not found"))
        }

       await CV.findByIdAndDelete(cvId)

       res.status(200).json({success:true , message:"cv deleted"})
    }
    catch(error)
    {
        next(error)
    }
}