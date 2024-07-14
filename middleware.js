// it is a servercomponents

import { NextRequest, NextResponse } from 'next/server'
  export function middleware(request) {

    // for ascess tokon in next request.cookies.get('jwt')
    const authtokon= request.cookies.get('jwt');
    // console.log(authtokon)

    // **** authtokon tokon e pabo jakhan   matcher: ['/api/:path','/signin','/login','/about']
    // ae pecific page user jaba

    //  console.log('middle wear run',authtokon);

//**  ae 2 url a req korla return hoa jaba (fronteed to backend post req korla retun 
// hoab mean value asba) must na hola sing or logibn hoba na ***\\

    if(request.nextUrl.pathname==='/api/signin' || request.nextUrl.pathname==='/api/login' || request.nextUrl.pathname==='/api/current'){
      return ;
    }

//     // if user signin or login paga achana ki
    let LoginUserCantaxcesPage= request.nextUrl.pathname ==='/signin' || request.nextUrl.pathname==='/register'
    // if login  or reg paga acha
 if(LoginUserCantaxcesPage){
      // axcess private route (aut tonon acha means login user sa casa)
     if(authtokon){
  return NextResponse.redirect(new URL('/about ', request.url))
    }
     
  } 
      // if login  or reg paga acha nai anno paga jaba
else{ 
  // axcesing sequre route but not login user
if(!authtokon){
// authenticate noi but axcess korcha auth page
if(request.nextUrl.pathname.startsWith('/api')){
  return NextResponse.json({
    mess:"axcess deny",
    success:false
  })
}


        return NextResponse.redirect(new URL('/register', request.url))
      }
     }
//   }
   
  
  
 }
// See "Matching Paths" below to learn more where i want to authnticate 
export const config = {

  matcher: ["/","/signin","/api/:path*","/about","/register"]
}