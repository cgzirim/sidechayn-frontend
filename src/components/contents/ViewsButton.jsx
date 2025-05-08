import React from "react";
import useMusicStore from "../../stores/useMusicStore";
import i3 from "../../assets/i3.webp";

const ViewsButton = () => {
  const { views, incrementViews } = useMusicStore();

  return (
    <button
      onClick={incrementViews}
      className="cursor-pointer bg-[#0e0e0e] hover:bg-[#353535] px-3 py-1 rounded-[40px] flex items-center gap-2 border border-[#353535]"
    >
      <img src={i3} alt="" className="w-[19px] h-[19px]" />
      <span className="text-[#ffffff9c] text-sm">{views}</span>
    </button>
  );
};

export default ViewsButton;
