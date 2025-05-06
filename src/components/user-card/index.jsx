import React from 'react'

const UserCard = ({ name, listeners, icon }) => {
    const [liked, setLiked] = React.useState(false)
    const handleLike = () => {
        setLiked(!liked)
    }
    return (
        <div className="bg-[#111] p-4 rounded-xl flex items-center gap-4 border border-[#222]">
            <span className="text-2xl">{icon}</span>
            <div>
                <h2 className="font-semibold text-white flex items-center gap-2">
                    {name}
                    {liked && <span className="text-green-400 text-sm">• Liked</span>}
                </h2>
                <p className="text-sm text-gray-400">{listeners} monthly listeners</p>
            </div>
            {!liked && (
                <button className="ml-auto bg-blue-600 hover:bg-green-400 hover:text-black text-white px-4 py-1 rounded-full cursor-pointer" onClick={handleLike}>
                    Like
                </button>
            )}
        </div>
    )
}

export default UserCard