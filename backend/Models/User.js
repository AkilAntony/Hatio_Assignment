import mongoose from "mongoose"

 const userSchema = new mongoose.Schema(
    {
        email:{
            required: true,
            type:"string",
            unique: true,
            trim: true
        },
        password:{
            required: true,
            minLength: 6,
            type: 'string'
        },
    },
     {
            timestamps:true,
    }
 )

 export const User = mongoose.model('User', userSchema)