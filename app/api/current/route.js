import jwt from 'jsonwebtoken';
import { userData } from '@/model/user.js';
import { NextResponse } from 'next/server';
import {connections} from '@/db/connection'
 
async function fun(){
    try{
    await connections();
 
    }
    catch(e){
        console.log('db not connect at /api/login router')
    }
}
fun();

export async function GET(request,res) {
    try{
         const authtoken = request.cookies.get('jwt');
         console.log(authtoken)

//  ********* authtoken it is an obj  =>(authtoken.value) ** jwt.verify(under pass korta hoba)
// node js a o aki rakon korta hoba mona hoi?
   const verifiedUser =  jwt.verify(authtoken.value, process.env.SECRET_KEY);
//  *********    importent above commment **************
          
        //  console.log(verifiedUser)
        const user = await userData.find({_id:verifiedUser._id});
        
        
         return NextResponse.json(user);
    }  
    catch(e){
        return NextResponse.json({e:e.message})
    }
}




// this give current user data nodejs a auth route a likte hoto daat anar jano but next js a
// extra file for middele wear &&& this file for get auth ures dtail