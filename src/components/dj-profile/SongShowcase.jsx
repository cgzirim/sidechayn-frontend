import React from "react";

const SongShowcase = ({ song }) => {
  return (
    <div className="flex hover:scale-101 cursor-pointer border-b-1 pb-4 transition-all duration-200 items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={song.cover_image}
          alt="Song"
          className="w-12 h-12 rounded-md object-cover"
        />
        <p>{song.title}</p>
      </div>
      <div className="text-sm text-gray-400 flex gap-4">
        <span>1,834,433</span>
        <span>{song.duration}</span>
        {/* <span>4:22</span> */}
      </div>
    </div>
  );
};

export default SongShowcase;
