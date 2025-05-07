import React, { useState } from "react";
import userAvatar from "../../assets/user-avatar.jpg";
import useSongs from "../../api/hooks/songs/useSongs";
import SongUpload from "./SongUpload";
import { BiPlus } from "react-icons/bi";
import EmptyState from "../EmptyState";

const songs = [
  {
    title: "Chill Vibes",
    duration: "3:45",
    cover:
      "http://localhost:3000/static/media/user-avatar.6829ea10ad5b387807d6.jpg",
  },
  {
    title: "Party Starter",
    duration: "4:10",
    cover:
      "http://localhost:3000/static/media/user-avatar.6829ea10ad5b387807d6.jpg",
  },
];

const SongsSection = () => {
  const [showModal, setShowModal] = useState(false);

  const { data: songs, isLoading } = useSongs();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {showModal && (
        <SongUpload handleSongUploadClose={() => setShowModal(false)} />
      )}

      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">DJ Daniel's Songs</h2>
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-800 hover:bg-gray-700 transition"
          onClick={() => setShowModal(true)}
        >
          <BiPlus size={16} />
          <span className="text-sm">Add Song</span>
        </button>
      </div>

      {(!songs || songs.results.length === 0) && (
        <EmptyState>No songs available</EmptyState>
      )}

      <div className="">
        {songs.results.map((song, idx) => (
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
        ))}
      </div>
    </div>
  );
};

export default SongsSection;
