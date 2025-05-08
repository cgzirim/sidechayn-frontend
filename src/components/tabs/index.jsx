import React, { useEffect, useState } from "react";
// import AnimatedButton from '../animated-button'

import "./tabs.css";
import SimilarSongsToCurrentPlayingSong from "./SimilarSongsToCurrentPlayingSong";
import Comments from "./Comments";

const Tabs = ({ setTagVisible }) => {
  const [currentTab, setCurrentTab] = useState(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const songList = [
    {
      id: 1,
      points: "new",
      title: "Search Blah Black",
      artist: "Drake",
      user: "User3442",
      duration: "4:22",
    },
    {
      id: 2,
      points: "22",
      title: "Blah Black",
      artist: "Drake",
      user: "User3442",
      duration: "4:22",
    },
    {
      id: 2,
      points: "22",
      title: "Blah Black",
      artist: "Drake",
      user: "User3442",
      duration: "4:22",
    },
    {
      id: 2,
      points: "22",
      title: "Blah Black",
      artist: "Drake",
      user: "User3442",
      duration: "4:22",
    },
    {
      id: 2,
      points: "22",
      title: "Blah Black",
      artist: "Drake",
      user: "User3442",
      duration: "4:22",
    },
    {
      id: 2,
      points: "22",
      title: "Blah Black",
      artist: "Drake",
      user: "User3442",
      duration: "4:22",
    },
    {
      id: 2,
      points: "22",
      title: "Blah Black",
      artist: "Drake",
      user: "User3442",
      duration: "4:22",
    },
    {
      id: 2,
      points: "22",
      title: "Blah Black",
      artist: "Drake",
      user: "User3442",
      duration: "4:22",
    },
  ];

  const [searchedSongs, setSearchedSongs] = useState([]);

  useEffect(() => {
    const filteredSongs = songList.filter((song) =>
      song.title.toLowerCase().includes("")
    );
    setSearchedSongs(filteredSongs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleSearch = (e) => {
  //     e.preventDefault()
  //     const searchValue = e.target.value

  //     const filteredSongs = songList.filter((song) =>
  //         song.title.toLowerCase().includes(searchValue.toLowerCase())
  //     )
  //     setSearchedSongs(filteredSongs)
  // }

  // // comments
  // const allComments = [
  //   {
  //     id: 1,
  //     userAvatar: userAvatar,
  //     userName: "User3442",
  //     comment:
  //       "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
  //     date: "5h ago",
  //     hearts: 25,
  //     thumbs: 5,
  //     replies: [
  //       {
  //         id: 1,
  //         userAvatar: userAvatar,
  //         userName: "User3442",
  //         comment:
  //           "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
  //         date: "5h ago",
  //         hearts: 25,
  //         thumbs: 5,
  //       },
  //     ],
  //   },
  //   {
  //     id: 1,
  //     userAvatar: userAvatar,
  //     userName: "User3442",
  //     comment:
  //       "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
  //     date: "5h ago",
  //     hearts: 25,
  //     thumbs: 5,
  //     replies: [
  //       {
  //         id: 1,
  //         userAvatar: userAvatar,
  //         userName: "User3442",
  //         comment:
  //           "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
  //         date: "5h ago",
  //         hearts: 25,
  //         thumbs: 5,
  //       },
  //     ],
  //   },
  //   {
  //     id: 1,
  //     userAvatar: userAvatar,
  //     userName: "User3442",
  //     comment:
  //       "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
  //     date: "5h ago",
  //     hearts: 25,
  //     thumbs: 5,
  //     replies: [
  //       {
  //         id: 1,
  //         userAvatar: userAvatar,
  //         userName: "User3442",
  //         comment:
  //           "I think self-publishing is probably a lot easier now because of social media and other ways to marke",
  //         date: "5h ago",
  //         hearts: 25,
  //         thumbs: 5,
  //       },
  //     ],
  //   },
  // ];

  // const [comments, setComments] = useState([]);

  // useEffect(() => {
  //   setComments(allComments);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const tags = [
    "Empowerment (311)",
    "Exciting (213)",
    "Inspirational (99)",
    "Sad (34)",
    "Anticipation (11)",
  ];

  return (
    <div>
      <div className="tabs-wrapper bg-[#141414] p-3 rounded-[30px]">
        <div className="flex justify-between items-center gap-3">
          <button
            onClick={() => setCurrentTab(1)}
            className={`tab-btn w-full cursor-pointer text-center py-3 rounded-full font-500 hover:bg-black ${
              currentTab === 1 ? "bg-black" : ""
            }`}
          >
            <span className="text-[#ffffff] text-sm">More Like This</span>
          </button>
          <button
            onClick={() => setCurrentTab(3)}
            className={`tab-btn w-full cursor-pointer text-center py-3 rounded-full font-500 hover:bg-black ${
              currentTab === 3 ? "bg-black" : ""
            }`}
          >
            <span className="text-[#ffffff] text-sm">Comments</span>
          </button>
        </div>
      </div>

      {/* tab panes */}
      <div className="tab-panes mt-5 xl:p-6 p-2">
        {currentTab === 1 && (
          <div className="tab-pane">
            <h2 className="text-[#ffffff] text-lg flex justify-start items-center gap-3">
              Tags
              <img
                onClick={() => setTagVisible(true)}
                src="https://cdn.prod.website-files.com/66b1e34f1cccd77056bac6df/67d835d6780ecd4ce4d51cdc_image%20(5).webp"
                className="img w-7 h-7 cursor-pointer opacity-60 hover:opacity-100"
                alt=""
              />
            </h2>

            <div className="flex mt-3 justify-start items-center gap-6 flex-wrap">
              {tags.map((tag, index) => (
                <span key={index} className={`grad-${index + 1} text-sm`}>
                  {tag}
                </span>
              ))}
            </div>

            <SimilarSongsToCurrentPlayingSong
              setTagVisible={setTagVisible}
              searchedSongs={searchedSongs}
            />
          </div>
        )}
        {currentTab === 3 && <Comments />}
      </div>
    </div>
  );
};

export default Tabs;
