import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { FaTimes, FaTrash } from "react-icons/fa";

import upload from "../../../assets/upload.svg";

import "./upload-modal.css";
import Input from "../../inputs/Input";
import StepTwoFields from "./StepTwoFields";

const UploadModal = ({
  modalStep,
  handleClose,
  handleNext,
  handleSubmit,
  setModalStep,
}) => {
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "WEBP", "SVG"];

  // audio file types wav, mp3
  const audioTypes = ["MP3", "WAV"];

  const [file, setFile] = useState(null);
  const [albumArt, setAlbumArt] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [isLoadingAlbum, setIsLoadingAlbum] = useState(false);
  const [progressAlbum, setProgressAlbum] = useState(0);

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

  const handleChange = (file) => {
    simulateLoading(setProgress, setIsLoading, () => {
      setFile(file);
    });
  };
  const handleChange1 = (file) => {
    simulateLoading(setProgressAlbum, setIsLoadingAlbum, () => {
      setAlbumArt(file);
    });
  };
  return (
    <div>
      <div
        className="modal-bg bg-black opacity-75 fixed top-0 left-0 h-screen w-screen z-[20000]"
        onClick={handleClose}
      ></div>
      <div
        className={`upload-modal max-h-[80%] overflow-y-auto overflow-x-hidden ${
          modalStep === 1 ? "w-[450px]" : "w-[750px]"
        } max-w-[90%] bg-[#151515] py-6 px-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999999999999999999] rounded-xl`}
      >
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

        <form>
          {modalStep === 1 && (
            <div className="step-1">
              <FileUploader
                handleChange={handleChange}
                classes="file_upload cover-art"
                name="file"
                types={audioTypes}
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

              {/* preview file */}
              <div className="flex justify-start items-center mt-4">
                {isLoading ? (
                  <div className="w-full bg-gray-800 rounded h-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-4"
                      style={{
                        width: `${progress}%`,
                        transition: "width 0.2s",
                      }}
                    ></div>
                  </div>
                ) : (
                  file && (
                    <div className="flex justify-between items-center w-full gap-2">
                      <div className="flex justify-start items-center gap-3">
                        {/* <audio controls className="w-full">
                                                            <source src={URL.createObjectURL(file)} type={file.type} />
                                                            Your browser does not support the audio element.
                                                        </audio> */}
                        <div className="flex flex-col">
                          <p className="text-sm text-white w-full overflow-hidden">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="text-xs cursor-pointer text-red-500"
                      >
                        <FaTrash className="text-xl" />
                      </button>
                    </div>
                  )
                )}
              </div>

              <div className="text-size-small margin-top margin-medium text-size-small-mobile mt-4">
                Supported formats:{" "}
                <span className="text-[#a193ff]">WAV &amp; MP3</span>
              </div>
              <div className="text-size-small margin-top margin-xsmall text-size-small-mobile">
                Maximum Size: <span className="text-[#a193ff]">10MB</span>
              </div>
              <div className="upload_button-wrap _1 mt-6">
                <button
                  type="button"
                  onClick={handleNext}
                  className="cursor-pointer hover:scale-105 transition-all duration-500 upload_button is-blue w-button inline-block w-[100px] px-1 text-center py-2 text-sm rounded-xl ml-auto"
                >
                  👉 Next
                </button>
              </div>
            </div>
          )}

          {modalStep === 2 && <StepTwoFields />}

          {/* <p className="mt-4 text-xs">
                        Please ensure your track is mixed and masterred prior to uploading!
                    </p> */}
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
