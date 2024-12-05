

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import "dotenv/config"


const app = express()

const PORT = process.env.PORT


app.use(cors())


app.use(express.json())


// DB CONNECTION
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB Connected"))
.catch((err) => console.log(err))



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





