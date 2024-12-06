

import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import africastalking from "africastalking"


export const signup = async (req,res,next) => {

    const {email,password,username} = req.body 

    if(!username || !password || !email || username === "" || email === "" || password === "" )
    {
        return next(errorHandler(400,"Please fill all the fields"))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
        email,
        password:hashedPassword,
        username
    })

    try
    {

        await newUser.save()

        res.status(200).json({success:true , message:"You have successfully signed up"})
    }
    catch(error)
    {
        next(error)
    }

}


export const signin = async (req,res,next) => {

    const {email,password} = req.body

    if(!email || !password || email === "" || password === "")
    {
        return next(errorHandler(400 ,"fill all the feilds"))
    }

    try
    {
        const validUser = await User.findOne({email})

        if(!validUser)
        {
            return next(errorHandler(404, "User not found"))
        }

        const isMatch = await bcryptjs.compare(password , validUser.password)

        if(!isMatch)
        {
            return next(errorHandler(400,"Invalid password"))
        }

        const token = jwt.sign(
            {
                id:validUser._id,
                isAdmin: validUser.isAdmin
            },
            process.env.JWT_SECRETE,
            {expiresIn:'12h'}
        )

        const {password:pass , ...rest} = validUser._doc

        res.status(200).json({success:true ,rest ,token})

    }
    catch(error)
    {
        next(error)
    }

}


export const forgotPassord = async (req,res,next) => {
    
    const {email} = req.body

    if(!email || email === "")
    {
        return next(errorHandler(404,"User not found"))
    }

    const user = await User.findOne({email})

    if(!user)
    {
        return next(errorHandler(404,"User not found"))
    }


    try
    {
        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRETE,
            {expiresIn:'12h'}
        )

        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.AUTH_USER,
                pass:process.env.AUTH_PASS
            }
        })

        const url = process.env.FRONTEND_URL

        var mailOptions =  {
            from:"CLIVON PORTFOLIO",
            to:user.email,
            subject:"RESET PASSWORD",
            text:`Please click the link to reset your password : ${url}/reset-password/${token}`
        }

        transporter.sendMail(mailOptions ,(error ,info) => {

            if(error)
            {
                console.log(error)
            }
            else
            {
                console.log("Email sent" + info.response)
            }

        })

        res.status(200).json({success:true ,message:"Link sent to your email"})

    }
    catch(error)
    {
        next(error)
    }

}


export const resetPassword = async (req,res,next) => {

    const {token} = req.params

    const {password , confirmPassword} = req.body

    try
    {
        const decodedToken = jwt.verify(token , process.env.JWT_SECRETE)

        const user = await User.findById(decodedToken.id)

        if(!user)
        {
            return next(errorHandler(404, "User not found"))
        }

        if(password !== confirmPassword) 
        {
            return next(errorHandler(400, "Passwords do not match"))
        }

        const hashedPassword = bcryptjs.hashSync(password , 10)

        user.password = hashedPassword

        await user.save()

        res.status(200).json({success:true ,message:"Password successfully reset"})

    }
    catch(error)
    {
        next(error)
    }

}


export const contactMe = async (req,res,next) => {

    try
    {
        const {phone, name , email ,subject , content } = req.body

        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.AUTH_USER,
                pass:process.env.AUTH_PASS
            }
        })

        const mailOptions = {
            from: `<${email}>`,
            to:process.env.AUTH_USER,
            subject:`Contact Form : ${subject}` ,
            text:`
                Name:${name}
                Email:${email}
                Subject:${subject}
                Message:${content}
            `
        }

        // send Email
        await transporter.sendMail(mailOptions ,(err,info) => {

            if(err)
            {
                console.log("error sending the mail :"  + err)
            }
            else
            {
                console.log("Email sent successfully sent us " + info)
            }

        })

        const at = africastalking({
            apiKey:process.env.SMS_APIKEY,
            username:process.env.SMS_USERNAME
        })

        const sms = at.SMS

        const smsMessage = `New Contact Form Submission:
            - Name: ${name}
            - Phone: ${phone}
            - Email: ${email}
            - Subject: ${subject}`
        ;

        // function to send SMS
        const sendSMSNotification = async (message) => {

            try
            {
                const response = await sms.send({
                    to:`+254757429010`,
                    message,
                })

                console.log('SMS sent successfully', response)
            }
            catch(error)
            {
                console.log('Error sending SMS', error.message)
            }

        }

        await sendSMSNotification(smsMessage)

        res.status(200).json({success:true , message:"Message sent successfully!!!"})

    }
    catch(error)
    {
        next(error)
    }

}

