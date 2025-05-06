import React from 'react'
import closeIcon from "../../assets/close.svg"
import plusIcon from "../../assets/plus.svg"
import { Link } from 'react-router-dom'
import dragIcon from "../../assets/drag.svg"

const SongCard = ({ item, deleteItem }) => {
    return (
        <div className="flex justify-between items-center gap-3 hover:bg-gray-900 px-4 py-2 cursor-pointer rounded-[10px]">
            <div className="flex justify-start items-center gap-3">
                <img src={dragIcon} alt="" className='w-[20px] invert cursor-grab' />
                <img src={item.image} alt="" className='w-[70px] h-[70px] rounded' />
                <div className="flex flex-col">
                    <h2 className='text-[#e4e2e7] font-normal'>{item.name}</h2>
                    <p className='text-[#ffffff9c] text-xs flex justify-start items-center gap-2 flex-wrap'>
                        {item.artist}
                        <div className="dot w-1 h-1 bg-[#ffffff9c] rounded-full"></div>
                        {item.trending && <span className='text-[#ffffff9c] text-xs'>️🔥 Trending</span>}
                    </p>
                    <p className='text-[#ffffff9c] text-sm text-center mt-2'>{item.publisher}</p>
                </div>
            </div>

            <div className="min-h-full flex flex-col justify-between items-center gap-4">
                <button onClick={() => deleteItem(item.id)} className='text-[#ffffff9c] text-sm'>
                    <img src={closeIcon} alt="" className='w-[13px] h-[13px]' />
                </button>
                <Link to={"/"} className='text-[#ffffff9c] text-sm hover:text-white hover:scale-110 transition-all duration-300'>
                    <img src={plusIcon} alt="" className='w-[13px] h-[13px]' />
                </Link>
            </div>
        </div>
    )
}

export default SongCard