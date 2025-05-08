import React from "react";
import i2 from "../../assets/i2.webp";
import apiClient from "../../api/apiClient";

const LikesButton = ({ likes, songId, isLiked, setIsLiked, setLikes }) => {
  const toggleLike = async () => {
    const newIsLiked = !isLiked;

    setIsLiked(newIsLiked);
    setLikes((prev) => prev + (newIsLiked ? 1 : -1));

    try {
      await apiClient.patch(`songs/${songId}/like/`, {
        likes_song: newIsLiked,
      });
    } catch (error) {
      console.error("Error toggling like", error);
      // Revert on failure
      setIsLiked(!newIsLiked);
      setLikes((prev) => prev - (newIsLiked ? 1 : -1));
    }
  };

  return (
    <button
      onClick={toggleLike}
      className={`cursor-pointer px-3 py-1 rounded-[40px] flex items-center gap-2 border ${
        isLiked
          ? "bg-[#2a0e0e] border-[#ff4d4d]"
          : "bg-[#0e0e0e] hover:bg-[#353535] border-[#353535]"
      }`}
    >
      <img
        src={i2}
        alt=""
        className="w-[19px] h-[19px]"
        style={{
          filter: isLiked
            ? "brightness(0) saturate(100%) invert(28%) sepia(89%) saturate(748%) hue-rotate(335deg) brightness(97%) contrast(107%)"
            : "none",
        }}
      />
      <span
        className={`text-sm ${isLiked ? "text-[#ff4d4d]" : "text-[#ffffff9c]"}`}
      >
        {likes}
      </span>
    </button>
  );
};

export default LikesButton;
