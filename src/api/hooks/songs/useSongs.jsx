// hooks/useGenres.js
import apiClient from "../../apiClient";
import { useQuery } from "@tanstack/react-query";

const useSongs = (config) => {
  const { searchTerm, limit, genre, artist } = config || {};
  return useQuery({
    queryKey: ["songs", config],
    queryFn: () =>
      apiClient
        .get("songs/", {
          params: {
            search: searchTerm,
            limit: limit,
            genre: genre,
            artist: artist,
          },
        })
        .then((res) => res.data),
    // enabled: !!searchTerm, // only fetch if searchTerm is not empty
  });
};

export default useSongs;
