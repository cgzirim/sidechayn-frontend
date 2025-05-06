import React, { useState } from 'react'
import Header from '../components/header'
import LeftSidebar from '../components/left-sidebar'
import DJProfile from '../components/dj-profile'
import { Link } from 'react-router-dom'
import LoginModal from '../components/modals/login-modal'
import UploadModal from '../components/modals/upload-modal'
import ComingSoon from '../components/modals/coming-soon'

const Profile = () => {
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
    }

    const handleClick = () => {
        setUploadModalVisible(!uploadModalVisible);
        handleBar();
    }


    const [comingSoonModalVisible, setComingSoonModalVisible] = useState(false);
    const handleComingSoonClose = () => {
        setComingSoonModalVisible(false);
    }
    const handleComingSoonClick = () => {
        setComingSoonModalVisible(true);
    }
    return (
        <div>
            <Header handleMobileSidebar={handleMobileSidebar} />
            <main className='container mx-auto'>
                <div className="flex justify-between xl:flex-row flex-col items-start gap-12">
                    <div className={`left-sidebar w-full xl:w-2/12 rounded-[30px] min-w-[240px] ${mobileSidebar ? '' : 'active'}`}>
                        <LeftSidebar
                            loggedIn={false}
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
                        <DJProfile />
                    </div>
                </div>
            </main>

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

            {/* footer */}
            <div className="footer bg-[#0A0A0A] py-6">
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
        </div>
    )
}

export default Profile