// import React from 'react'
import { assets } from "../assets/assets"
import { useNavigate } from "react-router-dom"
function Navbar() {
    const navigate = useNavigate()
  return (
    <div className="w-full flex justify-between items-center bg-gray-800 p-4 text-white sm:px-24 absolute top-0">
      <img src={assets.logo} alt="" className="w-28" />
      <button onClick={() =>navigate("/login")} 
       className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2
        text-black-800 hover:bg-green-100 transition-all">Login <img src={assets.arrow_icon} alt="" /></button>
    </div>
  )
}

export default Navbar
