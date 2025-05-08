import React from "react";
import useMusicStore from "../../stores/useMusicStore";
import i2 from "../../assets/i2.webp";

const LikesButton = () => {
  const { likes, incrementLikes } = useMusicStore();

  return (
    <button
      onClick={incrementLikes}
      className="cursor-pointer bg-[#0e0e0e] hover:bg-[#353535] px-3 py-1 rounded-[40px] flex items-center gap-2 border border-[#353535]"
    >
      <img src={i2} alt="" className="w-[19px] h-[19px]" />
      <span className="text-[#ffffff9c] text-sm">{likes}</span>
    </button>
  );
};

export default LikesButton;
