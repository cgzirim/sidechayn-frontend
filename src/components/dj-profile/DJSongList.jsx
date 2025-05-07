import React from "react";
import useSongs from "../../api/hooks/songs/useSongs";
import LoadingState from "../States/LoadingState";
import SongShowcase from "./SongShowcase";

const DJSongList = () => {
  const { data: songs, isLoading } = useSongs();

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 bg-[#161616] rounded-xl p-6 space-y-4">
        {songs.results.map((song, i) => (
          <SongShowcase key={i} song={song} />
        ))}
      </div>
      <div className="bg-[#161616] rounded-xl p-6 text-center">
        <p className="text-gray-400 text-sm">Last Active</p>
      </div>
    </div>
  );
};

export default DJSongList;
