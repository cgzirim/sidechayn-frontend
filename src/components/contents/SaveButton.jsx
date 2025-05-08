import React from "react";
import useMusicStore from "../../stores/useMusicStore";

import i4 from "../../assets/i4.webp";
import apiClient from "../../api/apiClient";

const SaveButton = ({ saves, setSaves, setIsSaved, isSaved, songId }) => {
  const toggleSave = async () => {
    const newIsSaved = !isSaved;
    setIsSaved(newIsSaved);
    setSaves((prev) => prev + (newIsSaved ? 1 : -1));

    try {
      await apiClient.patch(`songs/${songId}/save/`, {
        save_song: newIsSaved,
      });
    } catch (error) {
      console.error("Error toggling save", error);
      // Revert on failure
      setIsSaved(!newIsSaved);
      setSaves((prev) => prev - (newIsSaved ? 1 : -1));
    }
  };

  return (
    <button
      onClick={toggleSave}
      className={`cursor-pointer px-3 py-1 rounded-[40px] flex items-center gap-2 border ${
        isSaved
          ? "bg-[#0e1a2a] border-[#3daeff]"
          : "bg-[#0e0e0e] hover:bg-[#353535] border-[#353535]"
      }`}
    >
      <img
        src={i4}
        alt=""
        className="w-[19px] h-[19px]"
        style={{
          filter: isSaved
            ? "brightness(0) saturate(100%) invert(51%) sepia(71%) saturate(558%) hue-rotate(175deg) brightness(102%) contrast(101%)"
            : "none",
        }}
      />
      <span
        className={`text-sm ${isSaved ? "text-[#3daeff]" : "text-[#ffffff9c]"}`}
      >
        {saves}
      </span>
    </button>
  );
};

export default SaveButton;
