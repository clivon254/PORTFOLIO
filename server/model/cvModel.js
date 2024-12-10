

import mongoose from "mongoose"


const cvSchema = new mongoose.Schema({

    title:{type:String , required:true},

    fileUrl:{type:String, required:true}

},
    {timestamps:true}
)


const CV = mongoose.model('CV',cvSchema)



export default CV