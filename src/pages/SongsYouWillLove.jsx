import React from "react";
import { Link } from "react-router-dom";
import LikedSong from "../components/liked-song";
import useSongs from "../api/hooks/songs/useSongs";
import LoadingState from "../components/States/LoadingState";

const SongsYouWillLove = () => {
  const { data: songs, isLoading } = useSongs();

  if (isLoading) return <LoadingState />;

  if (songs)
    return (
      <div>
        <h2 className="text-2xl mt-14">Songs You'll LOVE</h2>
        {/* <Link to="/explore" className="text-sm text-white hover:underline">
        See all
      </Link> */}

        {songs.results.map((song, index) => (
          <LikedSong song={song} key={index} />
        ))}
      </div>
    );
};

export default SongsYouWillLove;
