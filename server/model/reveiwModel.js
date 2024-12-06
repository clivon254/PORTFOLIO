

import mongoose from "mongoose"


const reveiwSchema = new mongoose.Schema(
    {
        name:{type:String , required:true},

        email:{type:String , required:true},

        rate:{type:Number  , required:true , max:5 , min:1},

        content:{type:String , required:true},

        picture:{type:String , default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"},
    },
    {
        timestamps: true,
    }
)


const Reveiw = mongoose.model('Reveiw', reveiwSchema)


export default Reveiw