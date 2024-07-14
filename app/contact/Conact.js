'use client'

import { httpAxios } from '@/db/httpaxios';
import React, { useEffect, useState } from 'react'
 
function Conact() {
    let [data,setdata]=useState({});
    
    async function fun(e){
    try{
        let res=await httpAxios.get('/api/current');
        setdata(res);

    }
    catch(e){
        console.log(e.message)
    }
}
console.log(data.data)

useEffect(()=>{

fun();
},[])
    // let {name,email,tokons}=data;
  return (
    <div className='mt-2 flex item-center justify-center flex-col'>
        
<h1>contact</h1>
    {/* <h1>{data.data[0].name}</h1> */}
    {/* <h1>{data.data[0].email}</h1>
     <h1>{data.data[0].password}</h1> */}
   {/* <h1>{data.data[0].tokons[0]}</h1> */}

     </div>
  )
}

export default Conact
