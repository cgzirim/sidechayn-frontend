import apiClient from "../../api/apiClient";
import { useQuery } from "@tanstack/react-query";

const useGenres = (productQuery) => {
  return useQuery({
    queryKey: ["products", productQuery],
    queryFn: () =>
      apiClient.get("genres/", {
        // params: {
        //   page: productQuery?.page,
        //   search: productQuery?.searchTerm,
        //   limit: productQuery?.limit,
        //   published: productQuery?.published,
        //   featured: productQuery?.featured,
        // },
        // headers: {
        //   ...bearer,
        // },
      }),
    // placeholderData: keepPreviousData,
  });
};

export default useGenres;
