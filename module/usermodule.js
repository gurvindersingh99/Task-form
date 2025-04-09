const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            MaxLength:100
        },
        email:{
              type:String,
              MaxLength:100,
              unique:true
        },
        contact:{
            type:Number,
            default:null
        },
        password:{
            type:String,
            unique:true
        },
         status:{
            type:Boolean,
             default:true
        }
    },
    {
        timestamps:true
    }
)
 const userModel = new mongoose.model("product",userSchema) 
 module.exports = userModel;