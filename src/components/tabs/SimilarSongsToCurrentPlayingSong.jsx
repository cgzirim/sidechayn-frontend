import React from "react";
import albumCover from "../../assets/album-cover.jpg";
import userAvatar from "../../assets/user-avatar.jpg";
import useMusicStore from "../../stores/useMusicStore";
import useSongs from "../../api/hooks/songs/useSongs";
import LoadingState from "../States/LoadingState";
import EmptyState from "../States/EmptyState";
import splitDuration from "../../utils/splitDuration";

const SimilarSongsToCurrentPlayingSong = ({ setTagVisible, searchedSongs }) => {
  const { currentPlayingSong } = useMusicStore();

  const songGenre = currentPlayingSong ? currentPlayingSong.genre : "";

  // console.log("currentPlayingSong => ", songGenre);

  const { data: songs, isLoading } = useSongs({ genre: songGenre });

  console.log("Songs for Genre => ", songs);

  if (isLoading) return <LoadingState />;

  // if (!songs || songs.results.legnth === 0) return <EmptyState />;

  //   [
  //     {
  //         "id": "2df70b0f-47f5-467a-8e4a-d6376dda604d",
  //         "genre": {
  //             "id": "34cbdc0d-0aa9-4a3e-a89e-e4ee5e168699",
  //             "name": "Pop",
  //             "description": null,
  //             "cover_image": "https://sidechayn.sfo3.digitaloceanspaces.com/sidechayn/default/genre_img.jpg",
  //             "created_at": "2025-05-08T02:25:23.439955Z",
  //             "updated_at": "2025-05-08T02:25:23.439991Z"
  //         },
  //         "tags": {
  //             "3c9d5abc-001b-43e3-bb2e-a48058a2fb0e": {
  //                 "name": "Happy",
  //                 "desc": null
  //             }
  //         },
  //         "artist": {
  //             "id": "04ccb0ca-9450-4e0b-9ffd-583733f8b560",
  //             "username": "default",
  //             "name": "Default User",
  //             "picture": "https://sidechayn.sfo3.digitaloceanspaces.com/sidechayn/default/profile_pic.png"
  //         },
  //         "album": null,
  //         "audio_file": "https://sidechayn.sfo3.digitaloceanspaces.com/sidechayn/audio/2df70b0f-47f5-467a-8e4a-d6376dda604d",
  //         "total_likes": 0,
  //         "total_saves": 0,
  //         "total_shares": 0,
  //         "title": "4 Wings",
  //         "release_date": "2025-05-08",
  //         "key": null,
  //         "bpm": null,
  //         "description": null,
  //         "duration": "00:01:00.023583",
  //         "cover_image": "https://sidechayn.sfo3.digitaloceanspaces.com/sidechayn/scvi/2df70b0f-47f5-467a-8e4a-d6376dda604d",
  //         "uploaded_at": "2025-05-08T02:34:13.774179Z",
  //         "updated_at": "2025-05-08T02:34:13.774230Z"
  //     }
  // ]

  if (songs && songs.results.length)
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
        <table className="table mt-5 w-full">
          <tbody>
            {songs.results.map((song, index) => (
              <tr
                key={index}
                className="table-row hover:bg-[#1f1f1f] cursor-pointer hover:scale=[1.03] transition-all duration-300 ease-in-out"
              >
                <td className="text-center pr-4 py-4">
                  <span>💎</span> <br />
                  <span className="text-[#ffffff] text-sm">
                    {"song.points"}
                  </span>
                </td>
                <td className="text-left py-4">
                  <div className="flex justify-start items-center gap-3">
                    <img
                      src={
                        song.album ? song.album.cover_image : song.cover_image
                      }
                      className="w-[65px] h-[65px] rounded-[20px]"
                      alt=""
                    />
                    <div className="text">
                      <h2 className="text-[#ffffff] text-sm text-[17px]">
                        {song.title}
                      </h2>
                      <p className="text-[#ffffff9c] text-[15px]]">
                        {song.artist.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-left py-4">
                  <div className="flex justify-start items-center gap-3">
                    <img
                      src={song.artist.picture}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                    <div className="text">
                      <h2 className="text-[#a8a8a8] text-sm text-[15px]">
                        {"song.user"}
                      </h2>
                    </div>
                  </div>
                </td>
                <td className="text-left py-4">
                  <p className="text-[#a8a8a8] text-[15px]">
                    {splitDuration(song.duration)}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default SimilarSongsToCurrentPlayingSong;
