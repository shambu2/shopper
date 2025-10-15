"use client"
import { signOut,useSession } from "next-auth/react";

const page = () => {
    
  return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
          <div className="bg-white shadow-md px-8 py-4 flex justify-center items-center rounded-2xl text-center">
            
            <button
              onClick={() => signOut({
                callbackUrl: '/'
              })}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
  )
}

export default page