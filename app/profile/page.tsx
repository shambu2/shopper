"use client"
import React from 'react'
import { signIn, useSession } from 'next-auth/react'
const page = () => {
    // const {data: session} = useSession();
  return (
    <button onClick={()=>signIn("google")}>sign in with google</button>
  )
}

export default page