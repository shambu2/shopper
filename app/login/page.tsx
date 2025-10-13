"use client"

import { signIn,useSession } from "next-auth/react"
import { redirect } from "next/navigation";

const page = () => {
    const {data: session } = useSession();
  if(session){
    redirect('/cart/checkout')
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md p-8 rounded-2xl text-center">
        <h1 className="text-2xl font-semibold mb-6">Welcome Back</h1>
        <button
          onClick={() => signIn("google", { callbackUrl: '/cart/checkout' })}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default page