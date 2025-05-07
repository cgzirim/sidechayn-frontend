import React from "react";
import useAuthUser from "../../api/hooks/useAuthUser";
import LoadingState from "../States/LoadingState";
import { FaHeart } from "react-icons/fa";

const ProfileCardHeader = () => {
  const { data: userInfo, isLoading } = useAuthUser();

  if (isLoading) return <LoadingState />;

  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={userInfo.picture}
        alt={userInfo.name}
        className="w-28 h-28 rounded-full object-cover mb-4"
      />
      <h2 className="text-2xl font-semibold">{userInfo.name}</h2>
      <button className="flex items-center gap-2 mt-1 text-sm bg-[#1a1a1a] px-4 py-1 rounded-full">
        <FaHeart className="text-pink-500" />
        11k
      </button>
    </div>
  );
};

export default ProfileCardHeader;
