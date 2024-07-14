import {connections} from '@/db/connection.js'
import {userData} from '@/model/user.js'
import { NextResponse } from 'next/server';
 import bcrypt from 'bcryptjs'
 import jwt  from 'jsonwebtoken'
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
 

// sign in 
export async function POST(req){
    try{
        let {email,pass}=await req.json();
// frist data find
     let data=await userData.findOne({email:email});
 
        // jwt tokon create
        let tokon= jwt.sign({
            _id:data._id,
        },process.env.SECRET_KEY ,{ expiresIn: '1d' })

         //  add tokon in array
        data.tokons=data.tokons.concat({tokon:tokon})
        // add cookie in brouser
 cookies().set('jwt',tokon,{secure:true},{expiresIn:'1d'})
 

 let isMatch= bcrypt.compare(data.pass,pass);
        
if(isMatch){

console.log('login success');
        return NextResponse.json({mess:'data fetch success ',status:200},data)
        }
      throw new Error('not authrizze');
}
    catch(e){
        console.log('data not fetch')
        return NextResponse.json({mess:'data fetch not success  ',status:404},e)

    }
}
