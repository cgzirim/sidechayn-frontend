import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { FaTimes, FaTrash } from "react-icons/fa";

import upload from "../../../assets/upload.svg";

import "./upload-modal.css";
import Input from "../../inputs/Input";
import StepTwoFields from "./StepTwoFields";
import StepOneFields from "./StepOneFields";
import { FormProvider, useForm } from "react-hook-form";
import apiClient from "../../../api/apiClient";
import { useNavigate } from "react-router-dom";
import useBearer from "../../../api/hooks/useBearer";
import { useQueryClient } from "@tanstack/react-query";
import useLoadingStore from "../../../stores/useLoadingStore";
import UploadLoadingModal from "../UploadLoadingModal";

// const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log("Form submitted");
//     setUploadModalVisible(false);
//     setModalStep(1);
//     setBar(true);
// }

const UploadModal = ({
  modalStep,
  handleClose,
  handleNext,
  //   handleSubmit,
  setModalStep,
}) => {
  const navigate = useNavigate();
  const { showLoading, hideLoading, isVisible, message } = useLoadingStore();

  //   const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "WEBP", "SVG"];

  // audio file types wav, mp3
  //   const audioTypes = ["MP3", "WAV"];

  //   const [file, setFile] = useState(null);
  //   const [albumArt, setAlbumArt] = useState(null);

  //   const [isLoading, setIsLoading] = useState(false);
  //   const [progress, setProgress] = useState(0);

  //   const [isLoadingAlbum, setIsLoadingAlbum] = useState(false);
  //   const [progressAlbum, setProgressAlbum] = useState(0);

  const simulateLoading = (
    setProgressCallback,
    setLoadingCallback,
    onComplete
  ) => {
    setLoadingCallback(true);
    let percent = 0;
    const interval = setInterval(() => {
      percent += 5;
      setProgressCallback(percent);
      if (percent >= 100) {
        clearInterval(interval);
        setLoadingCallback(false);
        onComplete();
      }
    }, 50); // 50ms delay -> 5% every 50ms => ~1 second total
  };

  //   const handleChange = (file) => {
  //     simulateLoading(setProgress, setIsLoading, () => {
  //       setFile(file);
  //     });
  //   };

  //   const handleChange1 = (file) => {
  //     simulateLoading(setProgressAlbum, setIsLoadingAlbum, () => {
  //       setAlbumArt(file);
  //     });
  //   };

  const queryClient = useQueryClient();

  const methods = useForm({
    defaultValues: {
      title: "",
      description: "",
      key: "",
      bpm: "",
      genre: "",
      coverArt: undefined,
      file: undefined,
      tags: [],
    },
  });

  const { handleSubmit, trigger, getFieldState } = methods;

  const [isCreatingSong, setIsCreatingSong] = useState(false);
  const bearer = useBearer();
  const formData = new FormData();

  const onSubmit = async (data) => {
    setIsCreatingSong(true);
    showLoading();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("key", data.key);
    formData.append("bpm", data.bpm);
    formData.append("genre", data.genre);
    formData.append("cover_image", data.cover_image);
    formData.append("audio_file", data.audio_file);

    formData.append("tags", data.tags);
    formData.append("album", data.album);

    try {
      const createdSong = await apiClient.post(`songs/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...bearer,
        },
      });
      console.log("createdSong => ", createdSong);
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      hideLoading();
      navigate("/explore");
    } catch (err) {
      setIsCreatingSong(false);
      console.log("Something went wrong", err);
      hideLoading();
    }

    setIsCreatingSong(false);
  };

  return (
    <div>
      <div
        className="modal-bg bg-black opacity-75 fixed top-0 left-0 h-screen w-screen z-[200]"
        onClick={handleClose}
      ></div>
      <div
        className={`upload-modal max-h-[80%] overflow-y-auto overflow-x-hidden ${
          modalStep === 1 ? "w-[450px]" : "w-[750px]"
        } max-w-[90%] bg-[#151515] py-6 px-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999999999999999999] rounded-xl`}
      >
        <UploadLoadingModal visible={isVisible} message={message} />
        <div className="text-right w-full">
          <button
            onClick={handleClose}
            className="cursor-pointer btn ml-auto btn-primary bg-[#fff] outline-[#333333] outline-4 text-black w-[20px] h-[20px] flex justify-center items-center rounded-full"
          >
            <FaTimes className="text-black text-xs" />
          </button>
        </div>

        <div className="mt-2">
          <p className="font-semibold">Upload a Song</p>
          <p className="text-xs text-gray-400">
            Share your music with the whole world!
          </p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {modalStep === 1 && (
              <StepOneFields
                handleNext={handleNext}
                handleSubmit={handleSubmit}
                setModalStep={setModalStep}
              />
            )}

            {modalStep === 2 && (
              <StepTwoFields
                handleSubmit={handleSubmit}
                setModalStep={setModalStep}
              />
            )}

            {/* <p className="mt-4 text-xs">
                Please ensure your track is mixed and masterred prior to uploading!
            </p> */}
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default UploadModal;
