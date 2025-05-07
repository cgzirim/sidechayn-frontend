// hooks/useTags.js
import apiClient from "../../apiClient";
import { useQuery } from "@tanstack/react-query";

const useTags = (config) => {
  const { searchTerm, limit } = config || {};
  return useQuery({
    queryKey: ["tags", searchTerm],
    queryFn: () =>
      apiClient
        .get("tags/", {
          params: {
            search: searchTerm,
            limit: limit,
          },
        })
        .then((res) => res.data),
    // enabled: !!searchTerm, // only fetch if searchTerm is not empty
  });
};

export default useTags;
