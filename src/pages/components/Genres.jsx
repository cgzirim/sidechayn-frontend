import React from "react";
import { Link } from "react-router-dom";

import useGenres from "../../api/hooks/genre/useGenres";
import Genre from "../../components/genre";

const Genres = () => {
  const { data, isLoading } = useGenres({ limit: 12 });

  if (isLoading) return <div className="loader">Loading...</div>;

  if (data?.results?.length === 0) return <div>No genres found</div>;

  console.log("first", data);
  if (data?.results?.length > 0)
    return (
      <div className="left w-full xl:min-w-9/12 ">
        <h2 className="text-2xl">Genres</h2>
        <Link to="/explore" className="text-sm text-white hover:underline">
          See all
        </Link>

        <div className="grid mt-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-3">
          {data?.results?.map((genre) => (
            <Genre key={genre.id} genre={genre} />
          ))}
        </div>
      </div>
    );
};

export default Genres;
