import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import homeIcon from "../../assets/home.svg"
import exploreIcon from "../../assets/explore.svg"
import savedTracksIcon from "../../assets/saved-tracks.png"
import achievementsIcon from "../../assets/achievements.png"
import settingsIcon from "../../assets/settings.png"
import AnimatedButton from '../animated-button'
import userAvatar from "../../assets/user-avatar.jpg"

import "./left-sidebar.css"
import { FaChevronLeft } from 'react-icons/fa'

const LeftSidebar = ({ loggedIn, bar, handleBar, setBar, setModalVisible, handleClick, handleMobileSidebar,
    handleComingSoonClick,
    handleComingSoonClose }) => {

    const menuItems = [
        {
            name: "Home",
            icon: homeIcon,
            link: "/"
        },
        {
            name: "Explore",
            icon: exploreIcon,
            link: "/explore"
        },
        {
            name: "Saved Tracks",
            icon: savedTracksIcon,
            // link: "/saved-tracks"
            action: handleComingSoonClick
        },
        {
            name: "Achievements",
            icon: achievementsIcon,
            // link: "/achievements"
            action: handleComingSoonClick
        },
        {
            name: "Settings",
            icon: settingsIcon,
            // link: "/settings"
            action: handleComingSoonClick
        }
    ]
    return (
        <div className='px-4 py-5'>
            {
                loggedIn ?

                    <div className='flex justify-start items-center gap-3'>
                        <button className='lg:hidden block mr-5' onClick={handleMobileSidebar}>
                            <FaChevronLeft className='text-[#ffffff9c] text-2xl' />
                        </button>
                        <Link to={"/profile"} className='flex justify-start items-center gap-3 flex px-1 py-2' onClick={handleMobileSidebar}>
                            {/* back button */}

                            <img src={userAvatar} className='w-[50px] h-[50px] rounded' alt="" />
                            <span>Jack Wordby</span>
                        </Link>
                    </div> :
                    <>
                        <button className='lg:hidden block mr-5' onClick={handleMobileSidebar}>
                            <FaChevronLeft className='text-[#ffffff9c] text-2xl' />
                        </button>
                        <p className='register-button cursor-pointer mt-5 flex justify-center items-center flex-col px-1 py-2' onClick={() => setModalVisible(true)}>
                            <span>Register / Login <br /></span>
                            <span className='text-[9px]' style={{ letterSpacing: "2px" }}>Join 12 New Users This Week</span>
                        </p>
                    </>

            }

            <div className="line bg-[#eeedf22e] h-[2px] my-6"></div>

            <ul className='flex flex-col gap-2'>
                {
                    menuItems.map((item, index) => (
                        <li key={index}>
                            {
                                item.link ? <NavLink onClick={handleMobileSidebar} to={item.link} className="text-sm sidebar-link text-[#000] block py-2 px-4 hover:bg-[#202020] transition duration-300 ease-in-out">
                                    <span className='flex items-center justify-start gap-3'>
                                        <img src={item.icon} className={`home-icon max-w-full w-4  ${index === 4 ? '' : 'opacity-60'} ${index <= 1 ? 'invert' : ''}`} alt="" />
                                        <span className='text-white'>{item.name}</span>
                                    </span>
                                </NavLink> : <button onClick={item.action} className="text-sm w-full cursor-pointer sidebar-link text-[#000] block py-2 px-4 hover:bg-[#202020] transition duration-300 ease-in-out">
                                    <span className='flex items-center justify-start gap-3'>
                                        <img src={item.icon} className={`home-icon max-w-full w-4  ${index === 4 ? '' : 'opacity-60'} ${index <= 1 ? 'invert' : ''}`} alt="" />
                                        <span className='text-white'>{item.name}</span>
                                    </span>
                                </button>
                            }
                        </li>
                    ))
                }
            </ul>


            {/* fyi */}
            <div className="fyi mt-14 card border border-[#828282] p-3 rounded-[20px]">
                <h2 className='text-[22px] font-bold italic'>
                    FYI!
                </h2>

                <p className="text-xs">
                    Sidechayn is in beta development and will not be released to the public until May 2025.
                    ‍<br /><br />
                    <Link to="/privacy-policy" className='text-[#fff] hover:underline'>
                        <b>Click here</b> to see upcoming features & report bugs / issues.
                    </Link>
                </p>
            </div>


            {loggedIn && <AnimatedButton bar={bar} handleBar={handleBar} setBar={setBar} handleClick={handleClick} />}
        </div>
    )
}

export default LeftSidebar