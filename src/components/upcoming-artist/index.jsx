import React from 'react'
import genresImg from "../../assets/genres.jpg"

const UpcomingArtist = () => {
    return (
        <div className="mt-4">
            <div className="flex hover:bg-gray-700 cursor-pointer justify-start items-center gap-3 bg-[#0a0a0a] p-2 rounded-[20px]">
                <img src={genresImg} className='w-[75px] rounded-[14px]' alt="" />
                <div className="content">
                    <p className="text-lg text-white">
                        Hannah Montana
                    </p>
                    <p className="text-xs flex justify-start items-center gap-3 flex-wrap">
                        <span className="text-white">EDM</span>
                        <div className="dot w-[5px] h-[5px] bg-white rounded-full"></div>
                        <span className="text-[#79787b]">📍Sydney</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UpcomingArtist