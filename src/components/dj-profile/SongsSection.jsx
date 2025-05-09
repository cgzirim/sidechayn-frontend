import React, { useState } from "react";
import userAvatar from "../../assets/user-avatar.jpg";
import useSongs from "../../api/hooks/songs/useSongs";
import SongUpload from "./SongUpload";
import { BiPlus } from "react-icons/bi";
import EmptyState from "../States/EmptyState";
import LoadingState from "../States/LoadingState";
import UserSongList from "./DJSongList";

const SongsSection = () => {
  const [showModal, setShowModal] = useState(false);

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

      <UserSongList />
    </div>
  );
};

export default SongsSection;
