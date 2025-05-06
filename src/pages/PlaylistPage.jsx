import React, { useState } from 'react'
import Header from '../components/header'
import LeftSidebar from '../components/left-sidebar'
import { Link } from 'react-router-dom'

import genresImg from "../assets/genres.jpg"
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import i1 from "../assets/i1.webp"
import i2 from "../assets/i2.webp"
import i3 from "../assets/i3.webp"
import i4 from "../assets/i4.webp"
import play from "../assets/play.png"
import plus from "../assets/plys.png"
import avatar from "../assets/avatar.jpeg"
import PlaylistBanner from '../components/playlist-banner'
import PlaylistTrack from '../components/playlist-track'
import LoginModal from '../components/modals/login-modal'
import UploadModal from '../components/modals/upload-modal'
import ComingSoon from '../components/modals/coming-soon'
import MoodModal from '../components/modals/mood-modal'

const Playlist = () => {
    const tracks = [
        {
            id: 1,
            type: "new",
            albumArt: genresImg,
            title: "Blah black 1",
            artist: "Drake",
            userIcon: avatar,
            userName: "User3432",
            time: "3:45",
            saves: "143K",
        },
        {
            id: 2,
            type: "new",
            albumArt: genresImg,
            title: "Blah black 2",
            artist: "Drake",
            userIcon: avatar,
            userName: "User3432",
            time: "3:45",
            saves: "143K",
        },
        {
            id: 3,
            type: "new",
            albumArt: genresImg,
            title: "Blah black 3",
            artist: "Drake",
            userIcon: avatar,
            userName: "User3432",
            time: "3:45",
            saves: "143K",
        },
        {
            id: 4,
            type: "new",
            albumArt: genresImg,
            title: "Blah black 4",
            artist: "Drake",
            userIcon: avatar,
            userName: "User3432",
            time: "3:45",
            saves: "143K",
        },
        {
            id: 5,
            type: "new",
            albumArt: genresImg,
            title: "Blah black 5",
            artist: "Drake",
            userIcon: avatar,
            userName: "User3432",
            time: "3:45",
            saves: "143K",
        },
        {
            id: 6,
            type: "new",
            albumArt: genresImg,
            title: "Blah black 6",
            artist: "Drake",
            userIcon: avatar,
            userName: "User3432",
            time: "3:45",
            saves: "143K",
        },
        {
            id: 7,
            type: "new",
            albumArt: genresImg,
            title: "Blah black 7",
            artist: "Drake",
            userIcon: avatar,
            userName: "User3432",
            time: "3:45",
            saves: "143K",
        },
        {
            id: 8,
            type: "new",
            albumArt: genresImg,
            title: "Blah black 8",
            artist: "Drake",
            userIcon: avatar,
            userName: "User3432",
            time: "3:45",
            saves: "143K",
        },
    ]

    const [searchedTracks, setSearchedTracks] = React.useState(tracks)

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase()
        const filteredTracks = tracks.filter(track => {
            return track.title.toLowerCase().includes(searchTerm) || track.artist.toLowerCase().includes(searchTerm)
        })
        setSearchedTracks(filteredTracks)
    }

    const [mobileSidebar, setMobileSidebar] = React.useState(true)
    const handleMobileSidebar = () => {
        setMobileSidebar(!mobileSidebar)
    }

    const [bar, setBar] = React.useState(true)
    const handleBar = () => {
        setBar(!bar)
    }


    const [modalVisible, setModalVisible] = React.useState(false)
    const [activeModal, setActiveModal] = React.useState("login")
    const handleClose = () => {
        setModalVisible(false)
    }

    const changeModal = (modal) => {
        setActiveModal(modal)
        setModalVisible(true)
    }


    const [uploadModalVisible, setUploadModalVisible] = useState(false);
    const [modalStep, setModalStep] = useState(1);
    const handleClick = () => {
        setUploadModalVisible(!uploadModalVisible);
        handleBar();
    }
    const handleUploadClose = () => {
        setUploadModalVisible(false);
        setModalStep(1);
    }

    const handleNext = () => {
        if (modalStep === 1) {
            setModalStep(2);
        } else {
            // Handle the final step or submission
            setUploadModalVisible(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted");
        setUploadModalVisible(false);
        setModalStep(1);
        setBar(true);
    }

    const [comingSoonModalVisible, setComingSoonModalVisible] = useState(false);
    const handleComingSoonClose = () => {
        setComingSoonModalVisible(false);
    }
    const handleComingSoonClick = () => {
        setComingSoonModalVisible(true);
    }

    const [moodVisible, setMoodVisible] = useState(false);
    const handleMoodClose = () => {
        setMoodVisible(false);
    }
    return (
        <div>
            <Header handleMobileSidebar={handleMobileSidebar} />
            <main className='container mx-auto'>
                <div className="flex justify-between xl:flex-row flex-col items-start gap-12">
                    <div className={`left-sidebar w-full xl:w-2/12 rounded-[30px] min-w-[240px] ${mobileSidebar ? '' : 'active'}`}>
                        <LeftSidebar
                            loggedIn={true}
                            bar={bar}
                            handleBar={handleBar}
                            setBar={setBar}
                            setModalVisible={setModalVisible}
                            handleClose={handleClose}
                            changeModal={changeModal}
                            handleClick={handleClick}
                            handleMobileSidebar={handleMobileSidebar}
                            handleComingSoonClick={handleComingSoonClick}
                            handleComingSoonClose={handleComingSoonClose}
                        />
                    </div>
                    <div className="contents-wrapper w-full xl:w-10/12">
                        <PlaylistBanner />


                        <div className="flex flex-wrap justify-start items-center gap-6">
                            <button className='btn opacity-50 hover:opacity-100 cursor-pointer'>
                                <img src={play} alt="" className='w-9 h-9' />
                            </button>
                            <button className='btn opacity-50 hover:opacity-100 cursor-pointer' onClick={() => setMoodVisible(true)}>
                                <img src={plus} alt="" className='w-9 h-9' />
                            </button>

                            <form action="" className='w-[400px] max-w-full'>
                                <input onChange={handleSearch} type="text" className='w-full text-white placeholder:text-white bg-[#1d1d1d] rounded-full w-full h-11 px-4' placeholder='Search Tracks' name="" id="" />
                            </form>
                        </div>


                        {/* tracks */}
                        <div className="grid grid-cols-1 gap-5 mt-10">
                            {
                                searchedTracks.map((track, index) => (
                                    <PlaylistTrack key={index} track={track} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </main>


            {/* footer */}
            <div className="footer mb-[85px] bg-[#0A0A0A] py-6 mt-10">
                <div className="container mx-auto">
                    <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5">
                        <Link to="/" className='text-[#ffffff9c] text-sm'>
                            <span className='text-[#ffffff9c] text-sm'>Support</span>
                        </Link>
                        <Link to="/" className='text-[#ffffff9c] text-sm'>
                            <span className='text-[#ffffff9c] text-sm'>Exclusivity Program</span>
                        </Link>
                        <Link to="/" className='text-[#ffffff9c] text-sm'>
                            <span className='text-[#ffffff9c] text-sm'>Features/Changelog</span>
                        </Link>
                        <Link to="/" className='text-[#ffffff9c] text-sm'>
                            <span className='text-[#ffffff9c] text-sm'>Careers</span>
                        </Link>
                        <Link to="/" className='text-[#ffffff9c] text-sm'>
                            <span className='text-[#ffffff9c] text-sm'>Investors</span>
                        </Link>
                        <Link to="/" className='text-[#ffffff9c] text-sm'>
                            <span className='text-[#ffffff9c] text-sm'>Urgent Takedown Request</span>
                        </Link>
                    </div>
                </div>
            </div>


            {/* floating music */}
            <div className="floating-music h-[80px] fixed bottom-0 left-0 right-0" onClick={() => setMoodVisible(true)}>
                <div className="container mx-auto">
                    <div className="flex justify-between items-center gap-16">
                        <div className="flex justify-start items-center gap-3">
                            <img src={genresImg} className='w-[55px]' alt="" />
                            <div className="content hidden lg:block">
                                <h2 className='w-[200px]'>Teenage Dream - Kidd G</h2>
                                <p className='text-[#ffffff9c] text-sm'>Country</p>
                            </div>
                        </div>

                        <div className="flex jusitify-center items-center gap-5 w-1/2">
                            <FaChevronLeft className='text-[#ffffff9c] hover:text-white cursor-pointer text-2xl' />
                            <div className="music-player-item">
                                <img loading="lazy" src="https://cdn.prod.website-files.com/66b1e34f1cccd77056bac6df/67a6016f02644c24ae599d2a_wave.svg" alt="" className="custom-img-opacity" />
                                <div className="music-timeline-wraper">
                                    <div className="music-player-timeline">
                                    </div>
                                    <div className="music-player-timeline is-playing"></div>
                                </div>
                            </div>
                            <FaChevronRight className='text-[#ffffff9c] hover:text-white cursor-pointer text-2xl' />
                        </div>

                        <div className="hidden xl:flex justify-end items-center gap-4">
                            <Link className="bg-[#0e0e0e] hover:bg-[#353535] px-3 py-1 rounded-[40px] flex justify-center items-center gap-2 border border-[#353535]">
                                <img src={i1} alt="" className='w-[19px] h-[19px]' />
                                <span className='text-[#ffffff9c] text-sm'>1K</span>
                            </Link>
                            <Link className="bg-[#0e0e0e] hover:bg-[#353535] px-3 py-1 rounded-[40px] flex justify-center items-center gap-2 border border-[#353535]">
                                <img src={i2} alt="" className='w-[19px] h-[19px]' />
                                <span className='text-[#ffffff9c] text-sm'>1K</span>
                            </Link>
                            <Link className="bg-[#0e0e0e] hover:bg-[#353535] px-3 py-1 rounded-[40px] flex justify-center items-center gap-2 border border-[#353535]">
                                <img src={i3} alt="" className='w-[19px] h-[19px]' />
                                <span className='text-[#ffffff9c] text-sm'>2K</span>
                            </Link>
                            <Link className="bg-[#0e0e0e] hover:bg-[#353535] px-3 py-1 rounded-[40px] flex justify-center items-center gap-2 border border-[#353535]">
                                <img src={i4} alt="" className='w-[19px] h-[19px]' />
                                <span className='text-[#ffffff9c] text-sm'>1K</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {modalVisible && <LoginModal modalVisible={modalVisible} setActiveModal={setActiveModal} activeModal={activeModal} handleClose={handleClose} changeModal={changeModal} />}


            {/* upload modal */}
            {
                uploadModalVisible && <>
                    <UploadModal modalStep={modalStep} handleClose={handleUploadClose} handleNext={handleNext} handleSubmit={handleSubmit} setModalStep={setModalStep} />
                </>
            }

            {/* coming soon modal */}
            {
                comingSoonModalVisible && <ComingSoon handleClose={handleComingSoonClose} />
            }

            {
                moodVisible && <MoodModal handleClose={handleMoodClose} />
            }
        </div>
    )
}

export default Playlist