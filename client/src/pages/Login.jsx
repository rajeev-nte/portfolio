// import React from 'react'
// import  { useState } from "react";
import { useContext, useState } from "react"
import { assets } from "../assets/assets"
import {  useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext.jsx"
import axios from "axios"
import { toast } from 'react-toastify'

const Login = () => {

  const Navigate = useNavigate()

  const {backendUrl, setIsLoggedin, getUserData} = useContext(AppContext)

  const [state, setState] = useState("Sign Up")
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    try {

      axios.defaults.withCredentials = true  // send cookie also

      if(state === 'Sign Up'){
        const {data} = await axios.post(backendUrl + '/api/auth/register', {name, email, password})

        if(data.success){
          setIsLoggedin(true)
          getUserData()
          Navigate('/')
        }else{
          toast.error(data.message)
        }
      }else{
         const {data} = await axios.post(backendUrl + '/api/auth/login', {email, password})

        if(data.success){
          setIsLoggedin(true)
          getUserData()
          Navigate('/')
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img onClick={()=>Navigate('/')} src={assets.logo} alt="" className="absolute left-5 sm:left-20 top-5 w-28 sm:w32 cursor-pointer" />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg sm:w-96 w-full top-5 text-indigo-300 text-sm">

        <h2 className="text-3xl font-semibold text-white text-center mb-3 ">{state === "Sign Up" ?"Create account" : "Login "}</h2>

        <p className="text-center text-sm mb-6">{state === "Sign Up" ?"Create your account" : "Login to your account"}</p>
        <form onSubmit={onSubmitHandler}>  
          {state === 'Sign Up' && (
            <div className=" mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]  ">
            <img src={assets.person_icon} alt="" />
            <input
            onChange={e => setName(e.target.value)}
            value={name}
             className="outline-none bg-transparent" type="text" placeholder="Full name " required/>
          </div>)}
          
          <div className=" mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]  ">
            <img src={assets.mail_icon} alt="" />
            <input
            onChange={e => setEmail(e.target.value)}
            value={email} 
            className="outline-none bg-transparent" type="email" placeholder="Email id " required/>
          </div>
          <div className=" mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]  ">
            <img src={assets.lock_icon} alt="" />
            <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            className="outline-none bg-transparent" type="password" placeholder="password " required/>
          </div>
          <p onClick={()=>Navigate('/reset-password')} className="mb-4 text-indigo-500 cursor-pointer">Forgot password</p>
          <button type="submit" className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">{state}</button>
        </form>

        {state === 'Sign Up' ? ( <p className="text-gray-400 text-center text-xs mt-4 ">Already have an account?{' '}
          <span onClick={()=>setState('Login')} className="text-blue-400 cursor-pointer underline"> Login here</span>
        </p>)

         : (<p className="text-gray-400 text-center text-xs mt-4 ">Don't have an account?{' '}
            <span onClick={()=>setState('Sign Up')} className="text-blue-400 cursor-pointer underline">Sing up </span>
        </p>)}
      </div>
    </div>
  )
}

export default Login
