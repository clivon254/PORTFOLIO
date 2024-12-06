


import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"



export const updateUser = async (req,res,next) => {

    const {userId}  = req.params


    if(req.user.id !== userId)
    {
       return next(errorHandler(403,"You not allowed to updated the user profile"))
    }

   
    const user = await User.findById(userId)

    if(!user)
    {
        return next(errorHandler(404,"User not found"))
    }

    try 
    {
        if(req.body.password)
        {
            req.body.password = bcryptjs.hashSync(req.body.password ,10)
        }

        const updatedUser = await User.findByIdAndUpdate(
             userId,
             {
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    profilePicture:req.body.profilePicture
                }
            }
            ,
            {new:true}
        )

        const {password , ...rest} = updatedUser._doc

        res.status(200).json({success:true ,rest})

    }
    catch(error)
    {
        next(error)
    }

}


export const getUser = async (req,res,next) => {

    const {userId} = req.params
    
    try
    {
        const user = await User.findById(userId)

        if(!user)
        {
            return next(errorHandler(404, "User not found"))
        }

        const {password , ...rest} = user._doc


        res.status(200).json({success:true , rest})

        
    }
    catch(error)
    {
        next(error)
    }

}


export const deleteUser = async (req,res,next) => {

    const {userId}  = req.params

    if(req.user.id !== userId)
    {
        return next(errorHandler(401, "You are not allowed to delete this account"))
    }
    
    const user = await User.findById(userId)

    if(!user)
    {
        return next(errorHandler(404 ,"User not found"))
    }

    try
    {
        await User.findByIdAndDelete(userId)

        res.status(200).json({success:true , message:'account has been deleted'})
    }
    catch(error)
    {
        next(error)
    }

}