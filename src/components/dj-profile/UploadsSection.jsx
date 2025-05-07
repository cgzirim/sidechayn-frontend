import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import SongShowcase from "./SongShowcase";
import UploadModal from "../modals/upload-modal";
import SongUpload from "./SongUpload";
import AlbumsSection from "./AlbumsSection";

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

const UploadsSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="text-white mt-6 space-y-8">
      {/* Songs Section */}
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
        <div className="">
          {songs.map((song, idx) => (
            <SongShowcase key={idx} />
            // <div
            //   key={idx}
            //   className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
            // >
            //   <div className="relative">
            //     <img
            //       src={song.cover}
            //       alt={song.title}
            //       className="w-full h-40 object-cover"
            //     />
            //     <button className="absolute bottom-2 right-2 bg-white/10 hover:bg-white/20 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
            //       Play
            //     </button>
            //   </div>
            //   <div className="p-4 space-y-1">
            //     <h3 className="text-white font-semibold text-base truncate">
            //       {song.title}
            //     </h3>
            //     <p className="text-gray-400 text-sm">{song.duration}</p>
            //   </div>
            // </div>
          ))}
        </div>
      </div>

      {/* Albums Section */}
      <AlbumsSection />
    </div>
  );
};

export default UploadsSection;
