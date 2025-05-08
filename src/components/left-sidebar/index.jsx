import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import homeIcon from "../../assets/home.svg";
import exploreIcon from "../../assets/explore.svg";
import savedTracksIcon from "../../assets/saved-tracks.png";
import achievementsIcon from "../../assets/achievements.png";
import settingsIcon from "../../assets/settings.png";
import AnimatedButton from "../animated-button";

import "./left-sidebar.css";
import { FaChevronLeft } from "react-icons/fa";
import LoginRegButton from "../buttons/LoginRegButton";
import UserProfileCard from "../cards/UserProfileCard";

import { useAuth } from "../../api/hooks/useAuth";

const LeftSidebar = ({
  bar,
  handleBar,
  setBar,
  setModalVisible,
  handleClick,
  handleMobileSidebar,
  handleComingSoonClick,
  handleComingSoonClose,
}) => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const isAuth = isAuthenticated();

  console.log("isAuth =>", isAuth);

  const menuItems = [
    {
      name: "Home",
      icon: homeIcon,
      link: "/",
    },
    {
      name: "Explore",
      icon: exploreIcon,
      link: "/explore",
    },
    {
      name: "Saved Tracks",
      icon: savedTracksIcon,
      // link: "/saved-tracks"
      action: handleComingSoonClick,
    },
    {
      name: "Achievements",
      icon: achievementsIcon,
      // link: "/achievements"
      action: handleComingSoonClick,
    },
    {
      name: "Settings",
      icon: settingsIcon,
      // link: "/settings"
      action: handleComingSoonClick,
    },
  ];
  return (
    <div className="px-4 py-5">
      {isAuth ? (
        <UserProfileCard handleMobileSidebar={handleMobileSidebar} />
      ) : (
        <LoginRegButton handleMobileSidebar={handleMobileSidebar} />
      )}

      <div className="line bg-[#eeedf22e] h-[2px] my-6"></div>

      <ul className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.link ? (
              <NavLink
                onClick={handleMobileSidebar}
                to={item.link}
                className="text-sm sidebar-link text-[#000] block py-2 px-4 hover:bg-[#202020] transition duration-300 ease-in-out"
              >
                <span className="flex items-center justify-start gap-3">
                  <img
                    src={item.icon}
                    className={`home-icon max-w-full w-4  ${
                      index === 4 ? "" : "opacity-60"
                    } ${index <= 1 ? "invert" : ""}`}
                    alt=""
                  />
                  <span className="text-white">{item.name}</span>
                </span>
              </NavLink>
            ) : (
              <button
                onClick={item.action}
                className="text-sm w-full cursor-pointer sidebar-link text-[#000] block py-2 px-4 hover:bg-[#202020] transition duration-300 ease-in-out"
              >
                <span className="flex items-center justify-start gap-3">
                  <img
                    src={item.icon}
                    className={`home-icon max-w-full w-4  ${
                      index === 4 ? "" : "opacity-60"
                    } ${index <= 1 ? "invert" : ""}`}
                    alt=""
                  />
                  <span className="text-white">{item.name}</span>
                </span>
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* fyi */}
      <div className="fyi mt-14 card border border-[#828282] p-3 rounded-[20px]">
        <h2 className="text-[22px] font-bold italic">FYI!</h2>

        <p className="text-xs">
          Sidechayn is in beta development and will not be released to the
          public until May 2025.
          <br />
          <br />
          <Link to="/privacy-policy" className="text-[#fff] hover:underline">
            <b>Click here</b> to see upcoming features & report bugs / issues.
          </Link>
        </p>
      </div>

      {isAuth && (
        <AnimatedButton
          bar={bar}
          handleBar={handleBar}
          setBar={setBar}
          handleClick={handleClick}
        />
      )}
    </div>
  );
};

export default LeftSidebar;
