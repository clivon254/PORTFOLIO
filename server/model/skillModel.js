

import mongoose from "mongoose";


const  skillSchema = new mongoose.Schema(
    {
        title : {type:String , required:true},

        image: {type:String , required:true},

        description:{type:String , required:true},

    },
    {
        timestamps: true,
    }
)


const Skill = mongoose.model('Skill', skillSchema)



export default Skill