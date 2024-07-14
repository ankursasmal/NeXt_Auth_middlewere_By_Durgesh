
import mongoose from "mongoose";

export  async function connections(){
    try{
        let dbconnection= await mongoose.connect( process.env.MONGO_URL || "")
        console.log('db connect');
     }
    catch(e){
        console.log('db not connect');
    }
}
