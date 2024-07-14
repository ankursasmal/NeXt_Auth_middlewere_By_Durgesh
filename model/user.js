import mongoose from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken'

let userSchema=new mongoose.Schema({
name:{
    type:String,
    required:true,
    minlength:3

},email:{
    type:String,
    required:true,
    unique:true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("check email")
        }
    }
    
},
pass:{
    type:String,
    required:true,
 },
cpass:{
    type:String,
    required:true,
 
},
tokons:[
    {tokon:{
    type:String,
 }}]
})

  

export let userData= mongoose.models.userData ||  mongoose.model('userData',userSchema);
 