'use client'

 import Link from 'next/link'
 import { useContext } from 'react'
import { UserContext } from '@/context/UserProviers';
import { httpAxios } from '@/db/httpaxios';

function Nav() {
  let contextApiData=useContext(UserContext);
  // console.log(contextApiData)
  // it is an object-> contextApiData
//  ***** logout ola o responce ascha tai logina and signup dispaly hocha



  let LogoutUser = async function () {
    try {
        let result = await httpAxios.get('/api/logout');
        console.log(result.data); // This will log the response data from the server
        if (result.data.success) {
            console.log('Logout successful'); // Assuming your server responds with a 'success' field
        } else {
            console.log('Logout not successful');
        }
    } catch (e) {
        console.log('Error during logout:', e.message);
    }
}


  return (
    <div className='flex items-center justify-between text-center bg-blue-600 py-1.5 px-3'>
    {contextApiData.user &&(
    <>     
    <Link href='/'> <a>Home</a></Link>
      <div className='flex items-center '> 
     
      <Link href='/about' className='pr-3'>  About</Link> 
      <Link href='/contact'> Contact</Link>
      </div>
      </>)}

      { !contextApiData.user &&
       (<> 
       <div className='flex items-center '> 

      <Link href='/signin' className='pr-3'>   Login</Link>
      <Link href='/register'> SignUp</Link>
    </div>
    </>)      
       
  }

            { contextApiData.user &&
       (<> 
       <div className='flex items-center '> 

      <Link href='/signin' className='pr-3'>   Login</Link>
      <Link href='/register'> SignUp</Link>
    </div>
    </>)      
       
  }   
    <div>
    {contextApiData.user &&(
        <>
    <button  onClick={LogoutUser} className='pr-3'>Logout</button>
    </>)}

    </div>
    </div>
  )
}

export default Nav
