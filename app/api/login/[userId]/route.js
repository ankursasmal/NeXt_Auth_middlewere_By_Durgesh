import {connections} from '@/db/connection.js'
import {userData} from '@/model/user.js'
import { NextResponse } from 'next/server';


async function fun(){
    try{
    await connections();
 
    }
    catch(e){
        console.log('db not connect at /api/login router')
    }
}
fun();


// put req
export async function PUT(req,{params}){
try{ 
    
    let {name,email,pass,cpass}= await req.json();

    let id = await params.userId;
     // ****** must find one******

    let result= await userData.findOne({_id:id});
console.log("result",result)

          result.name=name;
          result.email=email;
          result.pass=pass;
          result.cpass=cpass ;
       
                let data = await result.save();
 console.log(result)

       return NextResponse.json({mess:'update success db',status:201},data)


}
catch(e){
    console.log('data not regester')
    return NextResponse.json({mess:'update not success db',status:401},e)

}
}


// get req specific
export async function GET(req,{params}){
    try{
        let id=params.userId;
        // must find one
        let data=await userData.findOne({_id:id});
console.log(data);
return NextResponse.json({mess:'data fetch success ',status:200},data)
}
    catch(e){
        console.log('data not fetch')
        return NextResponse.json({mess:'data fetch not success  ',status:404},e)

    }
}


// delete req specific
export async function DELETE(req,{params}){
    try{
        let id=params.userId;
        // must delete(one)
        let data= await userData.deleteOne({_id:id});
console.log(data);
return NextResponse.json({mess:'data fetch success ',status:200},data)
}
    catch(e){
        console.log('data not fetch')
        return NextResponse.json({mess:'data fetch not success  ',status:404},e)

    }
}