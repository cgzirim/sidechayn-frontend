import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import userAvatar from "../../assets/user-avatar.jpg";
import { Link } from "react-router-dom";
import useAuthUser from "../../api/hooks/useAuthUser";
import LoadingState from "../States/LoadingState";
import LoginRegButton from "../buttons/LoginRegButton";

const UserProfileCard = ({ handleMobileSidebar }) => {
  const { data: userInfo, isLoading } = useAuthUser();

  if (isLoading) return <LoadingState />;

  if (!userInfo) return <LoginRegButton />;

  if (userInfo)
    return (
      <div className="flex justify-start items-center gap-3">
        <button className="lg:hidden block mr-5" onClick={handleMobileSidebar}>
          <FaChevronLeft className="text-[#ffffff9c] text-2xl" />
        </button>
        <Link
          to={"/profile"}
          className="flex justify-start items-center gap-3 flex px-1 py-2"
          onClick={handleMobileSidebar}
        >
          {/* back button */}
          <img
            src={userInfo.picture}
            className="w-[50px] h-[50px] rounded"
            alt=""
          />
          <span>{userInfo.name}</span>
        </Link>
      </div>
    );
};

export default UserProfileCard;
