import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { FaTimes, FaTrash } from "react-icons/fa";

import upload from "../../../assets/upload.svg";

import "./upload-modal.css";
import Input from "../../inputs/Input";
import { Controller, useFormContext } from "react-hook-form";

const StepOneFields = ({ handleNext, handleSubmit, setModalStep }) => {
  // audio file types wav, mp3
  const audioTypes = ["MP3", "WAV"];

  const [file, setFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

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
      setValue("audio_file", file); // update form state
    });
  };

  const { control, setValue } = useFormContext();

  return (
    <div className="step-1">
      <Controller
        rules={{
          required: "Agree to the terms.",
        }}
        control={control}
        name="audio_file"
        render={({ field, fieldState }) => (
          <FileUploader
            {...field}
            handleChange={handleChange}
            fieldState={fieldState}
            classes="file_upload cover-art"
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
        )}
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
        Supported formats: <span className="text-[#a193ff]">WAV &amp; MP3</span>
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
  );
};

export default StepOneFields;
