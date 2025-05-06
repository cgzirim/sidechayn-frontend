// Converted Explore.tsx
import React, { useState, MouseEvent } from 'react';
import Header from '../components/header';
import LeftSidebar from '../components/left-sidebar';
import Search from '../components/contents/search';
import { Link } from 'react-router-dom';

import genresImg from "../assets/genres.jpg";
import playlistImg from "../assets/playlist-1.jpg";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import UpcomingArtist from '../components/upcoming-artist';
import LikedSong from '../components/liked-song';
import Genre from '../components/genre';
import LoginModal from '../components/modals/login-modal';
import UploadModal from '../components/modals/upload-modal';
import ComingSoon from '../components/modals/coming-soon';
import MoodModal from '../components/modals/mood-modal';

const Explore: React.FC = () => {
  const [mobileSidebar, setMobileSidebar] = useState<boolean>(true);
  const handleMobileSidebar = () => setMobileSidebar(!mobileSidebar);

  const [bar, setBar] = useState<boolean>(true);
  const handleBar = () => setBar(!bar);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<string>('login');

  const handleClose = () => setModalVisible(false);
  const changeModal = (modal: string) => {
    setActiveModal(modal);
    setModalVisible(true);
  };

  const [uploadModalVisible, setUploadModalVisible] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<number>(1);

  const handleClick = () => {
    setUploadModalVisible(!uploadModalVisible);
    handleBar();
  };

  const handleUploadClose = () => {
    setUploadModalVisible(false);
    setModalStep(1);
  };

  const handleNext = () => {
    if (modalStep === 1) setModalStep(2);
    else setUploadModalVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
    setUploadModalVisible(false);
    setModalStep(1);
    setBar(true);
  };

  const [comingSoonModalVisible, setComingSoonModalVisible] = useState<boolean>(false);
  const handleComingSoonClose = () => setComingSoonModalVisible(false);
  const handleComingSoonClick = () => setComingSoonModalVisible(true);

  const [moodVisible, setMoodVisible] = useState<boolean>(false);
  const handleMoodClose = () => setMoodVisible(false);

  return (
    <div>
      <Header handleMobileSidebar={handleMobileSidebar} />
      <main className="container mx-auto">
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
            <Search />

            <div className="flex justify-start items-center relative gap-2 md:gap-5 overflow-x-auto scrollbar-hide relative">
              <div className="left-overlay"></div>
              <div
                className="overflow-x-auto scrollbar-hide"
                onMouseDown={(e) => {
                  const slider = e.currentTarget as HTMLElement & {
                    isDown?: boolean;
                    startX?: number;
                    scrollLeft?: number;
                  };
                  slider.isDown = true;
                  slider.startX = e.pageX - slider.offsetLeft;
                  slider.scrollLeft = slider.scrollLeft || 0;
                  document.body.style.userSelect = "none";
                }}
                onMouseLeave={(e) => {
                  const slider = e.currentTarget as HTMLElement & { isDown?: boolean };
                  slider.isDown = false;
                  document.body.style.userSelect = "";
                }}
                onMouseUp={(e) => {
                  const slider = e.currentTarget as HTMLElement & { isDown?: boolean };
                  slider.isDown = false;
                  document.body.style.userSelect = "";
                }}
                onMouseMove={(e) => {
                  const slider = e.currentTarget as HTMLElement & {
                    isDown?: boolean;
                    startX?: number;
                    scrollLeft?: number;
                  };
                  if (!slider.isDown) return;
                  e.preventDefault();
                  const x = e.pageX - slider.offsetLeft;
                  const walk = (x - (slider.startX ?? 0)) * 2;
                  slider.scrollLeft = (slider.scrollLeft ?? 0) - walk;
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
                <h2 className='text-2xl'>Genres</h2>
                <Link to="/explore" className='text-sm text-white hover:underline'>See all</Link>
                <div className="grid mt-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-3">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <Genre key={index} />
                  ))}
                </div>

                <h2 className='text-2xl mt-14'>Trending Playlists</h2>
                <Link to="/explore" className='text-sm text-white hover:underline'>See all</Link>
                <div className="grid mt-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="item cursor-pointer hover:scale-105 transition-all duration-500 h-[165px] overflow-hidden relative rounded-[20px]">
                      <img src={playlistImg} className='w-full h-[165px] object-cover' alt="playlist" />
                      <img src={genresImg} className='w-5 h-5 rounded-full object-cover pp-img' alt="genre" />
                      <div className="blur-holder">
                        <div className="blur playlist"></div>
                        <div className="text-block playlist">gym playlist 69</div>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className='text-2xl mt-14'>Songs You'll LOVE</h2>
                <Link to="/explore" className='text-sm text-white hover:underline'>See all</Link>
                {Array.from({ length: 4 }).map((_, index) => (
                  <LikedSong key={index} />
                ))}
              </div>

              <div className="right w-full xl:w-3/12">
                <h2 className='text-2xl'>Upcoming Artists</h2>
                <Link to="/explore" className='text-sm text-white hover:underline'>See all</Link>
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

        {comingSoonModalVisible && <ComingSoon handleClose={handleComingSoonClose} />}
      </main>

      <div className="footer mb-[85px] bg-[#0A0A0A] py-6 mt-10">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5">
            {[
              'Support',
              'Exclusivity Program',
              'Features/Changelog',
              'Careers',
              'Investors',
              'Urgent Takedown Request',
            ].map((text, index) => (
              <Link key={index} to="/" className='text-[#ffffff9c] text-sm'>
                <span className='text-[#ffffff9c] text-sm'>{text}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;