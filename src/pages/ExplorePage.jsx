import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "../components/contents/search";
import Header from "../components/header";
import LeftSidebar from "../components/left-sidebar";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import genresImg from "../assets/genres.jpg";

import i1 from "../assets/i1.webp";
import i2 from "../assets/i2.webp";
import i3 from "../assets/i3.webp";
import i4 from "../assets/i4.webp";
import ComingSoon from "../components/modals/coming-soon";
import LoginModal from "../components/modals/login-modal";
import MoodModal from "../components/modals/mood-modal";
import UploadModal from "../components/modals/upload-modal";
import UpcomingArtist from "../components/upcoming-artist";
import Genres from "./components/Genres";
import SongsYouWillLove from "./SongsYouWillLove";
import TrendingPlayList from "./TrendingPlayList";

const Explore = () => {
  const [mobileSidebar, setMobileSidebar] = useState(true);
  const handleMobileSidebar = () => {
    setMobileSidebar(!mobileSidebar);
  };

  const [bar, setBar] = React.useState(true);
  const handleBar = () => {
    setBar(!bar);
  };

  const [modalVisible, setModalVisible] = React.useState(false);
  const [activeModal, setActiveModal] = React.useState("login");
  const handleClose = () => {
    setModalVisible(false);
  };

  const changeModal = (modal) => {
    setActiveModal(modal);
    setModalVisible(true);
  };

  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const handleClick = () => {
    setUploadModalVisible(!uploadModalVisible);
    handleBar();
  };
  const handleUploadClose = () => {
    setUploadModalVisible(false);
    setModalStep(1);
  };

  const handleNext = () => {
    if (modalStep === 1) {
      setModalStep(2);
    } else {
      // Handle the final step or submission
      setUploadModalVisible(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
    setUploadModalVisible(false);
    setModalStep(1);
    setBar(true);
  };

  const [comingSoonModalVisible, setComingSoonModalVisible] = useState(false);
  const handleComingSoonClose = () => {
    setComingSoonModalVisible(false);
  };
  const handleComingSoonClick = () => {
    setComingSoonModalVisible(true);
  };

  const [moodVisible, setMoodVisible] = useState(false);
  const handleMoodClose = () => {
    setMoodVisible(false);
  };
  return (
    <div>
      <Header handleMobileSidebar={handleMobileSidebar} />
      <main className="container mx-auto">
        <div className="flex justify-between xl:flex-row flex-col items-start gap-12">
          <div
            className={`left-sidebar w-full xl:w-2/12 rounded-[30px] min-w-[240px] ${
              mobileSidebar ? "" : "active"
            }`}
          >
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
            <Search />

            {/* <div className="flex justify-start items-center relative gap-2 md:gap-5 relative overflow-x-auto scrollbar-hide">
                            <div className="left-overlay"></div>
                            <div className="overflow-x-auto scrollbar-hide">
                                {Array.from({ length: 20 }).map((_, index) => (
                                    <span
                                        key={index}
                                        className="text-sm transition-[0.3s] px-3 py-1 cursor-pointer rounded-lg text-white bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500 hover:font-bold whitespace-nowrap"
                                    >
                                        trending Now
                                    </span>
                                ))}
                            </div>
                            <div className="right-overlay"></div>
                        </div> */}

            <div className="flex justify-start items-center relative gap-2 md:gap-5 overflow-x-auto scrollbar-hide relative">
              <div className="left-overlay"></div>
              <div
                className="overflow-x-auto scrollbar-hide"
                onMouseDown={(e) => {
                  const slider = e.currentTarget;
                  slider.isDown = true;
                  slider.startX = e.pageX - slider.offsetLeft;
                  slider.scrollLeft = slider.scrollLeft || 0;
                  document.body.style.userSelect = "none"; // Disable text selection
                }}
                onMouseLeave={(e) => {
                  const slider = e.currentTarget;
                  slider.isDown = false;
                  document.body.style.userSelect = ""; // Re-enable text selection
                }}
                onMouseUp={(e) => {
                  const slider = e.currentTarget;
                  slider.isDown = false;
                  document.body.style.userSelect = ""; // Re-enable text selection
                }}
                onMouseMove={(e) => {
                  const slider = e.currentTarget;
                  if (!slider.isDown) return;
                  e.preventDefault();
                  const x = e.pageX - slider.offsetLeft;
                  const walk = (x - slider.startX) * 2; // Adjust scroll speed
                  slider.scrollLeft = slider.scrollLeft - walk;
                }}
              >
                {Array.from({ length: 20 }).map((_, index) => (
                  <span
                    key={index}
                    className="text-sm transition-[0.3s] px-3 py-1 cursor-pointer rounded-lg text-white bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500 hover:font-bold whitespace-nowrap"
                  >
                    Trending Now
                  </span>
                ))}
              </div>
              <div className="right-overlay"></div>
            </div>

            <div className="flex mt-10 xl:flex-row flex-col justify-between items-start gap-10">
              <div className="left w-full xl:w-9/12">
                <Genres />
                {/* <h2 className="text-2xl">Genres</h2>
                <Link
                  to="/explore"
                  className="text-sm text-white hover:underline"
                >
                  See all
                </Link>

                <div className="grid mt-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-3">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <Genre key={index} />
                  ))}
                </div> */}

                {/* Trending Playlist */}

                <TrendingPlayList />
                {/* Trending Playlist */}
                <SongsYouWillLove />
              </div>

              <div className="right w-full xl:w-3/12">
                <h2 className="text-2xl">Upcoming Artists</h2>
                <Link
                  to="/explore"
                  className="text-sm text-white hover:underline"
                >
                  See all
                </Link>

                {Array.from({ length: 13 }).map((_, index) => (
                  <UpcomingArtist key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {modalVisible && (
          <LoginModal
            modalVisible={modalVisible}
            setActiveModal={setActiveModal}
            activeModal={activeModal}
            handleClose={handleClose}
            changeModal={changeModal}
          />
        )}

        {/* coming soon modal */}
        {comingSoonModalVisible && (
          <ComingSoon handleClose={handleComingSoonClose} />
        )}
      </main>

      {/* footer */}
      <div className="footer mb-[85px] bg-[#0A0A0A] py-6 mt-10">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5">
            <Link to="/" className="text-[#ffffff9c] text-sm">
              <span className="text-[#ffffff9c] text-sm">Support</span>
            </Link>
            <Link to="/" className="text-[#ffffff9c] text-sm">
              <span className="text-[#ffffff9c] text-sm">
                Exclusivity Program
              </span>
            </Link>
            <Link to="/" className="text-[#ffffff9c] text-sm">
              <span className="text-[#ffffff9c] text-sm">
                Features/Changelog
              </span>
            </Link>
            <Link to="/" className="text-[#ffffff9c] text-sm">
              <span className="text-[#ffffff9c] text-sm">Careers</span>
            </Link>
            <Link to="/" className="text-[#ffffff9c] text-sm">
              <span className="text-[#ffffff9c] text-sm">Investors</span>
            </Link>
            <Link to="/" className="text-[#ffffff9c] text-sm">
              <span className="text-[#ffffff9c] text-sm">
                Urgent Takedown Request
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* floating music */}
      <div
        className="floating-music h-[80px] fixed bottom-0 left-0 right-0"
        onClick={() => setMoodVisible(true)}
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-center gap-16">
            <div className="flex justify-start items-center gap-3">
              <img src={genresImg} className="w-[55px]" alt="" />
              <div className="content hidden lg:block">
                <h2 className="w-[200px]">Teenage Dream - Kidd G</h2>
                <p className="text-[#ffffff9c] text-sm">Country</p>
              </div>
            </div>

            <div className="flex jusitify-center items-center gap-5 w-1/2">
              <FaChevronLeft className="text-[#ffffff9c] hover:text-white cursor-pointer text-2xl" />
              <div className="music-player-item">
                <img
                  loading="lazy"
                  src="https://cdn.prod.website-files.com/66b1e34f1cccd77056bac6df/67a6016f02644c24ae599d2a_wave.svg"
                  alt=""
                  className="custom-img-opacity"
                />
                <div className="music-timeline-wraper">
                  <div className="music-player-timeline"></div>
                  <div className="music-player-timeline is-playing"></div>
                </div>
              </div>
              <FaChevronRight className="text-[#ffffff9c] hover:text-white cursor-pointer text-2xl" />
            </div>

            <div className="hidden xl:flex justify-end items-center gap-4">
              <Link className="bg-[#0e0e0e] hover:bg-[#353535] px-3 py-1 rounded-[40px] flex justify-center items-center gap-2 border border-[#353535]">
                <img src={i1} alt="" className="w-[19px] h-[19px]" />
                <span className="text-[#ffffff9c] text-sm">1K</span>
              </Link>
              <Link className="bg-[#0e0e0e] hover:bg-[#353535] px-3 py-1 rounded-[40px] flex justify-center items-center gap-2 border border-[#353535]">
                <img src={i2} alt="" className="w-[19px] h-[19px]" />
                <span className="text-[#ffffff9c] text-sm">1K</span>
              </Link>
              <Link className="bg-[#0e0e0e] hover:bg-[#353535] px-3 py-1 rounded-[40px] flex justify-center items-center gap-2 border border-[#353535]">
                <img src={i3} alt="" className="w-[19px] h-[19px]" />
                <span className="text-[#ffffff9c] text-sm">2K</span>
              </Link>
              <Link className="bg-[#0e0e0e] hover:bg-[#353535] px-3 py-1 rounded-[40px] flex justify-center items-center gap-2 border border-[#353535]">
                <img src={i4} alt="" className="w-[19px] h-[19px]" />
                <span className="text-[#ffffff9c] text-sm">1K</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {modalVisible && (
        <LoginModal
          modalVisible={modalVisible}
          setActiveModal={setActiveModal}
          activeModal={activeModal}
          handleClose={handleClose}
          changeModal={changeModal}
        />
      )}

      {/* upload modal */}
      {uploadModalVisible && (
        <>
          <UploadModal
            modalStep={modalStep}
            handleClose={handleUploadClose}
            handleNext={handleNext}
            handleSubmit={handleSubmit}
            setModalStep={setModalStep}
          />
        </>
      )}

      {moodVisible && <MoodModal handleClose={handleMoodClose} />}
    </div>
  );
};

export default Explore;
