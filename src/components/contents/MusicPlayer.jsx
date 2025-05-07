import React, { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa";
import { Link } from "react-router-dom";

import artist from "../../assets/artist.jpg";
import i1 from "../../assets/i1.webp";
import i2 from "../../assets/i2.webp";
import i3 from "../../assets/i3.webp";
import i4 from "../../assets/i4.webp";
import download from "../../assets/download.png";
import cover from "../../assets/cover.jpg";

import kai from "../../assets/tracks/kai.mp3";
import laho from "../../assets/tracks/laho.mp3";

// Sample tracks (Replace with real URLs or imported files)
const tracks = [
  {
    title: "Kai",
    artist: "Olamide ft Wizkid",
    url: kai, // Replace this
    uploadedAgo: "5 days ago",
  },
  {
    title: "Laho",
    artist: "Shalipopi",
    url: laho, // Replace this
    uploadedAgo: "2 weeks ago",
  },
];

const MusicPlayer = ({ bar }) => {
  const [shares, setShares] = useState(0);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [saves, setSaves] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(null);

  const currentTrack = tracks[currentIndex];

  const playAudio = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    isPlaying ? pauseAudio() : playAudio();
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress((current / duration) * 100);
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    const percent = offsetX / width;
    audioRef.current.currentTime = percent * audioRef.current.duration;
  };

  const nextTrack = () => {
    setCurrentIndex((prev) => (prev + 1) % tracks.length);
    setProgress(0);
    setIsPlaying(false);
  };

  const prevTrack = () => {
    setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setProgress(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("ended", nextTrack);
    return () => {
      audio.removeEventListener("ended", nextTrack);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      playAudio();
    }
  }, [currentIndex]);

  return (
    <div className="music-player xl:p-10 p-5 rounded-[30px] bg-[#0c0c0c] mt-5">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
      />

      <div className="flex justify-center items-center gap-5">
        <FaChevronLeft
          onClick={prevTrack}
          className="text-[#ffffff9c] hover:text-white text-2xl cursor-pointer"
        />
        <div className={`music-player-item ${!bar && "z-[-1]"}`}>
          <div
            className="music-timeline-wraper cursor-pointer w-full h-2 bg-[#222] rounded"
            onClick={handleProgressClick}
          >
            <div
              className="music-player-timeline is-playing bg-white h-2 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <FaChevronRight
          onClick={nextTrack}
          className="text-[#ffffff9c] hover:text-white text-2xl cursor-pointer"
        />
      </div>

      <div className="text-center xl:text-sm text-xs mt-3 text-[#555550]">
        (Click timeline or use arrows to change track)
      </div>

      <div className="flex xl:flex-row flex-col justify-between items-center gap-5 mt-10">
        <div className="w-full xl:w-2/3">
          <div className="flex justify-start items-center gap-6">
            <h2 className="text-[#e4e2e7] font-normal text-[25px]">
              {currentTrack.title}
            </h2>

            <div className="relative inline-block text-left group">
              <button className="text-[#ffffff9c] pt-3 text-xl lg:mr-12 hover:text-white">
                <img src={download} alt="" className="w-[25px] h-[25px]" />
              </button>

              <div className="absolute mt-2 w-32 rounded-md shadow-lg bg-[#1e1e1e] ring-1 ring-black ring-opacity-5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1 flex flex-col">
                  <Link
                    to="/download"
                    className="block px-4 py-2 text-sm text-white hover:bg-[#2c2c2c]"
                  >
                    Download
                  </Link>
                  <Link
                    to="/share"
                    className="block px-4 py-2 text-sm text-white hover:bg-[#2c2c2c]"
                  >
                    Share
                  </Link>
                </div>
              </div>
            </div>

            <button
              onClick={togglePlay}
              className="ml-5 bg-white text-black px-4 py-2 rounded-full text-sm font-semibold"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
          </div>

          <div className="flex my-8 justify-start items-center gap-3">
            <img
              src={artist}
              alt=""
              className="w-[48px] h-[48px] rounded-full"
            />
            <div className="right">
              <h3 className="text-white raleway text-[15px]">
                {currentTrack.artist}
              </h3>
              <p className="text-[13px] text-[#969597]">
                Uploaded {currentTrack.uploadedAgo}
              </p>
            </div>
          </div>

          <div className="flex flex-start flex-wrap gap-2 mt-10">
            <div className="bg-[#0e0e0e] px-3 py-1 rounded-[40px]">
              <span className="text-white text-sm">5.5K</span>
            </div>
            <button
              onClick={() => setShares(shares + 1)}
              title="Shares"
              className="cursor-pointer bg-[#0e0e0e] hover:bg-[#353535] px-3 py-1 rounded-[40px] flex items-center gap-2 border border-[#353535]"
            >
              <img src={i1} alt="" className="w-[19px] h-[19px]" />
              <span className="text-[#ffffff9c] text-sm">{shares}</span>
            </button>
            <button
              onClick={() => setLikes(likes + 1)}
              title="Likes"
              className="cursor-pointer bg-[#0e0e0e] hover:bg-[#353535] px-3 py-1 rounded-[40px] flex items-center gap-2 border border-[#353535]"
            >
              <img src={i2} alt="" className="w-[19px] h-[19px]" />
              <span className="text-[#ffffff9c] text-sm">{likes}</span>
            </button>
            <button
              onClick={() => setViews(views + 1)}
              title="Views"
              className="cursor-pointer bg-[#0e0e0e] hover:bg-[#353535] px-3 py-1 rounded-[40px] flex items-center gap-2 border border-[#353535]"
            >
              <img src={i3} alt="" className="w-[19px] h-[19px]" />
              <span className="text-[#ffffff9c] text-sm">{views}</span>
            </button>
            <button
              onClick={() => setSaves(saves + 1)}
              title="Saves"
              className="cursor-pointer bg-[#0e0e0e] hover:bg-[#353535] px-3 py-1 rounded-[40px] flex items-center gap-2 border border-[#353535]"
            >
              <img src={i4} alt="" className="w-[19px] h-[19px]" />
              <span className="text-[#ffffff9c] text-sm">{saves}</span>
            </button>
          </div>
        </div>

        <div className="w-full xl:w-1/3">
          <img src={cover} className="xl:w-full w-2/3 mx-auto" alt="" />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
