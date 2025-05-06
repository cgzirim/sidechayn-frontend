import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

// import dotsIcon from "../../assets/dots.png"
import artist from "../../assets/artist.jpg"

import i1 from "../../assets/i1.webp"
import i2 from "../../assets/i2.webp"
import i3 from "../../assets/i3.webp"
import i4 from "../../assets/i4.webp"
import download from "../../assets/download.png"

import cover from "../../assets/cover.jpg"
import Tabs from '../tabs'

import "./contents.css"
import MoodModal from '../modals/mood-modal'
import TagsModal from '../modals/tags'

const Contents = ({ bar }) => {
    const [shares, setShares] = React.useState(0)
    const [likes, setLikes] = React.useState(0)
    const [views, setViews] = React.useState(0)
    const [saves, setSaves] = React.useState(0)


    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => {
        setIsOn(prev => !prev);
    };

    const [moodVisible, setMoodVisible] = useState(false);
    const handleMoodClose = () => {
        setMoodVisible(false);
    }
    const [tagVisible, setTagVisible] = useState(false);
    const handleTagClose = () => {
        setTagVisible(false);
    }

    // const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='pb-0 md:pb-10'>
            <div className="flex justify-between items-center gap-2">
                <h2 className='text-lg text-white'>
                    TrueFidelity® Mode?
                </h2>

                <div
                    onClick={toggleSwitch}
                    className={`flex hover:scale-[1.01] hover:text-white transition-[0.3s] items-center px-2 py-1 rounded-[40px] cursor-pointer transition-all duration-300 ${isOn ? "bg-blue-500" : "bg-[#0e0e0e]"
                        }`}
                >
                    {/* Dynamic order */}
                    {isOn ? (
                        <>
                            <span className="text-[#ffffff9c] uppercase font-bold">ON</span>
                            <div className="w-[20px] h-[20px] bg-white rounded-full ml-2 transition-all duration-300"></div>
                        </>
                    ) : (
                        <>
                            <div className="w-[20px] h-[20px] bg-[#757575] rounded-full mr-2 transition-all duration-300"></div>
                            <span className="text-[#ffffff9c] uppercase font-bold">OFF</span>
                        </>
                    )}
                </div>
            </div>


            {/* music player */}
            <div className="music-player xl:p-10 p-5 rounded-[30px] bg-[#0c0c0c] mt-5">
                <div className="flex jusitify-center items-center gap-5">
                    <FaChevronLeft className='text-[#ffffff9c] hover:text-white text-2xl' />
                    <div className={`music-player-item ${!bar && "z-[-1]"}`}>
                        <img loading="lazy" src="https://cdn.prod.website-files.com/66b1e34f1cccd77056bac6df/67a6016f02644c24ae599d2a_wave.svg" alt="" className="custom-img-opacity" />
                        <div className="music-timeline-wraper">
                            <div className="music-player-timeline">
                            </div>
                            <div className="music-player-timeline is-playing"></div>
                        </div>
                    </div>

                    <FaChevronRight className='text-[#ffffff9c] hover:text-white text-2xl' />
                </div>

                <div className="text-center xl:text-sm text-xs mt-3 text-[#555550]">
                    (Hover your mouse here and scroll to change tracks quickly)
                </div>


                <div className="flex xl:flex-row flex-col justify-between items-center gap-5 mt-10">
                    <div className="w-full xl:w-2/3">
                        <div className="flex justify-start items-center gap-6">
                            <h2 className='text-[#e4e2e7] font-normal text-[25px]'>I Love Gambling</h2>

                            <div
                                className="relative inline-block text-left group"
                            >
                                <button
                                    type="button"
                                    className="text-[#ffffff9c] pt-3 text-xl lg:mr-12 hover:text-white focus:outline-none"
                                >
                                    {/* <FaDownload /> */}
                                    <img src={download} alt="" className='w-[25px] h-[25px]' />
                                </button>

                                <div
                                    className="absolute mt-2 w-32 rounded-md shadow-lg bg-[#1e1e1e] ring-1 ring-black ring-opacity-5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                                >
                                    <div className="py-1 flex flex-col">
                                        <Link
                                            to="/download"
                                            className="block px-4 py-2 text-sm text-white hover:bg-[#2c2c2c]"
                                        >
                                            Download
                                        </Link>
                                        <Link
                                            to="/share"
                                            className="block px-4 py-2 text-sm text-white hover:bg-[#2c2c2c]"
                                        >
                                            Share
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="flex my-8 justify-start items-center gap-3">
                            <img src={artist} alt="" className='w-[48px] h-[48px] rounded-full' />
                            <div className="right">
                                <h3 className='text-white raleway text-[15px]'>JackWorby</h3>
                                <p className='text-[13px] text-[#969597]'>Uploaded 5 days ago</p>
                            </div>
                        </div>

                        <div className="flex flex-start flex-wrap gap-2 mt-10">
                            <div className="bg-[#0e0e0e] px-3 py-1 rounded-[40px]">
                                <span className='text-white text-sm'>5.5K</span>
                            </div>
                            <button onClick={() => setShares(shares + 1)} title='Shares' className="cursor-pointer bg-[#0e0e0e] hover:bg-[#353535] px-3 py-1 rounded-[40px] flex justify-center items-center gap-2 border border-[#353535]">
                                <img src={i1} alt="" className='w-[19px] h-[19px]' />
                                <span className='text-[#ffffff9c] text-sm'>{shares}</span>
                            </button>
                            <button onClick={() => setLikes(likes + 1)} title='likes' className="cursor-pointer bg-[#0e0e0e] hover:bg-[#353535] px-3 py-1 rounded-[40px] flex justify-center items-center gap-2 border border-[#353535]">
                                <img src={i2} alt="" className='w-[19px] h-[19px]' />
                                <span className='text-[#ffffff9c] text-sm'>{likes}</span>
                            </button>
                            <button onClick={() => setViews(views + 1)} title='views' className="cursor-pointer bg-[#0e0e0e] hover:bg-[#353535] px-3 py-1 rounded-[40px] flex justify-center items-center gap-2 border border-[#353535]">
                                <img src={i3} alt="" className='w-[19px] h-[19px]' />
                                <span className='text-[#ffffff9c] text-sm'>{views}</span>
                            </button>
                            <button onClick={() => setMoodVisible(true)} title='saves' className="cursor-pointer bg-[#0e0e0e] hover:bg-[#353535] px-3 py-1 rounded-[40px] flex justify-center items-center gap-2 border border-[#353535]">
                                <img src={i4} alt="" className='w-[19px] h-[19px]' />
                                <span className='text-[#ffffff9c] text-sm'>{saves}</span>
                            </button>
                        </div>
                    </div>

                    <div className="w-full xl:w-1/3">
                        <img src={cover} className='xl:w-full w-2/3 mx-auto' alt="" />
                    </div>
                </div>
            </div>


            <div className="tabs bg-[#0c0c0c] mt-5 xl:p-6 p-2 rounded-[30px]">
                <Tabs setTagVisible={setTagVisible} />
            </div>

            {
                moodVisible && <MoodModal handleClose={handleMoodClose} />
            }
            {
                tagVisible && <TagsModal handleClose={handleTagClose} />
            }
        </div>
    )
}

export default Contents