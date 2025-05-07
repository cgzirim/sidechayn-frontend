import { useQuery } from "@tanstack/react-query";
import React from "react";
import apiClient from "../apiClient";
import useBearer from "./useBearer";

const useAuthUser = () => {
  //   const { searchTerm, limit } = config || {};

  const bearer = useBearer();

  return useQuery({
    queryKey: ["users", "auth", "user"],
    queryFn: () =>
      apiClient
        .get("users/auth/user/", {
          //   params: {
          //     search: searchTerm,
          //     limit: limit,
          //   },
          headers: {
            // "Content-Type": "multipart/form-data",
            ...bearer,
          },
        })
        .then((res) => res.data),
    // enabled: !!searchTerm, // only fetch if searchTerm is not empty
  });
};

export default useAuthUser;
