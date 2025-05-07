import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// import dotsIcon from "../../assets/dots.png"
import artist from "../../assets/artist.jpg";

import i1 from "../../assets/i1.webp";
import i2 from "../../assets/i2.webp";
import i3 from "../../assets/i3.webp";
import i4 from "../../assets/i4.webp";
import download from "../../assets/download.png";

import cover from "../../assets/cover.jpg";
import Tabs from "../tabs";

import "./contents.css";
import MoodModal from "../modals/mood-modal";
import TagsModal from "../modals/tags";
import MusicPlayer from "./MusicPlayer";

const Contents = ({ bar }) => {
  const [shares, setShares] = React.useState(0);
  const [likes, setLikes] = React.useState(0);
  const [views, setViews] = React.useState(0);
  const [saves, setSaves] = React.useState(0);

  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn((prev) => !prev);
  };

  const [moodVisible, setMoodVisible] = useState(false);
  const handleMoodClose = () => {
    setMoodVisible(false);
  };
  const [tagVisible, setTagVisible] = useState(false);
  const handleTagClose = () => {
    setTagVisible(false);
  };

  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pb-0 md:pb-10">
      <div className="flex justify-between items-center gap-2">
        <h2 className="text-lg text-white">TrueFidelity® Mode?</h2>

        <div
          onClick={toggleSwitch}
          className={`flex hover:scale-[1.01] hover:text-white transition-[0.3s] items-center px-2 py-1 rounded-[40px] cursor-pointer transition-all duration-300 ${
            isOn ? "bg-blue-500" : "bg-[#0e0e0e]"
          }`}
        >
          {/* Dynamic order */}
          {isOn ? (
            <>
              <span className="text-[#ffffff9c] uppercase font-bold">ON</span>
              <div className="w-[20px] h-[20px] bg-white rounded-full ml-2 transition-all duration-300"></div>
            </>
          ) : (
            <>
              <div className="w-[20px] h-[20px] bg-[#757575] rounded-full mr-2 transition-all duration-300"></div>
              <span className="text-[#ffffff9c] uppercase font-bold">OFF</span>
            </>
          )}
        </div>
      </div>

      {/* music player */}

      <MusicPlayer bar={bar} />

      <div className="tabs bg-[#0c0c0c] mt-5 xl:p-6 p-2 rounded-[30px]">
        <Tabs setTagVisible={setTagVisible} />
      </div>

      {moodVisible && <MoodModal handleClose={handleMoodClose} />}
      {tagVisible && <TagsModal handleClose={handleTagClose} />}
    </div>
  );
};

export default Contents;
