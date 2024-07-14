import {connections} from '@/db/connection.js'
import {userData} from '@/model/user.js'
import { NextResponse } from 'next/server';
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
 
export async function GET(){
try{
cookies().delete('jwt');
return   NextResponse.json({
    mess:"Logout success Api/logout backend",
    success:true
});
 }
catch(e){
    console.log('not Logout backend')
    return NextResponse.json({mess:'not logout backend',e:e.message})
}

}