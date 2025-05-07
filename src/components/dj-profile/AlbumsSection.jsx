import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import AlbumUploadModal from "./AlbumUpload";
import useAlbums from "../../api/hooks/albums/useAlbums";
import useAuthUser from "../../api/hooks/useAuthUser";

import EmptyState from "../States/EmptyState";

const AlbumsSection = () => {
  const [showModal, setShowModal] = useState(false);
  const { data: userInfo } = useAuthUser();

  const { data: albums, isLoading } = useAlbums({ artist: userInfo?.username });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {showModal && (
        <AlbumUploadModal handleClose={() => setShowModal(false)} />
      )}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">DJ Daniel's Albums</h2>
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-800 hover:bg-gray-700 transition"
          onClick={() => setShowModal(true)}
        >
          {/* <BiPlus size={16} /> */}
          <BiPlus size={16} />
          <span className="text-sm">Add Album</span>
        </button>
      </div>

      {(!albums || albums.results.length === 0) && (
        <EmptyState>No albums added yet!</EmptyState>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {albums.results.map((album, idx) => (
          <div
            key={idx}
            className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
          >
            <img
              src={album.cover_image}
              alt={album.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-1">
              <h3 className="text-white font-semibold text-base truncate">
                {album.title}
              </h3>
              <p className="text-gray-400 text-sm">
                Released: {album.release_date}
              </p>
              <p className="text-gray-400 text-sm">{album.total_songs} songs</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumsSection;
