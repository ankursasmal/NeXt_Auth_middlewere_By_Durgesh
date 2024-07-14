import {connections} from '@/db/connection.js'
import {userData} from '@/model/user.js'
import { NextResponse } from 'next/server';
 import bcrypt from 'bcryptjs';
 import jwt from 'jsonwebtoken'
 import { cookies } from 'next/headers'

async function fun(){
    try{
    await connections();
 
    }
    catch(e){
        console.log('db not connect at /api/login router')
    }
}
fun();
// /post req
export async function POST(req){
try{
     const { name, email, pass, cpass } = await req.json();

 
       const data= new userData({
        name:name,
        email:email,
        pass:pass,
        cpass:cpass 
       })  
 

// bcript 
 data.pass=await bcrypt.hash(data.pass,10)
  data.cpass=await bcrypt.hash(data.cpass,10)

//   jwt tokon generate
 
 let tokon= jwt.sign({
    _id:data._id,
},process.env.SECRET_KEY ,{ expiresIn: '1d' })

// //  tokon store in array
data.tokons=data.tokons.concat({tokon:tokon});
// cookie add
cookies().set('jwt',tokon, { secure: true },{expiresIn:'1d'})
 
 let result=await data.save();


return NextResponse.json({
        mess:'succc cookie store',
        status:true,
        result:result
    })
}
catch(e){
    console.log('data not regester')
    return NextResponse.json({e:e.message})

}
}
 

// get req
export async function GET(req){
    try{
        let data=await userData.find();
console.log(data);
return NextResponse.json({mess:'data fetch success ',status:200},data)
}
    catch(e){
        console.log('data not fetch')
        return NextResponse.json({mess:'data fetch not success  ',status:404},e)

    }
}