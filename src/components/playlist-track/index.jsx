import React from 'react'
import { Link } from 'react-router-dom'

const PlaylistTrack = ({ track, key }) => {
    return (
        <Link to={`/playlist/${track.id}`} className="flex transition-[0.3s] hover:scale-[1.02] justify-start items-center gap-3 bg-[#0c0c0c] rounded-[30px] p-4">
            <div className="content flex justify-between items-center w-full">
                <div className="left flex justify-start items-center gap-3">
                    <div className="item text-center">
                        💎 <br />
                        <span className='text-[#ffffff9c]'>{track.type}</span>
                    </div>
                    <img src={track.albumArt} alt="" className='w-[60px] h-[60px] rounded-[30px]' />
                    <div className="text-left">
                        <h2 className='text-white text-sm'>{track.title}</h2>
                        <p className='text-[#ffffff9c] text-xs'>{track.artist}</p>
                    </div>
                </div>
                <div className="right flex justify-end items-center gap-4 lg:gap-20">

                    <div className="hidden lg:flex justify-start items-center gap-3">
                        <img src={track.userIcon} alt="" className='w-6 h-6 object-cover rounded-full' />
                        <p className='text-sm'>
                            {track.userName}
                        </p>
                    </div>
                    <span className='text-white text-sm'>{track.time}</span>
                    <span className='text-white text-sm'>✨{track.saves}</span>
                </div>
            </div>
        </Link>
    )
}

export default PlaylistTrack