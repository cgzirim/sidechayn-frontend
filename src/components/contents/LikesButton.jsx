import React from "react";
import i2 from "../../assets/i2.webp";
import apiClient from "../../api/apiClient";
import { useAuth } from "../../api/hooks/useAuth";
import { toast } from "sonner";
import protectedMsg from "../../utils/protectedMsg";

const LikesButton = ({ likes, songId, isLiked, setIsLiked, setLikes }) => {
  const { isAuthenticated } = useAuth();
  const isAuth = isAuthenticated();

  const toggleLike = async () => {
    if (!isAuth) {
      return toast.message(protectedMsg("like"));
    }

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
          ? "bg-[#0e1a2a] border-[#3daeff]"
          : "bg-[#0e0e0e] hover:bg-[#353535] border-[#353535]"
      }`}
    >
      <img
        src={i2}
        alt=""
        className="w-[19px] h-[19px]"
        style={{
          filter: isLiked
            ? "brightness(0) saturate(100%) invert(51%) sepia(71%) saturate(558%) hue-rotate(175deg) brightness(102%) contrast(101%)"
            : "none",
        }}
      />
      <span
        className={`text-sm ${isLiked ? "text-[#3daeff]" : "text-[#ffffff9c]"}`}
      >
        {likes}
      </span>
    </button>
  );
};

export default LikesButton;
