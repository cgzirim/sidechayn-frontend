import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

const Upvote = ({ song }) => {
  const [upvotes, setUpvotes] = useState(0);

  const [isUpvoted, setIsUpvoted] = useState(false);

  const toggleUpvote = async () => {
    const newIsUpvoted = !isUpvoted;
    setIsUpvoted(newIsUpvoted);
    setUpvotes((prev) => prev + (newIsUpvoted ? 1 : -1));

    try {
      await apiClient.patch(`songs/${song.id}/upvote/`, {
        upvote_song: newIsUpvoted,
      });
    } catch (error) {
      console.error("Error toggling upvote", error);
      // Revert on failure
      setIsUpvoted(!newIsUpvoted);
      setUpvotes((prev) => prev - (newIsUpvoted ? 1 : -1));
    }
  };

  useEffect(() => {
    setUpvotes(song.total_upvotes);
    setIsUpvoted(song.i_upvoted || false);
  }, []);

  return (
    <button onClick={toggleUpvote} className="flex flex-col items-center group">
      <span
        className={`text-2xl transition-colors ${
          isUpvoted ? "text-pink-500" : "text-gray-400 group-hover:text-white"
        }`}
      >
        ♦
      </span>
      <span className="text-white text-sm">{upvotes}</span>
    </button>
  );
};

export default Upvote;
