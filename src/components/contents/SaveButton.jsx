import React from "react";
import useMusicStore from "../../stores/useMusicStore";

import i4 from "../../assets/i4.webp";

const SaveButton = ({ savedCount, setSavedCount }) => {
  const { saves, toggleSaves } = useMusicStore();
  return (
    <button
      onClick={() => setSavedCount(savedCount + 2)}
      className="cursor-pointer bg-[#0e0e0e] hover:bg-[#353535] px-3 py-1 rounded-[40px] flex items-center gap-2 border border-[#353535]"
    >
      <img src={i4} alt="" className="w-[19px] h-[19px]" />
      <span className="text-[#ffffff9c] text-sm">{savedCount}</span>
    </button>
  );
};

export default SaveButton;
