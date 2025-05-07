// hooks/useGenres.js
import apiClient from "../../apiClient";
import { useQuery } from "@tanstack/react-query";

const useAlbums = (config) => {
  const { searchTerm, limit, artist } = config || {};
  return useQuery({
    queryKey: ["albums", config],
    queryFn: () =>
      apiClient
        .get("albums/", {
          params: {
            search: searchTerm,
            limit: limit,
            artist: artist,
          },
        })
        .then((res) => res.data),
    // enabled: !!searchTerm, // only fetch if searchTerm is not empty
  });
};

export default useAlbums;
