import React from "react";
import usePlayLists from "../api/hooks/playlist/usePlayLists";
import LoadingState from "../components/States/LoadingState";
import { Link } from "react-router-dom";
import SiEmptyState from "../components/States/EmptyState";
import playlistImg from "../assets/playlist-1.jpg";
import genresImg from "../assets/genres.jpg";

const TrendingPlayList = () => {
  const { data: playlists, isLoading } = usePlayLists();

  console.log("Playlists => ", playlists);

  if (isLoading) return <LoadingState />;

  return (
    <section>
      <h2 className="text-2xl mt-14">Trending Playlists</h2>
      {/* <Link to="/explore" className="text-sm text-white hover:underline">
        See all
      </Link> */}

      {playlists && playlists.count === 0 ? (
        <SiEmptyState>No Playlists yet!</SiEmptyState>
      ) : (
        <div className="grid mt-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            // <Genre key={index} />
            <div className="item cursor-pointer hover:scale-105 transition-all duration-500 h-[165px] overflow-hidden relative rounded-[20px]">
              <img
                src={playlistImg}
                className="w-full h-[165px] object-cover"
                alt=""
              />
              <img
                src={genresImg}
                className="w-5 h-5 rounded-full object-cover pp-img"
                alt=""
              />
              <div className="blur-holder">
                <div className="blur playlist"></div>
                <div className="text-block playlist">gym playlist 69</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TrendingPlayList;
