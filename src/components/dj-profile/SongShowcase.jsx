import React from "react";
import userAvatar from "../../assets/user-avatar.jpg";

const SongShowcase = () => {
  return (
    <div className="flex hover:scale-101 cursor-pointer border-b-1 pb-4 transition-all duration-200 items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={userAvatar}
          alt="Song"
          className="w-12 h-12 rounded-md object-cover"
        />
        <p>Blah black</p>
      </div>
      <div className="text-sm text-gray-400 flex gap-4">
        <span>1,834,433</span>
        <span>4:22</span>
      </div>
    </div>
  );
};

export default SongShowcase;
