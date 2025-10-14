"use client"
import Navbar from '@/components/Navbar'
import axios from 'axios'
import React, { useState } from 'react'
// import {signIn} from "next-auth/react"
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useCart } from '@/app/context/page'


const page = () => {
  const {cart} = useCart()
  const [form,setForm] = useState<any>({
    
    fullName:'',
    phone:'',
    street:'',
    city:'',
    state:'',
    zip:'',
    country:'',
    
  })

const handleChange = (e:any)=>{
  setForm({...form,[e.target.name]:e.target.value})
}

const handleSubmit = async(e:any)=>{
  e.preventDefault();
  const res = await axios.post('http://localhost:3000/api/placeorder',{form,cart})
  if (res.status === 200){
    // alert('Address added successfully')
    return <div>Address added successfully</div>
  }
}

  return (
    <div>
        <Navbar/>
        <div className='flex justify-center items-center'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-96'>
          {Object.keys(form).map((key)=>(
            <input
            key={key}
            name={key}
            placeholder={key}
            value={form[key]}
            onChange={handleChange}
            className='border p-2 rounded'
            
            />
          ))}
          
          <button type='submit' className='bg-white text-black p-2 rounded'>
            Save address
          </button>
          
          
        </form>
        </div>
    </div>
  )
}

export default page