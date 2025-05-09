import React, { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa";
import { Link } from "react-router-dom";
import useSongs from "../../api/hooks/songs/useSongs";
import LoadingState from "../States/LoadingState";

import i1 from "../../assets/i1.webp";
import download from "../../assets/download.png";

import SaveButton from "./SaveButton";
import ViewsButton from "./ViewsButton";
import LikesButton from "./LikesButton";
import useMusicStore from "../../stores/useMusicStore";

const MusicPlayer = ({ bar }) => {
  const { setCurrentPlayingSong } = useMusicStore();

  const { data: songs, isLoading, isError } = useSongs();

  const tracks = songs?.results || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shares, setShares] = useState(0);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [saves, setSaves] = useState(0);
  const audioRef = useRef(null);

  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const currentTrack = tracks[currentIndex];

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error("Playback error:", error);
          setIsPlaying(false);
        });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    isPlaying ? pauseAudio() : playAudio();
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio?.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    if (audioRef.current?.duration) {
      audioRef.current.currentTime = percent * audioRef.current.duration;
    }
  };

  const nextTrack = () => {
    if (tracks.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % tracks.length);
    setProgress(0);
  };

  const prevTrack = () => {
    if (tracks.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setProgress(0);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => nextTrack();
    const handleError = () => {
      console.error("Audio failed to load");
      nextTrack();
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [tracks]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        playAudio();
      }
    }
  }, [currentIndex, tracks]);

  useEffect(() => {
    if (currentTrack) {
      setLikes(currentTrack.total_likes);
      setShares(currentTrack.total_shares);
      setViews(currentTrack.total_streams);
      setSaves(currentTrack.total_saves);

      setIsSaved(currentTrack.i_saved || false);
      setIsLiked(currentTrack.i_liked || false);

      setCurrentPlayingSong(currentTrack);
    }
  }, [currentTrack]);

  if (isLoading) return <LoadingState />;
  if (isError || tracks.length === 0)
    return (
      <div className="text-white text-center p-10">
        Failed to load songs. Please try again later.
      </div>
    );

  return (
    <div className="music-player xl:p-10 p-5 rounded-[30px] bg-[#0c0c0c] mt-5">
      <audio
        ref={audioRef}
        src={currentTrack?.audio_file}
        onTimeUpdate={handleTimeUpdate}
        preload="metadata"
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
                <img
                  src={download}
                  alt="download"
                  className="w-[25px] h-[25px]"
                />
              </button>
              <div className="absolute mt-2 w-32 rounded-md shadow-lg bg-[#1e1e1e] ring-1 ring-black ring-opacity-5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1 flex flex-col">
                  <a
                    href={currentTrack?.audio_file}
                    className="block px-4 py-2 text-sm text-white hover:bg-[#2c2c2c]"
                    download={currentTrack?.title}
                  >
                    Download
                  </a>
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
              src={currentTrack.artist?.picture}
              alt="artist"
              className="w-[48px] h-[48px] rounded-full"
            />
            <div>
              <h3 className="text-white raleway text-[15px]">
                {currentTrack.artist?.name}
              </h3>
              <p className="text-[13px] text-[#969597]">
                Uploaded {currentTrack.release_date}
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
              <img src={i1} alt="share" className="w-[19px] h-[19px]" />
              <span className="text-[#ffffff9c] text-sm">{shares}</span>
            </button>

            <LikesButton
              likes={likes}
              setIsLiked={setIsLiked}
              setLikes={setLikes}
              isLiked={isLiked}
              songId={currentTrack.id}
            />

            <ViewsButton views={views} />

            <SaveButton
              saves={saves}
              setSaves={setSaves}
              setIsSaved={setIsSaved}
              isSaved={isSaved}
              songId={currentTrack.id}
            />
          </div>
        </div>

        <div className="w-full xl:w-1/3">
          <img
            src={currentTrack.cover_image}
            className="xl:w-full xl:h-full w-2/3 mx-auto object-cover"
            alt="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
