// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
// import {NextResponse, NextRespose} from "next/server";

// const isProtectedRoutes = createRouteMatcher(["/dashboard(.*)","/editor(.*)"]);

// export default clerkMiddleware(async (auth, req)=>{
//   const {userId} =await auth();
//   if(!userId && isProtectedRoutes(req)){
//     const {redireetToSignIn } =await auth();
//     return redireetToSignIn();
//   }
//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };


import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server'; // Also fixed typo: removed 'NextRespose'

const isProtectedRoutes = createRouteMatcher([
  "/dashboard(.*)",
  "/editor(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth(); // ✅ Correct function here

  if (!userId && isProtectedRoutes(req)) {
    return redirectToSignIn(); // ✅ Use it directly
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
