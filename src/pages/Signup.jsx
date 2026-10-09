import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [showPass ,setShowPass] = useState(false)
    const [formData, setFormData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : "",
    })

    const navigate = useNavigate()

    const handleChange = (e)=>{
        const {name , value} = e.target;

        setFormData((prev)=>({
            ...prev,
                [name] : value
            
            
        }))
    }


    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(formData)

        try{
            const res = await axios.post(`${import.meta.env.VITE_URL}/api/user/add`,formData)
            if(res.data.success){
                navigate("/login")
            }


        }catch(error){
            console.log(error.res?.data)
        }
       
    }
  return (
   <div className='flex justify-center items-center min-h-screen bg-pink-100'>
<div className="w-full max-w-sm bg-white p-6 border border-default rounded-base shadow-xs">
  <form onSubmit={handleSubmit}>
    <h5 className="text-xl font-semibold text-heading mb-6">
      Create your Account
    </h5>
    <div className='grid grid-cols-2 gap-1.5'>
         <div className="mb-4">
      <label
        htmlFor="First Name"
        className="block mb-2.5 text-sm font-medium text-heading"
      >
        First Name
      </label>
      <input
      onChange={handleChange}
        type="text"
        id="text"
        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
        placeholder="First Name"
        required=""
        name='firstName'
      />
    </div>

        <div className="mb-4">
      <label
        htmlFor="Last Name"
        className="block mb-2.5 text-sm font-medium text-heading"
      >
        Last Name
      </label>
      <input
       onChange={handleChange}
        type="text"
        id="text"
        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
        placeholder="Last Name"
        required=""
        name='lastName'
      />
    </div>

    </div>
    <div className="mb-4">
      <label
        htmlFor="email"
        className="block mb-2.5 text-sm font-medium text-heading"
      >
        Your email
      </label>
      <input
       onChange={handleChange}
        type="email"
        id="email"
        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
        placeholder="example@company.com"
        required=""
        name='email'
      />
    </div>
    <div>
      <label
        htmlFor="password"
        className="block mb-2.5 text-sm font-medium text-heading"
      >
        Your password
      </label>
      <div className='relative'>
          <input
           onChange={handleChange}
        type={showPass ? "text" :"password"}
        id="password"
        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
        placeholder="•••••••••"
        required=""
        name='password'
        
           
        
      />
       {showPass ? <EyeOff onClick={()=>setShowPass(false)} className='w-5 h-5 text-gray-500 absolute right-5 bottom-2'/> 
        :<Eye onClick={()=>setShowPass(true)} className='w-5 h-5 text-gray-500 absolute right-5 bottom-2'/>}
      </div>
    
    </div>
  
    <button
      type="submit"
      className="text-white bg-blue-600 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none w-full mb-3 mt-2"
    >
      Signup
    </button>
    <div className="text-sm font-medium text-body">
      You Have Already Account{" "}
      <Link to={"/login"} className="text-red-500 hover:underline">
        Login?
      </Link>
    </div>
  </form>
</div>

   </div>
  )
}

export default Signup
