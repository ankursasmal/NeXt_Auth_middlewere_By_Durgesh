'use client'

import React, { useEffect, useState } from 'react'
 import { httpAxios } from '@/db/httpaxios';
import { createContext } from 'react';
const UserContext =createContext();
   
function UserProvider({children}) {
  let [user,setuser]=useState(undefined);

//******** */ middle wear page through ka ka axcess korba and current through 
// current user detail pao jaba *********

async function fun(){
  try{
 let data=await httpAxios.get('/api/current');
//  console.log(data)
 //******* full detail of user ******
// console.log('uscontext data',data)

// *********so we need to destructure it to pass only data (data.data) ************
 setuser(data.data);
   }
  catch(e){
    console.log(e.message)
    setuser(undefined)
  }
}
useEffect(()=>{
fun()
},[])

// console.log('user',user)

  return (
     <UserContext.Provider value={{user,setuser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;
export {UserContext}
 