import React, { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import useMusicStore from "../../stores/useMusicStore";

const SongThumbnail = ({ song }) => {
  const currentPlayingSong = useMusicStore((state) => state.currentPlayingSong);
  const setCurrentPlayingSong = useMusicStore(
    (state) => state.setCurrentPlayingSong
  );

  const [isPlaying, setIsPlaying] = useState(
    currentPlayingSong ? currentPlayingSong.id === song.id || false : false
  );

  useEffect(() => {
    setIsPlaying(
      currentPlayingSong ? currentPlayingSong.id === song.id || false : false
    );
  }, [currentPlayingSong]);

  return (
    <div className="flex justify-start items-center gap-3 group/thumbnail">
      <div className="relative rounded-[20px] w-[65px] h-[65px] overflow-hidden">
        <div
          className={`${
            isPlaying ? "opacity-100" : "opacity-0"
          } bg-black/40 top-0 bottom-0 right-0 left-0 flex items-center justify-center
        absolute group-hover/thumbnail:opacity-100 opacity-0 duration`}
        >
          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
              setCurrentPlayingSong(song);
            }}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>

        <img src={song.cover_image} className=" w-full h-full" alt="" />
      </div>

      <div className="text">
        <h2 className="text-[#ffffff] text-sm text-[17px]">{song.title}</h2>
        <p className="text-[#ffffff9c] text-[15px]]">{song.artist.name}</p>
      </div>
    </div>
  );
};

export default SongThumbnail;
