// hooks/useGenres.js
import apiClient from "../../apiClient";
import { useQuery } from "@tanstack/react-query";

const useComments = (config) => {
  const { searchTerm, limit, song } = config || {};
  return useQuery({
    queryKey: ["comments", searchTerm],
    queryFn: () =>
      apiClient
        .get("comments/", {
          params: {
            search: searchTerm,
            limit: limit,
            song: song,
          },
        })
        .then((res) => res.data),
    // enabled: !!searchTerm, // only fetch if searchTerm is not empty
  });
};

export default useComments;
