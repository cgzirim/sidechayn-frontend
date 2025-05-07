import React, { useState } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";

import "../../components/modals/upload-modal/upload-modal.css";
import upload from "../../assets/upload.svg";

import { Controller, FormProvider, useForm } from "react-hook-form";
import apiClient from "../../api/apiClient";
import { useNavigate } from "react-router-dom";
import useBearer from "../../api/hooks/useBearer";
import ModalContainer from "../modals/ModalContainer";
import Input from "../inputs/Input";
import { FileUploader } from "react-drag-drop-files";
import { fileTypes } from "../modals/upload-modal/StepTwoFields";
import DateInput from "../inputs/DateInput";

const AlbumUploadModal = ({
  modalStep,
  handleClose,
  handleNext,
  //   handleSubmit,
  setModalStep,
}) => {
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      title: "",
      description: "",
      key: "",
      bpm: "",
      genre: "",
      coverArt: undefined,
      file: undefined,
    },
  });

  const { handleSubmit, control, setValue, trigger, getFieldState } = methods;

  const [isCreatingSong, setIsCreatingSong] = useState(false);
  const bearer = useBearer();
  const formData = new FormData();

  const onSubmit = async (data) => {
    setIsCreatingSong(true);
    const d = new Date(data.release_date);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append(
      "release_date",
      `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    );
    formData.append("cover_image", data.cover_image);

    try {
      const createdSong = await apiClient.post(`albums/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...bearer,
        },
      });

      console.log("createdSong by backend", createdSong);
      handleClose();
      return navigate("/profile");
    } catch (err) {
      setIsCreatingSong(false);
      console.log("Something went wrong", err);
    }

    setIsCreatingSong(false);
  };

  const [albumArt, setAlbumArt] = useState(null);

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

  const [progressAlbum, setProgressAlbum] = useState(0);
  const [isLoadingAlbum, setIsLoadingAlbum] = useState(false);

  const handleChange1 = (file) => {
    simulateLoading(setProgressAlbum, setIsLoadingAlbum, () => {
      setAlbumArt(file);
      setValue("cover_image", file); // update form state
    });
  };

  return (
    <ModalContainer
      title="Create a new album"
      caption="Share your music album with the whole world!"
      handleClose={handleClose}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="my-4">
          <Controller
            name="title"
            control={control}
            render={({ fieldState, field }) => (
              <Input {...field} label="Title" />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ fieldState, field }) => (
              <Input {...field} label="Description" />
            )}
          />

          <div>
            <label htmlFor="" className="text-white text-[17px]">
              Cover art
            </label>

            <Controller
              name="cover_image"
              control={control}
              render={({ fieldState, field }) => (
                <FileUploader
                  {...field}
                  handleChange={handleChange1}
                  classes="file_upload cover-art"
                  types={fileTypes}
                  children={
                    <div className="flex justify-center items-center flex-col pt-4">
                      <img src={upload} alt="" className="w-[70px] h-[70px]" />
                      <p className="text-sm text-[#d1d1d1] mt-0">
                        Drag your file here
                      </p>
                      <p className="text-xs text-[#999] pb-5">
                        ....or click to open browser
                      </p>
                    </div>
                  }
                />
              )}
            />
          </div>

          <Controller
            name="release_date"
            control={control}
            render={({ fieldState, field }) => (
              <div className="my-2">
                <DateInput
                  {...field}
                  label="Release Date"
                  name="release_date"
                />
              </div>
            )}
          />

          <button
            type="submit"
            onClick={handleSubmit}
            className="cursor-pointer hover:scale-105 transition-all duration-500 upload_button is-blue w-button inline-block w-[100px] px-1 text-center py-2 text-sm rounded-xl ml-auto"
          >
            Upload
          </button>
        </form>
      </FormProvider>
    </ModalContainer>
    // <div>
    //   <div
    //     className="modal-bg bg-black opacity-75 fixed top-0 left-0 h-screen w-screen z-[20000]"
    //     onClick={handleClose}
    //   ></div>
    //   <div
    //     className={`upload-modal max-h-[80%] overflow-y-auto overflow-x-hidden ${
    //       modalStep === 1 ? "w-[450px]" : "w-[750px]"
    //     } max-w-[90%] bg-[#151515] py-6 px-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999999999999999999] rounded-xl`}
    //   >
    //     <div className="text-right w-full">
    //       <button
    //         onClick={handleClose}
    //         className="cursor-pointer btn ml-auto btn-primary bg-[#fff] outline-[#333333] outline-4 text-black w-[20px] h-[20px] flex justify-center items-center rounded-full"
    //       >
    //         <FaTimes className="text-black text-xs" />
    //       </button>
    //     </div>

    //     <div className="mt-2">
    //       <p className="font-semibold">Upload a Song</p>
    //       <p className="text-xs text-gray-400">
    //         Share your music with the whole world!
    //       </p>
    //     </div>

    //     <FormProvider {...methods}>
    //       <form onSubmit={handleSubmit(onSubmit)}>
    //         <p>Love!</p>

    //         {/* <p className="mt-4 text-xs">
    //             Please ensure your track is mixed and masterred prior to uploading!
    //         </p> */}
    //       </form>
    //     </FormProvider>
    //   </div>
    // </div>
  );
};

export default AlbumUploadModal;
