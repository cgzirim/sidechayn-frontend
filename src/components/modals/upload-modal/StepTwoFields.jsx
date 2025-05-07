import React from "react";
import Input from "../../inputs/Input";
import { FileUploader } from "react-drag-drop-files";
import { FaTimes, FaTrash } from "react-icons/fa";
import { useState } from "react";
import upload from "../../../assets/upload.svg";
import Genre from "../../genre";
import GenreInput from "./GenreInput";
import { Controller, useFormContext } from "react-hook-form";

export const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "WEBP", "SVG"];

const StepTwoFields = ({ handleSubmit, setModalStep }) => {
  const [albumArt, setAlbumArt] = useState(null);

  const [isLoadingAlbum, setIsLoadingAlbum] = useState(false);
  const [progressAlbum, setProgressAlbum] = useState(0);

  const handleChange1 = (file) => {
    simulateLoading(setProgressAlbum, setIsLoadingAlbum, () => {
      setAlbumArt(file);
      setValue("cover_image", file); // update form state
    });
  };

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

  const { control, setValue } = useFormContext();

  return (
    <div className="step-2">
      <div className="mt-5 grid lg:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-4">
        {/* <form
        action=""
        className="mt-5 grid lg:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-4"
      > */}

        <Controller
          //   defaultValue={defaultInputValue}
          control={control}
          //   rules={rules}
          name="title"
          render={({ fieldState, field }) => {
            return (
              <Input
                {...field}
                label="Title"
                placeholder="Enter your track title"
              />

              // <Fragment>
              //   <textarea

              //     ref={ref as ForwardedRef<HTMLTextAreaElement>}
              //     className={`${
              //       fieldState?.invalid
              //         ? "border-red-400 border-2"
              //         : "border-[#c1c1c1]"
              //     }
              //     w-full resize-none text-gray-600 rounded-md px-4 py-2 h-20
              //     outline-1 border blur-0  focus:outline-fyellow`}
              //     {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
              //   ></textarea>
              //   <p
              //     className={`${
              //       fieldState?.invalid ? "text-red-400" : "text-fgrey"
              //     } text-sm`}
              //   >
              //     {fieldState?.invalid ? fieldState?.error?.message : hint}
              //   </p>
              // </Fragment>
            );
          }}
        />

        <Controller
          //   defaultValue={defaultInputValue}
          control={control}
          //   rules={rules}
          name="description"
          render={({ fieldState, field }) => {
            return (
              <Input
                {...field}
                label="Description"
                placeholder="Enter your track description"
              />
            );
          }}
        />

        {/* <Input label="Key" optional placeholder="Enter your track key" />
        <Input label="BPM" optional placeholder="Enter your track bpm" /> */}

        <div className="upload-input col-span-1">
          <Controller
            //   defaultValue={defaultInputValue}
            control={control}
            //   rules={rules}
            name="key"
            render={({ fieldState, field }) => {
              return (
                <Input
                  {...field}
                  label="Key"
                  optional
                  placeholder="Enter your track key"
                />
              );
            }}
          />

          {/* <label htmlFor="" className="text-white text-[17px] block leading-2">
            Key
          </label>
          <span className="text-gray-500 text-xs">(optional)</span>
          <input
            type="text"
            className="input border border-dashed border-white input-bordered w-full bg-[#3d3d38] py-2 px-3 text-white rounded-md mt-2"
            placeholder="Enter your track key"
          /> */}
        </div>
        <div className="upload-input col-span-1">
          <Controller
            //   defaultValue={defaultInputValue}
            control={control}
            //   rules={rules}
            name="bpm"
            render={({ fieldState, field }) => {
              return (
                <Input
                  {...field}
                  label="BPM"
                  optional
                  placeholder="Enter your track bpm"
                />
              );
            }}
          />

          {/* <label htmlFor="" className="text-white text-[17px] block leading-2">
            BPM
          </label>
          <span className="text-gray-500 text-xs">(optional)</span>
          <input
            type="text"
            className="input border border-dashed border-white input-bordered w-full bg-[#3d3d38] py-2 px-3 text-white rounded-md mt-2"
            placeholder="Enter your track bpm"
          /> */}
        </div>

        <Controller
          // defaultValue={defaultInputValue}
          control={control}
          // rules={rules}
          name="genre"
          render={({ fieldState, field }) => {
            return <GenreInput {...field} />;
          }}
        />

        {/* <div className="upload-input lg:col-span-2 col-span-1">
          <label htmlFor="" className="text-white text-[17px]">
            Genre
          </label>
          <input
            type="text"
            className="input border border-dashed border-white input-bordered w-full bg-[#3d3d38] py-2 px-3 text-white rounded-md mt-2"
            placeholder="Enter your track genre"
          />
        </div> */}
        <div className="lg:col-span-2 col-span-1">
          <label htmlFor="" className="text-white text-[17px]">
            Cover art
          </label>
          <FileUploader
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
          {/* preview file */}
          <div className="flex justify-start items-center mt-4">
            {isLoadingAlbum ? (
              <div className="w-full bg-gray-800 rounded h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-4"
                  style={{
                    width: `${progressAlbum}%`,
                    transition: "width 0.2s",
                  }}
                ></div>
              </div>
            ) : (
              albumArt && (
                <div className="flex justify-between items-center w-full gap-2">
                  <div className="flex justify-start items-center gap-3">
                    <img
                      src={URL.createObjectURL(albumArt)}
                      alt="preview"
                      className="w-16 object-cover h-16 rounded-md"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm text-white w-full overflow-hidden">
                        {albumArt.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {(albumArt.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAlbumArt(null)}
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
        </div>

        <div className="lg:col-span-2 col-span-1">
          <div className="flex justify-between items-center">
            <button
              className="flex justify-center hover:scale-105 transition-all duration-500 items-center gap-2 cursor-pointer text-sm bg-[#292929] px-5 py-2 rounded-xl"
              type="button"
              onClick={() => setModalStep(1)}
            >
              <img
                className="w-4"
                loading="lazy"
                src="https://cdn.prod.website-files.com/66b1e34f1cccd77056bac6df/679af985a959812d7b3bd5b5_left-arrow-1-svgrepo-com.svg"
                alt=""
              />
              I've changred my mind
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="cursor-pointer hover:scale-105 transition-all duration-500 upload_button is-blue w-button inline-block w-[100px] px-1 text-center py-2 text-sm rounded-xl ml-auto"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
      {/* </form> */}
    </div>
  );
};

export default StepTwoFields;
