import React, { useEffect, useState } from 'react'
import albumCover from "../../assets/album-cover.jpg"
import userAvatar from "../../assets/user-avatar.jpg"
// import AnimatedButton from '../animated-button'
import dotsIcon from "../../assets/dots.png"

import "./tabs.css"

const Tabs = ({ setTagVisible }) => {
    const [currentTab, setCurrentTab] = useState(1)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const songList = [
        {
            id: 1,
            points: "new",
            title: "Search Blah Black",
            artist: "Drake",
            user: "User3442",
            duration: "4:22"
        },
        {
            id: 2,
            points: "22",
            title: "Blah Black",
            artist: "Drake",
            user: "User3442",
            duration: "4:22"
        },
        {
            id: 2,
            points: "22",
            title: "Blah Black",
            artist: "Drake",
            user: "User3442",
            duration: "4:22"
        },
        {
            id: 2,
            points: "22",
            title: "Blah Black",
            artist: "Drake",
            user: "User3442",
            duration: "4:22"
        },
        {
            id: 2,
            points: "22",
            title: "Blah Black",
            artist: "Drake",
            user: "User3442",
            duration: "4:22"
        },
        {
            id: 2,
            points: "22",
            title: "Blah Black",
            artist: "Drake",
            user: "User3442",
            duration: "4:22"
        },
        {
            id: 2,
            points: "22",
            title: "Blah Black",
            artist: "Drake",
            user: "User3442",
            duration: "4:22"
        },
        {
            id: 2,
            points: "22",
            title: "Blah Black",
            artist: "Drake",
            user: "User3442",
            duration: "4:22"
        },
    ]

    const [searchedSongs, setSearchedSongs] = useState([])

    useEffect(() => {
        const filteredSongs = songList.filter((song) =>
            song.title.toLowerCase().includes("")
        )
        setSearchedSongs(filteredSongs)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // const handleSearch = (e) => {
    //     e.preventDefault()
    //     const searchValue = e.target.value

    //     const filteredSongs = songList.filter((song) =>
    //         song.title.toLowerCase().includes(searchValue.toLowerCase())
    //     )
    //     setSearchedSongs(filteredSongs)
    // }


    // comments
    const allComments = [
        {
            id: 1,
            userAvatar: userAvatar,
            userName: "User3442",
            comment: "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
            date: "5h ago",
            hearts: 25,
            thumbs: 5,
            replies: [
                {
                    id: 1,
                    userAvatar: userAvatar,
                    userName: "User3442",
                    comment: "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
                    date: "5h ago",
                    hearts: 25,
                    thumbs: 5,
                },
            ]
        },
        {
            id: 1,
            userAvatar: userAvatar,
            userName: "User3442",
            comment: "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
            date: "5h ago",
            hearts: 25,
            thumbs: 5,
            replies: [
                {
                    id: 1,
                    userAvatar: userAvatar,
                    userName: "User3442",
                    comment: "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
                    date: "5h ago",
                    hearts: 25,
                    thumbs: 5,
                }
            ]
        },
        {
            id: 1,
            userAvatar: userAvatar,
            userName: "User3442",
            comment: "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
            date: "5h ago",
            hearts: 25,
            thumbs: 5,
            replies: [
                {
                    id: 1,
                    userAvatar: userAvatar,
                    userName: "User3442",
                    comment: "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
                    date: "5h ago",
                    hearts: 25,
                    thumbs: 5,
                }
            ]
        },
    ]

    const [comments, setComments] = useState([])

    useEffect(() => {
        setComments(allComments)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // add new comment
    const addComment = (e) => {
        e.preventDefault()
        const newComment = e.target[0].value
        if (newComment.trim() === "") return
        setComments((prevComments) => [
            ...prevComments,
            {
                id: prevComments.length + 1,
                userAvatar: userAvatar,
                userName: "NewUser",
                comment: newComment,
                date: "Just now",
                hearts: 0,
                thumbs: 0,
            },
        ]);
        e.target[0].value = ""
    };


    const tags = ["Empowerment (311)",
        "Exciting (213)",
        "Inspirational (99)",
        "Sad (34)",
        "Anticipation (11)"]


    return (
        <div>
            <div className="tabs-wrapper bg-[#141414] p-3 rounded-[30px]">
                <div className="flex justify-between items-center gap-3">
                    <button onClick={() => setCurrentTab(1)} className={`tab-btn w-full cursor-pointer text-center py-3 rounded-full font-500 hover:bg-black ${currentTab === 1 ? 'bg-black' : ''}`}>
                        <span className='text-[#ffffff] text-sm'>More Like This</span>
                    </button>
                    <button onClick={() => setCurrentTab(3)} className={`tab-btn w-full cursor-pointer text-center py-3 rounded-full font-500 hover:bg-black ${currentTab === 3 ? 'bg-black' : ''}`}>
                        <span className='text-[#ffffff] text-sm'>Comments</span>
                    </button>
                </div>
            </div>

            {/* tab panes */}
            <div className="tab-panes mt-5 xl:p-6 p-2">
                {
                    currentTab === 1 && (
                        <div className="tab-pane">
                            <h2 className='text-[#ffffff] text-lg flex justify-start items-center gap-3'>
                                Tags
                                <img onClick={() => setTagVisible(true)} src="https://cdn.prod.website-files.com/66b1e34f1cccd77056bac6df/67d835d6780ecd4ce4d51cdc_image%20(5).webp" className='img w-7 h-7 cursor-pointer opacity-60 hover:opacity-100' alt="" />
                            </h2>

                            <div className="flex mt-3 justify-start items-center gap-6 flex-wrap">
                                {
                                    tags.map((tag, index) => (
                                        <span key={index} className={`grad-${index + 1} text-sm`}>{tag}</span>
                                    ))
                                }
                            </div>

                            <div className="mt-10">
                                <h2 className='text-[#ffffff] text-lg flex justify-start items-center gap-3'>
                                    Similar Songs
                                    <img onClick={() => setTagVisible(true)} src="https://cdn.prod.website-files.com/66b1e34f1cccd77056bac6df/67d835d6780ecd4ce4d51cdc_image%20(5).webp" className='img w-7 h-7 cursor-pointer opacity-60 hover:opacity-100' alt="" />
                                </h2>

                                <table className='table mt-5 w-full'>
                                    <tbody>
                                        {
                                            searchedSongs.map((item, index) => (
                                                <tr key={index} className='table-row hover:bg-[#1f1f1f] cursor-pointer hover:scale=[1.03] transition-all duration-300 ease-in-out'>
                                                    <td className='text-center pr-4 py-4'>
                                                        <span>💎</span> <br />
                                                        <span className='text-[#ffffff] text-sm'>{item.points}</span>
                                                    </td>
                                                    <td className='text-left py-4'>
                                                        <div className="flex justify-start items-center gap-3">
                                                            <img src={albumCover} className='w-[65px] h-[65px] rounded-[20px]' alt="" />
                                                            <div className="text">
                                                                <h2 className='text-[#ffffff] text-sm text-[17px]'>{item.title}</h2>
                                                                <p className='text-[#ffffff9c] text-[15px]]'>{item.artist}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='text-left py-4'>
                                                        <div className="flex justify-start items-center gap-3">
                                                            <img src={userAvatar} className='w-[35px] h-[35px] rounded-full' alt="" />
                                                            <div className="text">
                                                                <h2 className='text-[#a8a8a8] text-sm text-[15px]'>{item.user}</h2>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='text-left py-4'>
                                                        <p className='text-[#a8a8a8] text-[15px]'>{item.duration}</p>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }
                {
                    currentTab === 3 && (
                        <div className="tab-pane">
                            <form onSubmit={addComment} action="" className='search-wrapper w-full' style={{ width: "100%", marginTop: "15px" }}>
                                <input type="text" className='search-field text-sm' name="" placeholder='Write a comment' id="" />
                            </form>

                            <div className="comments mt-6">
                                {
                                    comments.map((item, index) => (
                                        <div key={index} className="flex justify-between items-start gap-4 my-8">
                                            <div className="flex justify-start items-start gap-3">
                                                <img src={item.userAvatar} className='w-[50px] h-[50px] rounded-full' alt="" />
                                                <div className="content">
                                                    <div className="flex justify-start items-center gap-3">
                                                        <h3 className='text-[22px] text-white'>{item.userName}</h3>
                                                        <div className="dot w-1.5 h-1.5 bg-[#686868] rounded-full"></div>
                                                        <h4 className='text-lg text-[#686868]'>{item.date}</h4>
                                                    </div>

                                                    <p className='text-[#b3b3b3] mb-5'>
                                                        {item.comment}
                                                    </p>

                                                    <div className="flex justify-start items-center gap-3">
                                                        <p
                                                            onClick={() => {
                                                                setComments((prevComments) =>
                                                                    prevComments.map((comment, idx) =>
                                                                        idx === index
                                                                            ? { ...comment, hearts: comment.hearts + 1 }
                                                                            : comment
                                                                    )
                                                                );
                                                            }}
                                                            className='cursor-pointer text-sm bg-[#131313] px-3 py-2 rounded-[20px]'>❤️ {item.hearts}</p>
                                                        <p
                                                            onClick={() => {
                                                                setComments((prevComments) =>
                                                                    prevComments.map((comment, idx) =>
                                                                        idx === index
                                                                            ? { ...comment, thumbs: comment.thumbs + 1 }
                                                                            : comment
                                                                    )
                                                                );
                                                            }}
                                                            className='cursor-pointer text-sm bg-[#131313] px-3 py-2 rounded-[20px]'>👍 {item.thumbs}</p>
                                                        <button className='text-sm bg-[#131313] px-3 py-2 rounded-[20px]'>Reply</button>
                                                    </div>

                                                    {item?.replies?.length > 0 &&
                                                        <div className="replies mt-6 xl:ml-8 bg-[#131313] xl:p-3 p-2 rounded-[20px]">
                                                            {
                                                                item?.replies?.map((reply, replyIndex) => (
                                                                    <div key={replyIndex} className="flex m-4 justify-start items-start gap-3">
                                                                        <img src={reply.userAvatar} className='w-[50px] h-[50px] rounded-full' alt="" />
                                                                        <div className="content">
                                                                            <div className="flex flex-wrap justify-start items-center gap-3">
                                                                                <h3 className='xl:text-[22px] text-white'>{reply.userName}</h3>
                                                                                <div className="dot xl:block hidden w-1.5 h-1.5 bg-[#686868] rounded-full"></div>
                                                                                <h4 className='xl:text-lg xl:block hidden text-[#686868]'>{reply.date}</h4>
                                                                            </div>

                                                                            <p className='text-[#b3b3b3] mb-5 xl:text-[16px] text-sm'>
                                                                                {reply.comment}
                                                                            </p>

                                                                            <div className="flex justify-start items-center xl:gap-3 gap-1">
                                                                                <p
                                                                                    onClick={() => {
                                                                                        setComments((prevComments) =>
                                                                                            prevComments.map((comment, idx) =>
                                                                                                idx === index
                                                                                                    ? {
                                                                                                        ...comment,
                                                                                                        replies: comment.replies.map((r, rIdx) =>
                                                                                                            rIdx === replyIndex
                                                                                                                ? { ...r, hearts: r.hearts + 1 }
                                                                                                                : r
                                                                                                        )
                                                                                                    }
                                                                                                    : comment
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                    className='cursor-pointer text-xs lg:text-sm bg-[#131313] px-3 py-2 rounded-[20px]'>❤️ {reply.hearts}</p>
                                                                                <p
                                                                                    onClick={() => {
                                                                                        setComments((prevComments) =>
                                                                                            prevComments.map((comment, idx) =>
                                                                                                idx === index
                                                                                                    ? {
                                                                                                        ...comment,
                                                                                                        replies: comment.replies.map((r, rIdx) =>
                                                                                                            rIdx === replyIndex
                                                                                                                ? { ...r, thumbs: r.thumbs + 1 }
                                                                                                                : r
                                                                                                        )
                                                                                                    }
                                                                                                    : comment
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                    className='cursor-pointer text-xs lg:text-sm bg-[#131313] px-3 py-2 rounded-[20px]'>👍 {reply.thumbs}</p>
                                                                                <button className='text-xs lg:text-sm bg-[#131313] px-3 py-2 rounded-[20px]'>Reply</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <button className=''>
                                                <img src={dotsIcon} alt="" className='w-[28px] hover:scale-[1.01]' />
                                            </button>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Tabs