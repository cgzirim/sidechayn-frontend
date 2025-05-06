import React from 'react'
import genresImg from "../../assets/genres.jpg"
import "./liked-song.css"

const LikedSong = () => {
    return (
        <div className="flex hover:bg-gray-200 hover:scale-[1.03] transition-all duration-200 mt-4 upcoming-music-item justify-between items-center p-3">
            <img src={genresImg} className='w-[65px]' alt="" />
            <div className="text-center min-w-[200px]">
                <p className="text-lg">
                    Blah black
                </p>
                <p className="text-gray-400 text-sm">Kidd G</p>
            </div>
            <div className="music-player-item pr-10">
                <img loading="lazy" src="https://cdn.prod.website-files.com/66b1e34f1cccd77056bac6df/67a6016f02644c24ae599d2a_wave.svg" alt="" className="custom-img-opacity" />
                <div className="music-timeline-wraper">
                    <div className="music-player-timeline">
                    </div>
                    <div className="music-player-timeline is-playing"></div>
                </div>
            </div>
        </div>
    )
}

export default LikedSong