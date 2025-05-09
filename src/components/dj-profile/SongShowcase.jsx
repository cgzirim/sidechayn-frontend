import ButtonDotted from "../buttons/ButtonDotted";
import SongUpload from "./SongUpload";
import { useState } from "react";
import ConfirmationModal from "../modals/ConfirmationModal";
import apiClient from "../../api/apiClient";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const SongShowcase = ({ song }) => {
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      {showModal && (
        <SongUpload handleSongUploadClose={() => setShowModal(false)} />
      )}

      {showDeleteModal && (
        <ConfirmationModal
          isVisible={showDeleteModal}
          title={`Delete ${song.title}`}
          caption={`Are you sure you want to delete ${song.title}`}
          confirmText="Yes, Proceed"
          cancelText="No, Cancel"
          onClose={() => {
            setShowDeleteModal(false);
          }}
          onConfirm={async () => {
            try {
              await apiClient.delete(`songs/${song.id}/`);
              queryClient.invalidateQueries(["songs"]);
              toast.success(`${song.title} deleted`);
              setShowDeleteModal(false);
            } catch (err) {
              toast.error("Couldn't delete song");
              console.log(err);
            }
          }}
        />
      )}
      <div
        className="flex hover:scale-101 cursor-pointer border-b-1 pb-4 
    transition-all duration-200 items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <img
            src={song.cover_image}
            alt="Song"
            className="w-12 h-12 rounded-md object-cover"
          />
          <p>{song.title}</p>
        </div>
        <div className="text-sm text-gray-400 flex gap-4 items-center">
          <span>1,834,433</span>
          <span>{song.duration}</span>
          <div className="group">
            <ButtonDotted />

            <div
              className="absolute mt-2 w-32 rounded-md shadow-lg bg-[#1e1e1e] 
            ring-1 ring-black ring-opacity-5 z-50 opacity-0 invisible 
            group-hover:opacity-100 group-hover:visible transition-all duration-200"
            >
              <div className="py-2 flex flex-col">
                <button
                  className="cursor-pointer block px-4 py-2 text-sm text-white hover:bg-[#2c2c2c]"
                  onClick={() => setShowModal(true)}
                >
                  Edit
                </button>
                <button
                  className="cursor-pointer block px-4 py-2 text-sm text-white hover:bg-[#2c2c2c]"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SongShowcase;
