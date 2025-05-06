import React, { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { FaTimes, FaTrash } from 'react-icons/fa'

import upload from "../../../assets/upload.svg"

import "./upload-modal.css"

const UploadModal = ({ modalStep, handleClose, handleNext, handleSubmit, setModalStep }) => {
    const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "WEBP", "SVG"];

    // audio file types wav, mp3
    const audioTypes = ["MP3", "WAV"];

    const [file, setFile] = useState(null);
    const [albumArt, setAlbumArt] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const [isLoadingAlbum, setIsLoadingAlbum] = useState(false);
    const [progressAlbum, setProgressAlbum] = useState(0);


    const simulateLoading = (setProgressCallback, setLoadingCallback, onComplete) => {
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
            <div className="modal-bg bg-black opacity-75 fixed top-0 left-0 h-screen w-screen z-[20000]" onClick={handleClose}></div>
            <div className={`upload-modal max-h-[80%] overflow-y-auto overflow-x-hidden ${modalStep === 1 ? 'w-[450px]' : 'w-[750px]'} max-w-[90%] bg-[#151515] py-6 px-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999999999999999999] rounded-xl`}>
                <div className="text-right w-full">
                    <button onClick={handleClose} className="cursor-pointer btn ml-auto btn-primary bg-[#fff] outline-[#333333] outline-4 text-black w-[20px] h-[20px] flex justify-center items-center rounded-full">
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
                    {
                        modalStep === 1 && (
                            <div className="step-1">
                                <FileUploader handleChange={handleChange} classes="file_upload cover-art" name="file" types={audioTypes}
                                    children={
                                        <div className="flex justify-center items-center flex-col pt-4">
                                            <img src={upload} alt="" className='w-[70px] h-[70px]' />
                                            <p className="text-sm text-[#d1d1d1] mt-0">Drag your file here</p>
                                            <p className="text-xs text-[#999] pb-5">....or click to open browser</p>
                                        </div>
                                    }

                                />

                                {/* preview file */}
                                <div className="flex justify-start items-center mt-4">
                                    {
                                        isLoading ? (
                                            <div className="w-full bg-gray-800 rounded h-4 overflow-hidden">
                                                <div
                                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-4"
                                                    style={{ width: `${progress}%`, transition: 'width 0.2s' }}
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
                                                            <p className="text-sm text-white w-full overflow-hidden">{file.name}</p>
                                                            <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => setFile(null)}
                                                        className="text-xs cursor-pointer text-red-500"
                                                    >
                                                        <FaTrash className='text-xl' />
                                                    </button>
                                                </div>
                                            )
                                        )
                                    }
                                </div>


                                <div className="text-size-small margin-top margin-medium text-size-small-mobile mt-4">
                                    Supported formats: <span className="text-[#a193ff]">WAV &amp; MP3</span>
                                </div>
                                <div className="text-size-small margin-top margin-xsmall text-size-small-mobile">
                                    Maximum Size: <span className="text-[#a193ff]">10MB</span>
                                </div>
                                <div className="upload_button-wrap _1 mt-6">
                                    <button type="button" onClick={handleNext} className="cursor-pointer hover:scale-105 transition-all duration-500 upload_button is-blue w-button inline-block w-[100px] px-1 text-center py-2 text-sm rounded-xl ml-auto">👉 Next</button>
                                </div>
                            </div>
                        )
                    }

                    {
                        modalStep === 2 && (
                            <div className="step-2">
                                <form action="" className="mt-5 grid lg:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-4">
                                    <div className="upload-input lg:col-span-2 col-span-1 mb-2">
                                        <label htmlFor="" className="text-white text-[17px]">Title</label>
                                        <input type="text" className="input border border-dashed border-white input-bordered w-full bg-[#3d3d38] py-2 px-3 text-white rounded-md mt-2" placeholder='Enter your track title' />
                                    </div>
                                    <div className="upload-input lg:col-span-2 col-span-1 mb-3">
                                        <label htmlFor="" className="text-white text-[17px]">Description</label>
                                        <input type="text" className="input border border-dashed border-white input-bordered w-full bg-[#3d3d38] py-2 px-3 text-white rounded-md mt-2" placeholder='Enter your track description' />
                                    </div>
                                    <div className="upload-input col-span-1">
                                        <label htmlFor="" className="text-white text-[17px] block leading-2">Key</label>
                                        <span className="text-gray-500 text-xs">(optional)</span>
                                        <input type="text" className="input border border-dashed border-white input-bordered w-full bg-[#3d3d38] py-2 px-3 text-white rounded-md mt-2" placeholder='Enter your track key' />
                                    </div>
                                    <div className="upload-input col-span-1">
                                        <label htmlFor="" className="text-white text-[17px] block leading-2">BPM</label>
                                        <span className="text-gray-500 text-xs">(optional)</span>
                                        <input type="text" className="input border border-dashed border-white input-bordered w-full bg-[#3d3d38] py-2 px-3 text-white rounded-md mt-2" placeholder='Enter your track bpm' />
                                    </div>
                                    <div className="upload-input lg:col-span-2 col-span-1">
                                        <label htmlFor="" className="text-white text-[17px]">Genre</label>
                                        <input type="text" className="input border border-dashed border-white input-bordered w-full bg-[#3d3d38] py-2 px-3 text-white rounded-md mt-2" placeholder='Enter your track genre' />
                                    </div>
                                    <div className="lg:col-span-2 col-span-1">
                                        <label htmlFor="" className="text-white text-[17px]">Cover art</label>
                                        <FileUploader handleChange={handleChange1} classes="file_upload cover-art" name="file_album_art" types={fileTypes} children={
                                            <div className="flex justify-center items-center flex-col pt-4">
                                                <img src={upload} alt="" className='w-[70px] h-[70px]' />
                                                <p className="text-sm text-[#d1d1d1] mt-0">Drag your file here</p>
                                                <p className="text-xs text-[#999] pb-5">....or click to open browser</p>
                                            </div>
                                        } />
                                        {/* preview file */}
                                        <div className="flex justify-start items-center mt-4">
                                            {
                                                isLoadingAlbum ? (
                                                    <div className="w-full bg-gray-800 rounded h-4 overflow-hidden">
                                                        <div
                                                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-4"
                                                            style={{ width: `${progressAlbum}%`, transition: 'width 0.2s' }}
                                                        ></div>
                                                    </div>
                                                ) : (
                                                    albumArt && (
                                                        <div className="flex justify-between items-center w-full gap-2">
                                                            <div className="flex justify-start items-center gap-3">
                                                                <img src={URL.createObjectURL(albumArt)} alt="preview" className="w-16 object-cover h-16 rounded-md" />
                                                                <div className="flex flex-col">
                                                                    <p className="text-sm text-white w-full overflow-hidden">{albumArt.name}</p>
                                                                    <p className="text-xs text-gray-400">{(albumArt.size / 1024).toFixed(2)} KB</p>
                                                                </div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => setAlbumArt(null)}
                                                                className="text-xs cursor-pointer text-red-500"
                                                            >
                                                                <FaTrash className='text-xl' />
                                                            </button>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </div>
                                        <div className="text-size-small margin-top margin-medium text-size-small-mobile mt-4">
                                            Supported formats: <span className="text-[#a193ff]">WAV &amp; MP3</span>
                                        </div>
                                        <div className="text-size-small margin-top margin-xsmall text-size-small-mobile">
                                            Maximum Size: <span className="text-[#a193ff]">10MB</span>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-2 col-span-1">
                                        <div className="flex justify-between items-center">
                                            <button className="flex justify-center hover:scale-105 transition-all duration-500 items-center gap-2 cursor-pointer text-sm bg-[#292929] px-5 py-2 rounded-xl" type="button" onClick={() => setModalStep(1)}>
                                                <img className="w-4" loading="lazy" src="https://cdn.prod.website-files.com/66b1e34f1cccd77056bac6df/679af985a959812d7b3bd5b5_left-arrow-1-svgrepo-com.svg" alt="" />
                                                I've changred my mind
                                            </button>
                                            <button type="submit" onClick={handleSubmit} className="cursor-pointer hover:scale-105 transition-all duration-500 upload_button is-blue w-button inline-block w-[100px] px-1 text-center py-2 text-sm rounded-xl ml-auto">Upload</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )
                    }

                    {/* <p className="mt-4 text-xs">
                        Please ensure your track is mixed and masterred prior to uploading!
                    </p> */}
                </form>
            </div>
        </div>
    )
}

export default UploadModal