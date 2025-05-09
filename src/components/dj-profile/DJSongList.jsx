import React from "react";
import useSongs from "../../api/hooks/songs/useSongs";
import LoadingState from "../States/LoadingState";
import SongShowcase from "./SongShowcase";
import useAuthUser from "../../api/hooks/useAuthUser";
import EmptyState from "../States/EmptyState";

const UserSongList = () => {
  const { data: userInfo } = useAuthUser();

  const { data: songs, isLoading } = useSongs({
    artist: userInfo ? userInfo.username : "",
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (!songs || songs.results.length === 0)
    return <EmptyState>No songs available</EmptyState>;

  return (
    <div className="lg:col-span-2 bg-[#161616] rounded-xl p-6 space-y-4">
      {songs.results.map((song, i) => (
        <SongShowcase key={i} song={song} />
      ))}
    </div>
  );
};

export default UserSongList;
