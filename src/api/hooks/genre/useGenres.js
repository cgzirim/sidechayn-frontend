// hooks/useGenres.js
import apiClient from "../../apiClient";
import { useQuery } from "@tanstack/react-query";

const useGenres = (config) => {
  const { searchTerm, limit } = config || {};
  return useQuery({
    queryKey: ["genres", searchTerm],
    queryFn: () =>
      apiClient
        .get("genres/", {
          params: {
            search: searchTerm,
            limit: limit,
          },
        })
        .then((res) => res.data),
    // enabled: !!searchTerm, // only fetch if searchTerm is not empty
  });
};

export default useGenres;
