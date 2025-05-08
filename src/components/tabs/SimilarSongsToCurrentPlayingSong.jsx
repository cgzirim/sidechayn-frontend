import React from "react";
import albumCover from "../../assets/album-cover.jpg";
import userAvatar from "../../assets/user-avatar.jpg";
import useMusicStore from "../../stores/useMusicStore";
import useSongs from "../../api/hooks/songs/useSongs";

const SimilarSongsToCurrentPlayingSong = ({ setTagVisible, searchedSongs }) => {
  const { currentPlayingSong } = useMusicStore();

  const songGenre = currentPlayingSong
    ? currentPlayingSong.genre.replace("Genre object (", "").replace(")", "")
    : "";

  // console.log("currentPlayingSong => ", songGenre);

  const { data: songs, isLoading } = useSongs({ genre: songGenre });

  console.log("Songs for Genre => ", songs);
  return (
    <div className="mt-10">
      <h2 className="text-[#ffffff] text-lg flex justify-start items-center gap-3">
        Similar Songs
        <img
          onClick={() => setTagVisible(true)}
          src="https://cdn.prod.website-files.com/66b1e34f1cccd77056bac6df/67d835d6780ecd4ce4d51cdc_image%20(5).webp"
          className="img w-7 h-7 cursor-pointer opacity-60 hover:opacity-100"
          alt=""
        />
      </h2>
      'Genre object (9b5ab6e0-a115-4859-814d-02d0586b95b4)'
      <table className="table mt-5 w-full">
        <tbody>
          {searchedSongs.map((item, index) => (
            <tr
              key={index}
              className="table-row hover:bg-[#1f1f1f] cursor-pointer hover:scale=[1.03] transition-all duration-300 ease-in-out"
            >
              <td className="text-center pr-4 py-4">
                <span>💎</span> <br />
                <span className="text-[#ffffff] text-sm">{item.points}</span>
              </td>
              <td className="text-left py-4">
                <div className="flex justify-start items-center gap-3">
                  <img
                    src={albumCover}
                    className="w-[65px] h-[65px] rounded-[20px]"
                    alt=""
                  />
                  <div className="text">
                    <h2 className="text-[#ffffff] text-sm text-[17px]">
                      {item.title}
                    </h2>
                    <p className="text-[#ffffff9c] text-[15px]]">
                      {item.artist}
                    </p>
                  </div>
                </div>
              </td>
              <td className="text-left py-4">
                <div className="flex justify-start items-center gap-3">
                  <img
                    src={userAvatar}
                    className="w-[35px] h-[35px] rounded-full"
                    alt=""
                  />
                  <div className="text">
                    <h2 className="text-[#a8a8a8] text-sm text-[15px]">
                      {item.user}
                    </h2>
                  </div>
                </div>
              </td>
              <td className="text-left py-4">
                <p className="text-[#a8a8a8] text-[15px]">{item.duration}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimilarSongsToCurrentPlayingSong;
