

import mongoose from "mongoose"


const cvSchema = new mongoose.Schema({

    fileUrl:{type:String, required:true}

},
    {timestamps:true}
)


const CV = mongoose.model('CV',cvSchema)



export default CV