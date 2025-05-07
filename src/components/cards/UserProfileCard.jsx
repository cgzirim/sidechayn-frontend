import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import userAvatar from "../../assets/user-avatar.jpg";
import { Link } from "react-router-dom";

const UserProfileCard = ({ handleMobileSidebar }) => {
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

        <img src={userAvatar} className="w-[50px] h-[50px] rounded" alt="" />
        <span>Jack Wordby</span>
      </Link>
    </div>
  );
};

export default UserProfileCard;
