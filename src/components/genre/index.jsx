import React from 'react'

import genresImg from "../../assets/genres.jpg"

const Genre = () => {
    return (
        <div className="item h-[100px] overflow-hidden relative rounded-[20px] transition-[0.3s] hover:scale-[1.02] cursor-pointer">
            <img src={genresImg} className='w-full h-[100px] object-cover' alt="" />
            <div className="blur-holder">
                <div className="blur"></div>
                <div className="text-block">EDM</div>
            </div>
        </div>
    )
}

export default Genre