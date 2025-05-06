import React from 'react'
import './playlist.css'
import avatar from "../../assets/avatar.jpeg"

const PlaylistBanner = () => {
    const tags = ["Pop", "Rock", "Hip-Hop", "Jazz", "Classical"]
    return (
        <div className='banner'>
            <div className="text-left lg:w-[60%]">
                <div className="playlist-holder max-w-full w-full lg:w-2/3 p-5 rounded-md">
                    <p className="text-white text-[22px]">Gym playlist 69</p>
                    <p className='text-[#8b8b8b] text-sm my-2'>Describe the ideal listening scenario for this playlist. How does it make you feel?</p>

                    <div className="flex justify-start items-center gap-3">
                        <img src={avatar} className='w-8 h-8 rounded-full object-cover' alt="" />
                        <p className='text-[#a8a8a8]'>User3432</p>
                    </div>

                    <div className="mt-4">
                        <div className="flex flex-wrap justify-start items-center gap-2 mt-2">
                            {
                                tags.map((tag, index) => (
                                    <span key={index} className='tag hover:bg-gray-300 cursor-pointer text-sm bg-white inline-flex justify-center items-center min-w-11 px-3 rounded-full h-4.5 text-black'>{tag}</span>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistBanner