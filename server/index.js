

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import "dotenv/config"
import authRouter from "./router/authRouter.js"
import userRoute from "./router/userRouter.js"


const app = express()

const PORT = process.env.PORT


app.use(cors())


app.use(express.json())


// DB CONNECTION
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB Connected"))
.catch((err) => console.log(err))



// ROUTER

app.use('/api/auth' , authRouter)


app.use('/api/user' , userRoute)




// API
app.get('/', (req,res) => {

    res.send("I NEED THIS PORTFOLIO")

})


// LISTENING
app.listen(PORT ,(err) => {

    if(!err)
    {
        console.log(`Server is running on port ${PORT}`)
    }
    else
    {
        console.log(err)
    }

})


app.use((err,req,res,next) => {

    const statusCode = err.statusCode || 500 

    const message = err.message || "Internal Server Error"

    res.status(statusCode).json({success:false ,message:message})
})




