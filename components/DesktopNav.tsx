import { Handbag, MenuIcon, SearchIcon, UserIcon } from 'lucide-react'
import React from 'react'

const DesktopNav = () => {
    const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className="flex gap-2 justify-between items-center px-10 border-b h-20">
      <div className="flex items-center gap-2 h-20">
        <svg fill="none" height="60" viewBox="0 0 32 32" width="60">
          <path
            clipRule="evenodd"
            d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
        <p className="text-xl font-semibold text-nowrap">Forever 21</p>
      </div>
      <div className="hidden md:flex">
        <ul className="flex items-center font-semibold lg:gap-10 md:gap-5 list-none text-nowrap">
          <li>Home</li>
          <li>Collection</li>
          <li>About</li>
          <li>Contact</li>
          <li className=" ">Admin Panel</li>
        </ul>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex gap-5 ">
          <SearchIcon />
          <UserIcon />

          <Handbag />
        </div>
        <div className="md:hidden" onClick={()=>setIsOpen(!isOpen)}>
          <MenuIcon className="cursor-pointer"/>

        </div>
      </div>
    </div>
  )
}

export default DesktopNav