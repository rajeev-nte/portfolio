import { assets } from "../assets/assets"


function Header() {
  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      <img  src={assets.header_img} alt="" className="w-36 h-36 rounded-full mb-6 " />
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">hey developer <img src={assets.hand_wave} alt="" /></h1>
      <h2>welcome to our app</h2>
        <p>We are glad to have you here. Explore our features and enjoy your experience.</p>
        <button>Get started</button>
    </div>
  )
}

export default Header
