import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import AlbumUploadModal from "./AlbumUpload";

const albums = [
  {
    title: "Midnight Grooves",
    year: "2023",
    cover:
      "http://localhost:3000/static/media/user-avatar.6829ea10ad5b387807d6.jpg",
    songs: 8,
  },
  {
    title: "Afro Heat",
    year: "2022",
    cover:
      "http://localhost:3000/static/media/user-avatar.6829ea10ad5b387807d6.jpg",
    songs: 10,
  },
];

const AlbumsSection = () => {
  const [showModal, setShowModal] = useState(false);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {albums.map((album, idx) => (
          <div
            key={idx}
            className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
          >
            <img
              src={album.cover}
              alt={album.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-1">
              <h3 className="text-white font-semibold text-base truncate">
                {album.title}
              </h3>
              <p className="text-gray-400 text-sm">Released: {album.year}</p>
              <p className="text-gray-400 text-sm">{album.songs} songs</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumsSection;
