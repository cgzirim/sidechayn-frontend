import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import userAvatar from "../../assets/user-avatar.jpg";
import UserCard from "../user-card";
import UploadsSection from "./UploadsSection";
import SongShowcase from "./SongShowcase";
import DJSongList from "./DJSongList";
import useAuthUser from "../../api/hooks/useAuthUser";
import ProfileCardHeader from "./ProfileCardHeader";

const TABS = ["All", "Playlists", "Users", "Uploads", "Achievements"];

const PlaylistSection = () => (
  <div className="text-white mt-6 space-y-6">
    <div>
      <h2 className="text-xl font-semibold mb-2">Default Playlists</h2>
      <p className="text-lg">
        • Chill Vibes
        <br />• Party Starter
      </p>
    </div>
    <div>
      <h2 className="text-xl font-semibold mb-2">Custom Playlists</h2>
      <p className="text-lg">
        • Daniel's Dropz
        <br />• Night Drives
      </p>
    </div>
  </div>
);

const UsersSection = () => {
  return (
    <div className="text-white space-y-10 mt-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Liked By DJ Daniel</h2>
        <div className="grid lg:grid-cols-2 gap-4">
          <UserCard name="Timmy Trumpet" listeners="12M" icon="📊" />
          <UserCard name="Ariana Grande" listeners="12M" icon="🔥" />
          <UserCard name="HEAP" listeners="12M" icon="🧱" />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Likers Of DJ Daniel</h2>
        <div className="grid lg:grid-cols-2 gap-4">
          <UserCard name="Timmy Trumpet" listeners="12M" icon="📊" />
          <UserCard name="Ariana Grande" listeners="12M" icon="🔥" />
          <UserCard name="HEAP" listeners="12M" icon="🧱" />
        </div>
      </div>
    </div>
  );
};

const DJProfile = () => {
  const [activeTab, setActiveTab] = useState("All");

  const renderTabContent = () => {
    switch (activeTab) {
      case "All":
        return (
          <div className="mt-6 space-y-12">
            {/* Stats Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-[#161616] rounded-xl p-6 text-center">
                <h3 className="text-2xl font-bold">1M</h3>
                <p className="text-sm text-gray-400 mt-1">Monthly Streams</p>
              </div>
              <div className="bg-[#161616] rounded-xl p-6 text-center">
                <h3 className="text-2xl font-bold">#13</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Ranked On Sidechayn
                </p>
              </div>
              <div className="bg-[#161616] rounded-xl p-6 text-center">
                <h3 className="text-2xl font-bold">10 Feb 2025</h3>
                <p className="text-sm text-gray-400 mt-1">First upload date</p>
              </div>
            </div>

            {/* Songs & Last Active */}
            <DJSongList />
          </div>
        );
      case "Playlists":
        return <PlaylistSection />;
      case "Users":
        return <UsersSection />;
      case "Uploads":
        return <UploadsSection />;
      case "Achievements":
        return (
          <div className="mt-6 text-gray-400">🏆 Achievements unlocked!</div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 font-sans">
      {/* Profile Section */}

      <ProfileCardHeader />

      {/* Tabs */}
      <div className="flex justify-center mt-10 space-x-5 lg:space-x-8 text-gray-400 border-b border-[#2e2e2e] pb-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`text-sm pb-1 cursor-pointer hover:border-b-2 hover:border-violet-500 transition-all duration-200 ${
              activeTab === tab ? "text-white border-b-2 border-violet-500" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default DJProfile;
