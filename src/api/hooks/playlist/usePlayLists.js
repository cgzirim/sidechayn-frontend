// hooks/useGenres.js
import apiClient from "../../apiClient";
import { useQuery } from "@tanstack/react-query";

const usePlayLists = (config) => {
  const { searchTerm, limit } = config || {};
  return useQuery({
    queryKey: ["playlists", searchTerm],
    queryFn: () =>
      apiClient
        .get("playlists/", {
          params: {
            search: searchTerm,
            limit: limit,
          },
        })
        .then((res) => res.data),
    // enabled: !!searchTerm, // only fetch if searchTerm is not empty
  });
};

export default usePlayLists;
