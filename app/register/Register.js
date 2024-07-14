//  it is use as client side components
    'use client'
    import { httpAxios } from '@/db/httpaxios';
import { useRouter } from 'next/navigation';
    import React, { useState } from 'react'
    
    function Register() {
     let route= useRouter();

    let [formData,setFormData]=useState({name:"",email:"",pass:"",cpass:""})
    
    let handleSignup=async(e)=>{
        try{
    e.preventDefault();
    if(formData.name=="" ||formData.email=="" ||formData.pass=="" || formData.cpass=="" ){
    console.log('fill the form');
    window.alert('data not fill properly')
    }

 if(formData.pass == formData.cpass){
      
     let data= await  httpAxios.post('/api/login',formData);
 
 //  *********************
      // in fetch api a res.json() must because the fetch API doesn't automatically parse the response body for you.
      // ******res.json() not req nt work in nextjs

// ********************************

       
window.alert('reg succ frontende');
console.log(data)
    setFormData({name:"",email:"",pass:"",cpass:""});
    
    // for navigate useRouter
    route.push('/signin');
        
      }
      else{
        window.alert('pass not match')
      }
    }
        catch(e){
            console.log('not regestre')
            console.log(e)
        }
    
    }
      return (
        <div className='flex items-center justify-center flex-col pt-19'>
        <h1>Sign Up</h1>
        <form method='POST' action='/register' onSubmit={handleSignup}  className='flex flex-col p-2 shadow-xl w-[60vw]'>
          <label htmlFor="name">Name</label>
          <input type="text" className='py-3 border-[1px] border-black' name="name" id="name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} value={formData.name} />
          
          <label htmlFor="email">Email</label>
          <input className='border-[1px] border-black' id="email" name="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} />
          
          <label htmlFor="password">Password</label>
          <input className='border-[1px] py-3 border-black' id="password" name="pass" type="password" onChange={(e) => setFormData({ ...formData, pass: e.target.value })} value={formData.pass} />
          
          <label htmlFor="cpassword">Confirm Password</label>
          <input className='border-[1px] py-3 border-black' id="cpassword" name="cpass" type="password" onChange={(e) => setFormData({ ...formData, cpass: e.target.value })} value={formData.cpass} />
          
          <div className='flex items-center justify-center text-center pt-2'>
            <button type='submit' className='rounded-lg px-2 py-[2px] border-[1px] border-black'>Submit</button>
            <button  className='rounded-lg px-2 py-[2px] border-[1px] border-black' onClick={(e)=>{e.preventDefault();setFormData({...formData,
          name: "",
          email: "",
          pass: "",
          cpass: ""
        });
    
            }}>reset</button>
    
          </div>
        </form>
      </div>
      )
    }
    
     
export default Register
