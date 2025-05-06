import React from 'react'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import "./header.css"

const Header = ({ handleMobileSidebar }) => {
    return (
        <div className='py-5'>
            <div className="w-[95%] mx-auto bg-[#0D0D0D] p-6 rounded-[20px] flex flex-col gap-4">
                <div className="flex xl:flex-row flex-col justify-between xl:items-center gap-3">
                    <div className="flex justify-start items-center gap-4">
                        <button className='lg:hidden block'>
                            <FaBars className='text-[#ffffff9c] text-2xl' onClick={handleMobileSidebar} />
                        </button>
                        <Link to="/" className='logo'>
                            Sidechayn.com
                        </Link>
                    </div>
                    <form action="" className='search-wrapper'>
                        <input type="text" className='search-field' placeholder='search...' name="" id="" />
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Header